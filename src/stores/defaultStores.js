import { derived, writable } from "svelte/store"
import localProducts from "../localProducts"
 
const flattenProducts = (data) => {
    return data.map(item => {
        let image = item.image.url
        return {...item, image}
    })
}

const store = writable(flattenProducts([...localProducts]));

export const featuredStore = derived(store, $featured => {   
       return $featured.filter((item) => item.featured);
}) 

export default store