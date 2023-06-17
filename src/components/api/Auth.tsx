import axios from "axios";
import { LoginType } from './../types';

export async function LoginFunc(userinfo: LoginType) {
    try {
        const loginResponse = await axios.post(`${import.meta.env.VITE_APP_URL_LOCAL}/api/v1/user/login`, userinfo);

        if (loginResponse.data.success) {
            return loginResponse.data.token;
        }
    } catch (error: any) {
        console.error(error);
        throw error;
    }
}

export async function RegisterFunc(Userform: any) {
    try {
        const RegisterRes = await axios.post(`${import.meta.env.VITE_APP_URL_LOCAL}/api/v1/user/register`, Userform);

        if (RegisterRes.data.success) {
            return RegisterRes.data.token;
        }
    } catch (error: any) {
        console.log(error)
        throw error;
    }
}

