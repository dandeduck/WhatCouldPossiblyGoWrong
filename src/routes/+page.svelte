<script lang="ts">
    import { browser } from '$app/environment'
    import { goto } from '$app/navigation'
    import { page } from '$app/stores'
    import type PromptRow from '$lib/PromptRow'
    import PromptHistory from '../components/home/history/PromptHistory.svelte'
    import Prompt from '../components/home/prompts/Prompt.svelte'
    import type { PageData } from './$types'
    import analytics from '@vercel/analytics'

    export let data: PageData

    let answer: string | null = null
    let question = ''
    let promptId: null | number = null
    let isLoading = false

    if (data.prompt && browser) {
        setPromptFromHistory(data.prompt)
    }

    $: if (promptId) {
        $page.url.searchParams.set('id', promptId?.toString())
        goto($page.url.toString(), { replaceState: true })
    } else if (browser) {
        $page.url.searchParams.delete('id')
        goto($page.url.toString(), { replaceState: true })
    }

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
            })

            const body = await res.json()

            if (res.status !== 200) {
                throw new Error(JSON.stringify(body))
            }

            answer = body.answer
            promptId = body.id

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
        promptId = prompt.id

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
