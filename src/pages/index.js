import axios from "axios"
import { useRouter } from "next/router"
import { useState } from "react"
import Cookies from "js-cookie";

export default function Login() {
    const router = useRouter();
    const [state, setState] = useState({
        email: '',
        password: '',
    })

    function handleChange(e) {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    function login() {
      axios.post(`${process.env.API_URL}/api/users/login/`, state).then((resp) => {
        router.push('/u');
        Cookies.set('token', resp.data);
      }).catch((e) => {
        console.log(e);
      });
    }

    return (
        <div>
            <h1>Login</h1>
            <label>Email: </label>
            <input 
                onChange={handleChange}
                value={state.email}
                name="email" 
                type="text" />
            <br />
            <br />
            <label>Password: </label>
            <input 
                onChange={handleChange}
                value={state.password}
                name="password" 
                type="password" />
            <br />
            <br />
            <button onClick={login}>Login</button>
        </div>
    )

}