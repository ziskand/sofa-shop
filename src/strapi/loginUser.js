import axios from "axios";
import { setupUser } from "./setupUser";
import url from "./URL"

async function loginUser(email, passowrd) {
    const response = await axios
        .post(`${url}/auth/local`, {
            identifier: email,
            password: passowrd,
        })
        .catch(error => console.log(error))

    if (response) {
        setupUser(response)
    }

    return response
}

export default loginUser;