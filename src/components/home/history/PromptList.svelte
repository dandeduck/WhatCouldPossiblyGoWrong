<script lang="ts">
    import './promptList.css'
    import type PromptRow from '$lib/PromptRow'
    import { createEventDispatcher } from 'svelte'

    export let promptRows: PromptRow[] = []
    export let placeholder = ''

    const dispatch = createEventDispatcher<{ prompt: PromptRow }>()
</script>

<div class="flex flex-col border-2 border-secondary overflow-hidden" style="border-radius: 20px;">
    {#each promptRows as prompt}
        <button
            class="hover:bg-secondary pt-2 pb-2 px-5 w-full text-start prompt-list-item"
            on:click={() => dispatch('prompt', prompt)}
        >
            I want to: {prompt.question}
        </button>
    {/each}
    {#if promptRows.length === 0}
        <div class="pt-2 pb-2 px-5 w-full text-start">{placeholder}</div>
    {/if}
</div>
