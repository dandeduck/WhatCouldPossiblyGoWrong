<script lang="ts">
    import PromptList from './PromptList.svelte'
    import type PromptRow from '$lib/PromptRow'
    import { createEventDispatcher } from 'svelte'

    export let promptRows: PromptRow[] = []
    export let placeholder = ''

    const dispatch = createEventDispatcher<{ prompt: PromptRow }>()
</script>

<div class="flex flex-col gap-2.5 transition-all">
    <h2>Recent searches</h2>
    <PromptList {promptRows} {placeholder} on:prompt={e => dispatch('prompt', e.detail)} />
</div>
