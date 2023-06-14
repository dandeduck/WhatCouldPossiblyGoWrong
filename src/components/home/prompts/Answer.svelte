<script lang="ts">
    export let answer: Promise<string> | null = null
</script>

<div
    class="w-full px-5 py-1.5 bg-secondary rounded-2xl transition-all h-full"
    class:h-0={!answer}
    class:opacity-0={!answer}
>
    {#await answer}
        Thinking...
    {:then value}
        {value || ''}
    {/await}
</div>
