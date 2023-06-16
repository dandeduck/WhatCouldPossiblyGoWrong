<script lang="ts">
    import { browser } from '$app/environment'
    import { goto } from '$app/navigation'
    import { page } from '$app/stores'
    import type PromptRow from '$lib/PromptRow'
    import { getPromptId } from '$lib/utils'
    import PromptHistory from '../components/home/history/PromptHistory.svelte'
    import Prompt from '../components/home/prompts/Prompt.svelte'
    import type { PageData } from './$types'
    import analytics from '@vercel/analytics'
    import { useCompletion } from 'ai/svelte'

    export let data: PageData

    const sessionId = crypto.randomUUID().replace('-', '').substring(0, 8)
    const { input, handleSubmit, completion, isLoading } = useCompletion({ onError, onFinish, body: { sessionId } })

    let answer: string | null = null
    let question = ''
    let promptId: null | string = null

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

    $: answer = $completion || answer

    async function submitPrompt(event: any) {
        $input = event.detail
        handleSubmit(event)
        analytics.track('Prompt', { failed: false })
    }

    function onError() {
        analytics.track('Prompt', { failed: true })
    }

    function onFinish() {
        promptId = getPromptId(question, sessionId)
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
    <Prompt bind:question {answer} on:question={submitPrompt} isLoading={$isLoading} />
    <PromptHistory
        promptRows={data.lastPrompts}
        placeholder={data.error}
        on:prompt={e => setPromptFromHistory(e.detail)}
    />
</div>
