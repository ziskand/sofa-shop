<script>
    import products from "../../stores/products";
    import Loading from "../Loading.svelte";
    import Product from "./Product.svelte";

    export let title = "";
</script>

{#if $products.length === 0}
    <Loading />
{:else}
    <section class="section">
        <h2 class="section-title">{title}</h2>
        <div class="products-center">
            {#each $products as product (product.id)}
                <Product {product} />
            {/each}
        </div>
    </section>
{/if}
