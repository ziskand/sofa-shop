<script>
    import { onMount } from "svelte";
    import { navigate, link } from "svelte-routing";
    import user from "../stores/user";
    import cart, { cartTotal } from "../stores/cart";
    import submitOrder from "../strapi/submitOrder";
    import globalStore from "../stores/globalStore";

    $: isEmpty = !name || $globalStore.alert;

    let name = "";
    // stripe vars
    let cardElement;
    let cardErrors;
    let card;
    let stripe;
    let elements;

    onMount(() => {
        if (!$user.jwt) {
            navigate("/");
            return;
        }

        if ($cartTotal > 0) {
            stripe = Stripe(
                "pk_test_51I460FHfN5LnYgKLpXwlbffdHUT3iJXhjeF5k3yIoi8UFTh8OORva8MN8UD4o4p7L0YI7YOwCnO1KwSLyz8Kiogy00Uo3eZl9I"
            );
            elements = stripe.elements();
            card = elements.create("card");
            card.mount(cardElement);
            card.addEventListener("change", (event) => {
                if (event.error) {
                    cardErrors.textContent = event.error.message;
                } else {
                    cardErrors.textContent = "";
                }
            });
        }
    });

    const handleSubmit = async () => {
        globalStore.toggleItem(
            "alert",
            true,
            "submitting orders, please wait..."
        );
        let response = await stripe
            .createToken(card)
            .catch((err) => console.log(err));

        const { token } = response;
        if (token) {
            const { id } = token;
            let order = await submitOrder({
                name,
                total: $cartTotal,
                items: $cart,
                stripeTokenId: id,
                userToken: $user.jwt,
            });

            if (order) {
                globalStore.toggleItem(
                    "alert",
                    true,
                    "your order is complete!"
                );
                cart.set([]);
                localStorage.setItem("cart", JSON.stringify([]));
                navigate("/");

                return;
            } else {
                globalStore(
                    "alert",
                    true,
                    "the was an error with your order",
                    true
                );
            }
        } else {
            console.log(response);
        }
    };
</script>

{#if $cartTotal > 0}
    <section class="form">
        <h2 class="section-title">checkout</h2>
        <form class="checkout-form" on:submit|preventDefault={handleSubmit}>
            <h3>order total: ${$cartTotal}</h3>
            <div class="form-control">
                <label for="name">your name</label>
                <input type="text" id="name" bind:value={name} />
            </div>

            <div class="stripe-input">
                <label for="card-errors">Credit or Debit Card</label>
                <p class="stripe-info">
                    Test using this credit card:
                    <span>4242424242424242</span>
                    <br />
                    enter any 5 digits for zipcode
                    <br />
                    enter any 3 digit for cvc
                </p>
                <div id="card-element" bind:this={cardElement} />
                <div id="card-errors" bind:this={cardErrors} role="alert">
                    <!-- stripe errors -->
                </div>
            </div>
            {#if isEmpty}
                <p class="form-empty">please fill out name field</p>
            {/if}
            <button
                type="submit"
                disabled={isEmpty}
                class:disabled={isEmpty}
                class="btn btn-block btn-primary">submit</button>
        </form>
    </section>
{:else}
    <div class="checkout-empty">
        <h2>your cart is empty</h2>
        <a href="/products" use:link class="btn btn-primary">fill it</a>
    </div>
{/if}
