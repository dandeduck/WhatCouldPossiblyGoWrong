import { Configuration, OpenAIApi } from 'openai-edge'
import { sql } from '@vercel/postgres'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import type { RequestHandler } from './$types'
import { getPromptId } from '$lib/utils'

const PROMPT_TEMPLATE = `
Come up with a funny and weird unrealistic situtation that might result from the following question:
I want to %question%. What could possibly go wrong?

Talk about it in the second person, don't repeat the question, and make it one paragraph long.
`
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration)

export const POST = (async ({ request }) => {
    const { prompt: question, sessionId } = await request.json()

    const prompt = PROMPT_TEMPLATE.replace('%question%', question.substring(0, 256))

    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        stream: true,
        messages: [{ role: 'user', content: prompt }],
        temperature: 1,
        max_tokens: 200
    })

    const stream = OpenAIStream(response, {
        onCompletion: async (completion: string) => {
            await savePrompt(getPromptId(question, sessionId), question, completion)
        }
    })

    return new StreamingTextResponse(stream)
}) satisfies RequestHandler

async function savePrompt(id: string, question: string, answer: string) {
    return sql`
        INSERT INTO prompts (id, question, answer) 
        VALUES (${id}, ${question}, ${answer})`
}
