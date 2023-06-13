<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    import Answer from './Answer.svelte'
    import Question from './Question.svelte'

    export let answer: Promise<string> | null = null

    const dispatch = createEventDispatcher<{ question: string }>()
</script>

<div class="flex flex-col gap-10 w-full text-lg">
    <Question on:help={e => dispatch('question', e.detail)} />
    <Answer {answer} />
</div>
