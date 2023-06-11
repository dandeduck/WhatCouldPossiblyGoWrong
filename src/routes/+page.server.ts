import { sql } from '@vercel/postgres'

export async function load() {
    try {
        return {
            firstPrompts: await sql`SELECT * from PROMPTS LIMIT 10`
        }
    } catch(err) {
        return {
            error: 'Could not load history'
        }
    }
}
