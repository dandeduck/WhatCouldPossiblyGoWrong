<script lang="ts">
    import './answer.css'
    export let answer: string | null = null

    const INITIAL_TEXT = 'Want to know what could possibly go wrong? Ask away!'
</script>

<div
    class="px-5 py-1.5 bg-secondary transition-all duration-500 overflow-hidden answer"
    class:max-h-16={!answer}
    class:max-h-answer={answer}
>
    {answer || INITIAL_TEXT}
</div>
