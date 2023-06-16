import { sql } from '@vercel/postgres'
import type PromptRow from '$lib/PromptRow'

export async function load({ url }) {
    const promptId = url.searchParams.get('id')

    try {
        let prompt: PromptRow | null = null

        if (promptId) {
            prompt = (await sql<PromptRow>`SELECT * FROM prompts WHERE id = ${promptId}`).rows[0]
        }

        return {
            lastPrompts: (await sql<PromptRow>`SELECT * FROM prompts ORDER BY created_at DESC LIMIT 8`).rows,
            prompt
        }
    } catch (err) {
        console.error(err)

        return {
            error: "Couldn't load history :("
        }
    }
}
