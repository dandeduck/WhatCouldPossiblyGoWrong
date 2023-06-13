<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    import Answer from './Answer.svelte'
    import Question from './Question.svelte'

    export let answer: Promise<string> | null = null

    let helpText = 'Help'
    let helpDisabled = false

    $: if (answer) {
        helpDisabled = true
    }
    $: answer?.then(() => {
        helpText = 'Another'
        helpDisabled = false
    })

    const dispatch = createEventDispatcher<{ question: string }>()
</script>

<div class="flex flex-col gap-2.5 w-full text-lg">
    <Question on:help={e => dispatch('question', e.detail)} {helpDisabled} {helpText} />
    <Answer {answer} />
</div>
