import { json } from '@sveltejs/kit'
import { sql } from '@vercel/postgres'

export async function POST({ request }) {
    const { question, answer } = await request.json()

    const response = await savePrompt(question, answer)

    return json({ id: response.rows[0].id })
}

async function savePrompt(question: string, answer: string) {
    return sql`
        INSERT INTO prompts (question, answer) 
        VALUES (${question}, ${answer})
        RETURNING id`
}
