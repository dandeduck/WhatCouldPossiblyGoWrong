<script lang="ts">
    export let answer: Promise<string> | null = null
</script>

{#if answer}
    <div class="flex flex-col gap-2 max-w-md">
        <h2>Answer</h2>
        {#await answer}
            <p>Thinking...</p>
        {:then value}
            <p>{value}</p>
        {/await}
    </div>
{/if}
