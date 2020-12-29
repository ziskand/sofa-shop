<script>
    import { link } from "svelte-routing";
    import Hero from "../components/Hero.svelte";
    import Featured from "../components/Products/Featured.svelte";
</script>

<h1>Home page</h1>

<Hero>
    <a href="/products" class="btn ctn-primary btn-hero" use:link>shop now</a>
</Hero>
<Featured title={'featured products'} />
