<script lang="ts">
    import { browser } from '$app/environment'
    import { goto } from '$app/navigation'
    import { page } from '$app/stores'
    import type PromptRow from '$lib/PromptRow'
    import PromptHistory from '../components/home/history/PromptHistory.svelte'
    import Prompt from '../components/home/prompts/Prompt.svelte'
    import type { PageData } from './$types'
    import analytics from '@vercel/analytics'
    import { useCompletion } from 'ai/svelte'

    export let data: PageData

    const { input, handleSubmit, completion, isLoading } = useCompletion({
        onError,
        onFinish,
        initialCompletion: data.prompt?.answer || '',
        initialInput: data.prompt?.question || ''
    })

    let promptId: null | number = null

    if (data.prompt && browser) {
        promptId = data.prompt.id
        analytics.track('URL', { promptId })
    }

    $: if (promptId && $page.url.searchParams.get('id') !== promptId.toString()) {
        $page.url.searchParams.set('id', promptId?.toString())
        goto($page.url.toString(), { replaceState: true })
    } else if (!promptId && browser) {
        $page.url.searchParams.delete('id')
        goto($page.url.toString(), { replaceState: true })
    }

    async function submitPrompt(event: any) {
        $input = event.detail
        handleSubmit(event)
        analytics.track('Prompt', { failed: false })
    }

    function onError() {
        analytics.track('Prompt', { failed: true })
    }

    async function onFinish() {
        promptId = await fetch('/api/prompts/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question: $input, answer: $completion })
        })
            .then(res => res.json())
            .then(res => res.id)
            .catch(e => console.error(e))
    }

    function setPromptFromHistory(prompt: PromptRow) {
        scrollTo({ top: 0, behavior: 'smooth' })

        $input = prompt.question
        $completion = prompt.answer
        promptId = prompt.id

        analytics.track('History')
    }
</script>

<div class="flex flex-col gap-10 transition-all">
    <Prompt question={$input} answer={$completion} on:prompt={submitPrompt} isLoading={$isLoading} />
    <PromptHistory
        promptRows={data.lastPrompts}
        placeholder={data.error}
        on:prompt={e => setPromptFromHistory(e.detail)}
    />
</div>
