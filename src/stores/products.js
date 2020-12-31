import { derived, writable } from "svelte/store"
import getProducts from "../strapi/getProducts"
import url from "../strapi/URL"


const store = writable([], () => {
    setProducts()
    return () => { }
});


async function setProducts() {
    let products = await getProducts();
    console.log(products)
    if (products) {
        products = flattenProducts(products)
        store.set(products)
    }
}

function flattenProducts(data) {
    return data.map(item => {
        // let image = item.image.url
        let image = `${url}${item.image.url}`
        return { ...item, image }
    })
}

export const featuredStore = derived(store, $featured => {
    return $featured.filter((item) => item.featured)
})

export default store