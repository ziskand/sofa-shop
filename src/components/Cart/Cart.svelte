<script>
    import gloablStore from "../../stores/globalStore";
    import user from "../../stores/user.js";
    import { fly, fade, blur } from "svelte/transition";
    import { link } from "svelte-routing";
    import ItemList from "./ItemList.svelte";
</script>

<div class="cart-overlay" transition:blur>
    <div class="cart-container" transition:fly={{ x: 1000 }}>
        <div class="cart" transition:fade={{ delay: 400 }}>
            <div class="cart-header">
                <button
                    class="btn-close"
                    on:click={() => {
                        gloablStore.toggleItem('cart', false);
                    }}>
                    <i class="fas fa-window-close" />
                </button>
                <h2 class="cart-title">yout bag</h2>
                <span />
            </div>

            <ItemList />

            <div class="cart-footer">
                {#if $user.jwt}
                    <a
                        href="/checkout"
                        use:link
                        class="btn btn-primary btn-block"
                        on:click={() => {
                            gloablStore.toggleItem('cart', false);
                        }}>checkout</a>
                {:else}
                    <p class="cart-login">
                        in order to checkout please
                        <a
                            href="/"
                            use:link
                            on:click={() => {
                                gloablStore.toggleItem('cart', false);
                            }}>
                            login
                        </a>
                    </p>
                {/if}
            </div>
        </div>
    </div>
</div>
