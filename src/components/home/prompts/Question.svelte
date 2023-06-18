<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    import wackySentences from './wackySentences'

    export let placeholder = generatePlaceholder()

    $: if (!question) {
        placeholder = generatePlaceholder()
    }

    const dispatch = createEventDispatcher<{ question: string }>()

    export let question = ''

    function onKeydown(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            dispatch('question', question || placeholder)
        }
    }

    function generatePlaceholder() {
        return wackySentences[Math.floor(Math.random() * wackySentences.length)]
    }
</script>

<div class="flex gap-2 w-full">
    <div class="flex items-center">
        <h2 class="min-w-max">I want to:</h2>
    </div>
    <input
        maxlength="256"
        class="outline-none border-b border-black bg-transparent flex-1 h-min m-auto text-primary placeholder:text-primary placeholder:opacity-50 rounded-none"
        {placeholder}
        bind:value={question}
        on:keydown={onKeydown}
    />
</div>
