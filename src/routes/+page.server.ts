import { sql } from '@vercel/postgres'
import type PromptRow from '$lib/PromptRow'

export async function load() {
    try {
        return {
            lastPrompts: (await sql<PromptRow>`SELECT * FROM prompts ORDER BY created_at DESC LIMIT 8`).rows
        }
    } catch (err) {
        return {
            error: 'Could not load history'
        }
    }
}
