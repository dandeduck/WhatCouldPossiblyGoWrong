<script lang="ts">
    import { createEventDispatcher } from 'svelte'

    const DEFAULT_TEXT = 'Help :('
    const ANOTHER_TEXT = 'Another'

    export let disabled = false
    export let another = false

    $: text = another ? ANOTHER_TEXT : DEFAULT_TEXT

    const dispatch = createEventDispatcher<{ click: void }>()
</script>

<button
    class="border bg-primary border-black px-8 py-1.5 text-white disabled:opacity-50 min-w-max"
    {disabled}
    on:click={() => dispatch('click')}
    style="border-radius: 60px;"
>
    {text}
</button>
