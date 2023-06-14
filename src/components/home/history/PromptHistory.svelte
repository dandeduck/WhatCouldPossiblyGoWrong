<script lang="ts">
    import PromptList from './PromptList.svelte'
    import type PromptRow from '$lib/PromptRow'

    export let promptRows: PromptRow[] = []
    export let placeholder = ''
</script>

<div class="flex flex-col gap-2.5">
    <h2>Recent searches</h2>
    <PromptList {promptRows} {placeholder} />
</div>
