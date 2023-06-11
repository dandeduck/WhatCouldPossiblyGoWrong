<script lang="ts">
    import { createEventDispatcher } from 'svelte'

    let question = ''

    const dispatch = createEventDispatcher<{ help: string }>()

    function onKeydown(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            dispatch('help', question)
        }
    }
</script>

<div class="flex gap-5">
    <h2 class="m-auto">I want to</h2>
    <input
        class="outline-none w-64"
        bind:value={question}
        placeholder="Buy a unicorn on Amazon"
        on:keydown={onKeydown}
    />
    <button class="border-2 border-black rounded-xl p-1 uppercase" on:click={() => dispatch('help', question)}
        >help</button
    >
</div>
