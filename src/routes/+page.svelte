<script lang="ts">
    import Prompt from '../components/home/prompts/Prompt.svelte'
    import type { PageData } from './$types'

    export let data: PageData

    let answer: Promise<string> | null = null

    async function fetchResponse(question: string) {
        if (!question) return

        answer = fetch('/api/answers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ question })
        })
            .then(res => res.json())
            .then(res => res.answer || "We couldn't think of anything good :(")
    }
</script>

<div class="flex flex-col">
    <Prompt {answer} on:question={e => fetchResponse(e.detail)} />
</div>
