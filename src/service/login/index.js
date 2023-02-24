import { login_path, } from './path';
import {  POST  } from "@/https/axios"
//登录
export const login = (data) => {
    return POST(login_path(), data);
};