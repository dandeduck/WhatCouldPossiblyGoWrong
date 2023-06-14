<script lang="ts">
    import type PromptRow from '$lib/PromptRow'

    export let promptRows: PromptRow[] = []
    export let placeholder = ''
</script>

<div class="flex flex-col gap-5 px-5 py-2 rounded-2xl border-2 border-secondary">
    {#each promptRows as row}
        <div>I want to {row.question}</div>
    {/each}
    {#if promptRows.length === 0}
        <div>{placeholder}</div>
    {/if}
</div>
