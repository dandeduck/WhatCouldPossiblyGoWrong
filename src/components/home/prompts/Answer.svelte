<script lang="ts">
    import './answer.css'
    export let answer: string | null = null
    export let isLoading = false

    const INITIAL_TEXT = 'Want to know what could possibly go wrong? Ask away!'
</script>

<div
    class="px-5 py-1.5 bg-secondary transition-all duration-500 max-h-10 overflow-hidden answer"
    class:max-h-answer={answer && !isLoading}
    class:opacity-100={answer}
    class:translate-y-0={answer}
>
    {isLoading ? 'Thinking...' : answer || INITIAL_TEXT}
</div>
