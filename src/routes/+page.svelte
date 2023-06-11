<script lang="ts">
    import Answer from '../components/Answer.svelte'
    import Question from '../components/Question.svelte'
    import type { PageData } from './$types'

    export let data: PageData

    let answer: Promise<string> | null = null

    async function fetchResponse(question: string) {
        if (!question) return

        answer = fetch('/api/answers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ question })
        })
            .then(res => res.json())
            .then(res => res.answer || "We couldn't think of anything good :(")
    }
</script>

<div class="flex w-full justify-center items-center h-screen">
    <div class="flex flex-col gap-10">
        <Question on:help={e => fetchResponse(e.detail)} />
        <Answer {answer} />
    </div>
</div>
