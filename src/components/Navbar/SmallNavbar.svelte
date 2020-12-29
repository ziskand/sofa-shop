<script>
    import { link } from "svelte-routing";
    import CartButton from "../Cart/CartButton.svelte";
    import gloablStore from "../../stores/globalStore";

    let openSideBar = gloablStore.toggleItem;
</script>

<nav class="navbar">
    <div class="nav-center">
        <button
            class="btn-sidebar-toggle"
            on:click={() => {
                openSideBar('sidebar', true);
            }}>
            <i class="fas fa-bars" />
        </button>
        <a href="/" use:link class="nav-logo">
            <img src="/assets/images/logo.svg" class="logo" alt="razors logo" />
        </a>
        <CartButton />
    </div>
</nav>
