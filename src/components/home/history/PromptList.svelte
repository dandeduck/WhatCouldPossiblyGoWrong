<script lang="ts">
    import type PromptRow from '$lib/PromptRow'
    import { createEventDispatcher } from 'svelte'

    export let promptRows: PromptRow[] = []
    export let placeholder = ''

    const dispatch = createEventDispatcher<{ prompt: PromptRow }>()
</script>

<div class="flex flex-col rounded-2xl border-2 border-secondary">
    {#each promptRows as prompt}
        <button class="hover:bg-secondary pt-2 pb-2 px-5 w-full text-start" on:click={() => dispatch('prompt', prompt)}
            >I want to {prompt.question}</button
        >
    {/each}
    {#if promptRows.length === 0}
        <div>{placeholder}</div>
    {/if}
</div>
