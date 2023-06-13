<script lang="ts">
    export let answer: Promise<string> | null = null
</script>

{#if answer}
    <div class="w-full px-5 py-1.5 bg-secondary rounded-2xl">
        {#await answer}
            Thinking...
        {:then value}
            {value}
        {/await}
    </div>
{/if}
