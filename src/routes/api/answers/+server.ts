import { error, json } from '@sveltejs/kit'
import { Configuration, OpenAIApi } from 'openai'
import { config } from 'dotenv'

const PROMPT_TEMPLATE = `
Come up with a funny and weird unrealistic situtation that might result from the following question:
I want to %question%. What could possibly go wrong?

Talk about it in the second person, don't repeat the question, and make it one paragraph long.
`
config()
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration)

export async function POST({ request }) {
    const body = await request.json()
    const { question } = body
    const prompt = PROMPT_TEMPLATE.replace('%question%', question)

    // TODO: Add user id
    try {
        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt,
            temperature: 1,
            max_tokens: 200
        })

        return json({
            answer: response.data.choices[0].text
        })
    } catch (err) {
        if (err instanceof Error) {
            console.error(err.message)
        } else {
            console.error(err)
        }
    }

    throw error(500, { message: 'Could not generate answer' })
}
