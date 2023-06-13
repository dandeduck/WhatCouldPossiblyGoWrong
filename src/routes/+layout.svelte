<script lang="ts">
    import '../app.css'
    import { dev } from '$app/environment'
    import { inject } from '@vercel/analytics'
    import Header from '../components/skeleton/Header.svelte'

    inject({ mode: dev ? 'development' : 'production' })
</script>

<div class="font-serif">
    <Header />
    <main>
        <slot />
    </main>
</div>
