<script lang="ts">
    export let answer: Promise<string> | null = null
</script>

{#if answer}
    <div class="w-full px-5 py-1.5 border-2 border-secondary rounded-2xl bg-white">
        {#await answer}
            Thinking...
        {:then value}
            {value}
        {/await}
    </div>
{/if}
