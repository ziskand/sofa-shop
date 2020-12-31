import { setStorageUser, setUser } from "../stores/user"

export const setupUser = (response) => {
    const { jwt, user: { username } } = response.data
    const confirmedUser = { username, jwt }

    setStorageUser(confirmedUser)
    setUser(confirmedUser)
}