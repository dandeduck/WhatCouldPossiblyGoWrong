<script lang="ts">
    export let answer: Promise<string> | null = null
</script>

{#if answer}
    <div class="flex flex-col gap-2">
        <h2>Answer</h2>
        {#await answer}
            <p class="w-full">Thinking...</p>
        {:then value}
            <p class="w-full">{value}</p>
        {/await}
    </div>
{/if}
