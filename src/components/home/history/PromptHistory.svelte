<script lang="ts">
    import PromptList from './PromptList.svelte'
    import type PromptRow from '$lib/PromptRow'
    import { createEventDispatcher } from 'svelte'
    import eye1 from '$lib/assets/eye1.png'
    import teaAndCoffee from '$lib/assets/coffee&tea.png'
    import ghost from '$lib/assets/ghost.png'
    import './promptHistory.css'

    export let promptRows: PromptRow[] = []
    export let placeholder = ''

    const dispatch = createEventDispatcher<{ prompt: PromptRow }>()
</script>

<div class="flex flex-col gap-2.5 transition-all relative">
    <h2>Recent searches</h2>
    <PromptList {promptRows} {placeholder} on:prompt={e => dispatch('prompt', e.detail)} />
    <img class="absolute eye" src={eye1} alt="eye" />
    <img class="absolute tea-and-coffee" src={teaAndCoffee} alt="Tea and coffee" />
    <img class="absolute -z-10 ghost" src={ghost} alt="A ghost!" />
</div>
