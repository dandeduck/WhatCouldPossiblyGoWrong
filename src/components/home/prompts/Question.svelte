<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    import Blob2 from '../../icons/Blob2.svelte'

    export let helpDisabled = false
    export let helpText = 'Help'

    const dispatch = createEventDispatcher<{ help: string }>()

    let question = ''

    function onKeydown(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            dispatch('help', question)
        }
    }
</script>

<div class="flex w-full">
    <div class="relative flex min-w-max items-center pr-2">
        <h2>I want to:</h2>
        <Blob2 className="absolute -top-1/2 -left-5 -z-10" />
    </div>
    <input
        class="outline-none border-b border-black bg-transparent w-full h-min m-auto text-primary placeholder:text-primary placeholder:opacity-50"
        bind:value={question}
        placeholder="Buy a unicorn on Amazon"
        on:keydown={onKeydown}
    />
    <button
        class="border bg-primary border-black rounded-3xl px-8 py-1.5 text-white ml-4 disabled:opacity-50"
        disabled={helpDisabled}
        on:click={() => dispatch('help', question)}
    >
        {helpText}
    </button>
</div>
