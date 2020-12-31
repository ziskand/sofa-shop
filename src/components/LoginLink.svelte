<script>
    import userStore, { logoutUser } from "../stores/user";
    import globalStore from "../stores/globalStore";

    import { link } from "svelte-routing";
</script>

{#if $userStore.jwt}
    <a
        href="/"
        class="logout-btn"
        on:click={() => {
            logoutUser(), globalStore.toggleItem('sidebar', false);
        }}
        use:link>
        logout
    </a>
{:else}
    <a
        href="/login"
        on:click={() => globalStore.toggleItem('sidebar', false)}
        use:link>
        login
    </a>
{/if}
