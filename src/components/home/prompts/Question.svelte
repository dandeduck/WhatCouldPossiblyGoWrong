<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    import Blob2 from '../../icons/Blob2.svelte'

    let question = ''

    const dispatch = createEventDispatcher<{ help: string }>()

    function onKeydown(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            dispatch('help', question)
        }
    }
</script>

<div class="flex gap-2 w-full">
    <div class="relative flex min-w-max items-center">
        <h2>I want to:</h2>
        <Blob2 className="absolute -top-1/2 -left-5 -z-10" />
    </div>
    <input
        class="outline-none border-b border-black w-full h-min m-auto"
        bind:value={question}
        placeholder="Buy a unicorn on Amazon"
        on:keydown={onKeydown}
    />
    <button
        class="border bg-[#4876FF] border-black rounded-3xl px-8 py-1.5 text-white m"
        on:click={() => dispatch('help', question)}
    >
        Help
    </button>
</div>
