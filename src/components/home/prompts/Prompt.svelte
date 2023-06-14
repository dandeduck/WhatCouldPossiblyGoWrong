<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    import Answer from './Answer.svelte'
    import Question from './Question.svelte'

    export let answer: Promise<string> | null = null
    export let question = ''

    export let helpText = 'Help'
    export let helpDisabled = false

    const dispatch = createEventDispatcher<{ question: string }>()
</script>

<div class="flex flex-col gap-5 w-full text-lg">
    <Question on:help={e => dispatch('question', e.detail)} {helpDisabled} {helpText} bind:question />
    <Answer {answer} />
</div>
