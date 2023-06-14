<script lang="ts">
    import PromptHistory from '../components/home/history/PromptHistory.svelte'
    import Prompt from '../components/home/prompts/Prompt.svelte'
    import type { PageData } from './$types'
    import analytics from '@vercel/analytics'

    export let data: PageData

    let answer: Promise<string> | null = null

    async function submitPrompt(question: string) {
        if (!question) return

        answer = fetch('/api/prompts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ question })
        })
            .catch(err => {
                console.error(err)
                analytics.track('Prompt', { failed: true })

                return null
            })
            .then(res => res?.json())
            .then(res => res.answer || "We couldn't think of anything good :(")
            .then(answer => {
                analytics.track('Prompt', { failed: false })

                return answer
            })
    }
</script>

<div class="flex flex-col gap-10">
    <Prompt {answer} on:question={e => submitPrompt(e.detail)} />
    <PromptHistory promptRows={data.lastPrompts} placeholder={data.error} />
</div>
