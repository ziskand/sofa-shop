
import baseUrl from "./URL"
import { setupUser } from "./setupUser.js"
import axios from "axios"

async function registerUser(email, password, username) {
    const url = `${baseUrl}/auth/local/register`
    axios
        .post(url, {
            username: username,
            email: email,
            password: password,
        })
        .then(response => {
            // Handle success.
            console.log('Well done!');
            console.log('User profile', response.data.user);
            console.log('User token', response.data.jwt);
        })
        .catch(error => {
            // Handle error.
            console.log('An error occurred:', error.response);
        });

    if (response) {
        setupUser(respone)
    }

    return response
}

export default registerUser;