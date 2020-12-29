<script>
    import user from "../stores/user";
    import globalStore from "../stores/globalStore";

    import { link } from "svelte-routing";
</script>

{#if $user.jwt}
    <a
        href="/"
        class="logout-btn"
        on:click={() => globalStore.toggleItem('sidebar', false)}>
        logout
    </a>
{:else}
    <a href="/" on:click={() => globalStore.toggleItem('sidebar', false)}>
        login
    </a>
{/if}
