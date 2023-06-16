<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    import Answer from './Answer.svelte'
    import Question from './Question.svelte'
    import HelpButton from './HelpButton.svelte'

    export let answer: string | null = null
    export let question = ''
    export let isLoading = false

    let placeholder = ''
    let another = false

    $: another = !question && question !== ''
    $: another = !!answer

    const dispatch = createEventDispatcher<{ prompt: string }>()

    const sendQuestion = () => {
        dispatch('prompt', question || placeholder)
    }
</script>

<div class="w-full">
    <div class="flex gap-5 mb-2.5">
        <Question on:question={sendQuestion} bind:question bind:placeholder />
        <div class="hidden md:block min-w-max">
            <HelpButton disabled={isLoading} {another} on:click={sendQuestion} />
        </div>
    </div>
    <Answer {answer} />
    <div class="md:hidden mt-3">
        <HelpButton disabled={isLoading} {another} on:click={sendQuestion} />
    </div>
</div>
