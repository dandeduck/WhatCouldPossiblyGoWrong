<script lang="ts">
    import comet from '$lib/assets/comet.png'
    import duck from '$lib/assets/duck.png'
    import './header.css'
    import LogoMobile from './icons/LogoMobile.svelte'
    import LogoDesktop from './icons/LogoDesktop.svelte'
</script>

<header class="flex justify-center overflow-visible pt-10" style="padding-bottom: 50px;">
    <div class="relative overflow-visible">
        <LogoMobile className="md:hidden" />
        <LogoDesktop className="hidden md:block" />
        <img class="absolute -z-10 comet" src={comet} alt="comet" />
        <img class="absolute -z-10 bottom-0 right-5 duck" src={duck} alt="duck" />
    </div>
</header>
