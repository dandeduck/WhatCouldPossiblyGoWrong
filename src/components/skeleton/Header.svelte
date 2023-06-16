<script lang="ts">
    import comet from '$lib/assets/comet.png'
    import duck from '$lib/assets/duck.png'
    import cloud from '$lib/assets/cloud.png'
    import './header.css'
</script>

<header class="flex justify-center overflow-visible pt-10" style="padding-bottom: 50px;">
    <div class="relative overflow-visible">
        <h1 class="md:w-title-desktop w-title-mobile text-center text-xl uppercase md:text-4xl">
            what could possibly go wrong?
        </h1>
        <img class="absolute -z-10 comet" src={comet} alt="comet" />
        <img class="absolute -z-10 bottom-0 right-5 duck" src={duck} alt="duck" />
        <img class="absolute -z-10 bottom-3 -scale-100 cloud -z-10" src={cloud} alt="cloud" />
    </div>
</header>
