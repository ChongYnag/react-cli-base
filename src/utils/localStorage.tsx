import {
    type
} from './type';

const Stg = window.localStorage;
const isObj_ARR = (val : any) => ['object','array'].includes(type(val));
export const setLocalStorage = (key : any, val : any) => key&&val ? Stg.setItem(key , isObj_ARR(val) ? JSON.stringify(val) : String(val)) : false;
export const getLocalStorage = (key = 'state') => (key && Stg.getItem(key)) || false;
export const removeLocalStorage =(key : string) => Stg.removeItem(key);
export const clearLocalStorage = () => Stg.clear();
