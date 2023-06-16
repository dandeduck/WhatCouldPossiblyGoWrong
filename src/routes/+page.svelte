<script lang="ts">
    import type PromptRow from '$lib/PromptRow'
    import PromptHistory from '../components/home/history/PromptHistory.svelte'
    import Prompt from '../components/home/prompts/Prompt.svelte'
    import type { PageData } from './$types'
    import analytics from '@vercel/analytics'

    export let data: PageData

    let answer: string | null = null
    let question = ''
    let isLoading = false

    async function submitPrompt(question: string) {
        if (!question) return

        isLoading = true

        try {
            const res = await fetch('/api/prompts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ question })
            }).then(res => res.json())

            if (!res.answer) {
                throw new Error(res)
            }

            answer = res.answer

            analytics.track('Prompt', { failed: false })
        } catch (err) {
            answer = "We couldn't think of anything good :("
            console.error(err)
            analytics.track('Prompt', { failed: true })
        }

        isLoading = false
    }

    function setPromptFromHistory(prompt: PromptRow) {
        scrollTo({ top: 0, behavior: 'smooth' })

        question = prompt.question
        answer = prompt.answer

        analytics.track('History')
    }
</script>

<div class="flex flex-col gap-10 transition-all">
    <Prompt bind:question {answer} on:question={e => submitPrompt(e.detail)} {isLoading} />
    <PromptHistory
        promptRows={data.lastPrompts}
        placeholder={data.error}
        on:prompt={e => setPromptFromHistory(e.detail)}
    />
</div>
