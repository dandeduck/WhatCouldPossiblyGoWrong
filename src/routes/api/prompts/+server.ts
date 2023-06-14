import { error, json } from '@sveltejs/kit'
import { Configuration, OpenAIApi } from 'openai'
import { config } from 'dotenv'
import { sql } from '@vercel/postgres'

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

        const answer = response.data.choices[0].text

        savePrompt(question, answer).catch(console.error)

        return json({ answer })
    } catch (err) {
        console.error(err)
    }

    throw error(500, { message: 'Could not generate answer' })
}

async function savePrompt(question: string, answer?: string) {
    return sql`INSERT INTO prompts (question, answer) VALUES (${question}, ${answer})`
}
