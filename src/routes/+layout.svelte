<script lang="ts">
    import '../app.css'
    import { dev } from '$app/environment'
    import { inject } from '@vercel/analytics'
    import Header from '../components/skeleton/Header.svelte'
    import Footer from '../components/skeleton/Footer.svelte'

    inject({ mode: dev ? 'development' : 'production' })
</script>

<div class="font-serif">
    <div class="relative overflow-hidden">
        <Header />
    </div>
    <main class="px-5 md:px-10 lg:px-0 lg:max-w-4xl lg:mx-auto overflow-hidden xl:overflow-visible">
        <slot />
    </main>
    <Footer />
</div>
