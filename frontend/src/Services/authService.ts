import api from './axios';

interface RegisterPayload{
    name:string;
    email:string;
    passwordHash:string;
}
interface  LoginPayload{
    email: string;
    passwordHash: string;
}

export const AuthService={
    login: async (loginBody: LoginPayload)=>{
        const response = await api.post('/users/login',loginBody);
        return response.data
    },
    register: async (registerBody: RegisterPayload)=>{
        const response = await api.post('/users/register',registerBody);
        return response.data;
    }
}