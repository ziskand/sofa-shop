import { writable } from "svelte/store"

const userStore = writable(getStorageUser())

function getStorageUser() {
    let user = localStorage.getItem("user")
    return user ? JSON.parse(user) : { username: null, jwt: null }
}

export const setStorageUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user))
}

export const setUser = (user) => {
    userStore.set(user)
}

export const logoutUser = () => {
    localStorage.clear()
    userStore.set({ username: null, jwt: null })
}

export default userStore