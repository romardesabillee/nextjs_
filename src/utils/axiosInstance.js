import axios from "axios";
import Cookies from "js-cookie";

const authAxios = axios.create({
    headers: {
        Authorization: `Token ${Cookies.get('token')}`
    }
});

export {
    authAxios,
}