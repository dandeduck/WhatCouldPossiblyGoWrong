<script lang="ts">
    import '../app.css'
    import { dev } from '$app/environment'
    import { inject } from '@vercel/analytics'
    import Header from '../components/skeleton/Header.svelte'
    import PeepingDuck from '../components/icons/PeepingDuck.svelte'

    inject({ mode: dev ? 'development' : 'production' })
</script>

<div class="font-serif">
    <div class="relative">
        <Header />
        <PeepingDuck className="absolute bottom-1/4 right-0 -z-10 scale-150" />
    </div>
    <main class="p-5">
        <slot />
    </main>
</div>
