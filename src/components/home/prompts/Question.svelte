<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    import Blob2 from '../../icons/Blob2.svelte'
    import wackySentences from './wackySentences'

    const defaultHelpText = 'Help'

    export let helpDisabled = false
    export let helpText = defaultHelpText
    export let questionPlaceholder = generatePlaceholder()

    $: if (!question) {
        questionPlaceholder = generatePlaceholder()
    }

    const dispatch = createEventDispatcher<{ help: string }>()

    export let question = ''

    function onKeydown(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            dispatch('help', question)
        }
        helpText = defaultHelpText
    }

    function generatePlaceholder() {
        return wackySentences[Math.floor(Math.random() * wackySentences.length)].toLowerCase()
    }
</script>

<div class="flex flex-col gap-4 md:flex-row w-full">
    <div class="flex gap-2 w-full">
        <div class="relative flex min-w-max items-center">
            <h2>I want to:</h2>
            <Blob2 className="absolute -left-5 -z-10" />
        </div>
        <input
            class="outline-none border-b border-black bg-transparent w-full h-min m-auto text-primary placeholder:text-primary placeholder:opacity-50"
            bind:value={question}
            placeholder={questionPlaceholder}
            on:keydown={onKeydown}
        />
    </div>
    <button
        class="border bg-primary border-black rounded-3xl px-8 py-1.5 text-white disabled:opacity-50"
        disabled={helpDisabled}
        on:click={() => dispatch('help', question || questionPlaceholder)}
    >
        {helpText}
    </button>
</div>
