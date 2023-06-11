<script lang="ts">
    import type { PageData } from './$types'

    export let data: PageData

    let question = ''
    let answer: Promise<string> | null = null

    function onKeydown(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            fetchResponse()
        }
    }

    async function fetchResponse() {
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
        <div class="flex gap-5">
            <h2>I want to</h2>
            <input
                class="outline-none"
                bind:value={question}
                placeholder="Buy a unicorn on Amazon"
                on:keydown={onKeydown}
            />
            <button on:click={fetchResponse}>help</button>
        </div>
        {#if answer}
            <div class="flex flex-col gap-2 max-w-md">
                <h2>Answer</h2>
                {#await answer}
                    <p>Thinking...</p>
                {:then value}
                    <p>{value}</p>
                {/await}
            </div>
        {/if}
    </div>
</div>
