<script lang="ts">
    import '../app.css'
    import { dev } from '$app/environment'
    import { inject } from '@vercel/analytics'
    import Header from '../components/skeleton/Header.svelte'
    import Footer from '../components/skeleton/Footer.svelte'
    import BackgroundIcons from '../components/skeleton/BackgroundIcons.svelte'

    inject({ mode: dev ? 'development' : 'production' })
</script>

<div class="font-serif min-h-screen flex flex-col">
    <div class="relative overflow-hidden">
        <Header />
    </div>
    <main class="px-5 md:px-10 lg:px-0 lg:max-w-4xl lg:mx-auto overflow-hidden xl:overflow-visible flex-1">
        <slot />
    </main>
    <Footer />
</div>
<BackgroundIcons />
