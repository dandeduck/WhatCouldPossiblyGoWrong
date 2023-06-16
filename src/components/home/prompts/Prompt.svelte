<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    import Answer from './Answer.svelte'
    import Question from './Question.svelte'
    import HelpButton from './HelpButton.svelte'

    export let answer: string | null = null
    export let isLoading = false
    export let question = ''

    let placeholder = ''
    let another = false

    $: another = !question
    $: another = !!answer

    const dispatch = createEventDispatcher<{ question: string }>()

    const sendQuestion = () => {
        dispatch('question', question || placeholder)
    }
</script>

<div class="w-full">
    <div class="flex gap-5 mb-2.5">
        <Question on:help={sendQuestion} bind:question bind:placeholder />
        <div class="hidden md:block">
            <HelpButton disabled={isLoading} {another} on:click={sendQuestion} />
        </div>
    </div>
    <Answer {answer} {isLoading} />
    <div class="md:hidden mt-3">
        <HelpButton disabled={isLoading} {another} on:click={sendQuestion} />
    </div>
</div>
