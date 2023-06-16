<script lang="ts">
    import '../app.css'
    import { dev } from '$app/environment'
    import { inject } from '@vercel/analytics'
    import Header from '../components/skeleton/Header.svelte'

    inject({ mode: dev ? 'development' : 'production' })
</script>

<div class="font-serif">
    <div class="relative overflow-hidden">
        <Header />
    </div>
    <main class="pt-5 px-5 md:px-10 lg:px-48 overflow-hidden">
        <slot />
    </main>
</div>
