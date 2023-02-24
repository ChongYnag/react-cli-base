import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getLocalStorage, clearLocalStorage } from "../utils";
import Store from "@/store";
import { Toast } from 'antd-mobile'

// axios.defaults.withCredentials = true;
const timeout: number = 50 * 1000;
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json; charset=UTF-8";
const requestHeader = (): AxiosRequestConfig => {
    const param: AxiosRequestConfig = {
        timeout,
        withCredentials: true,
        headers: {
            token: getLocalStorage('access_token'),
        },
    };
    return param;
};
let _axios: AxiosInstance;
const newAxios = () => {
    _axios = axios.create(requestHeader());
    _axios.interceptors.request.use((config: any) => {
        const state = Store.getState();
        let token = state?.auth.access_token;
        if (token) {
            config.token = token;
        }
        config.headers = {
            ...config.headers,
        };
        return config;
    })
    _axios.interceptors.response.use((response: AxiosResponse) => {
        if (!response.data || (response.data.code && response.data.code !== 200)) {
            Toast.show({
                icon: 'fail',
                content: response.data.msg || '请求数据异常，请稍后再试'
            })
        }
        return Promise.resolve(response.data || {});

    }, (error) => {
        const originalRequest = error.config;
        if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1 && !originalRequest._retry) {
            Toast.show({
                icon: 'fail',
                content: '请求超时'
            })
            return Promise.reject({ message: '请求超时' });
        }
        let errorText;
        const { response: errResponse } = error;
        const errmessages: any = {
            400: '错误请求',
            401: '未授权，请重新登录',
            403: '拒绝访问',
            404: '请求错误,未找到该资源',
            405: '请求方法未允许',
            408: '请求超时',
            500: '服务器端出错',
            502: '网络错误',
            503: '服务不可用',
            504: '网络超时',
            505: 'http版本不支持该请求',
            'else': `连接错误${errResponse.status || ''}`,
        };
        if (errResponse) {
            const errorStatus = errResponse?.data?.code || 'else';
            const notLogin = [401, 503]; //需要登录
            errorText = errmessages[errorStatus] || errmessages.else;
            if (notLogin.includes(errorStatus)) {
                clearLocalStorage()
                errorText = '登录失效'
            }
        } else {
            errorText = '网络出现问题，请稍后再试';
        }
        Toast.show({
            icon: 'fail',
            content: errorText
        })
        return errResponse || {};
    })
}

export const POST = (url: string, data = {}) => {
    newAxios()
    return _axios.post(url, data);
}

export const GET = (url:string, data = {}) => {
    newAxios();
    return _axios.get(url, {params: data})
};

/**
url?: string;    // 用于请求的服务器 URL
method?: Method;  // 创建请求时使用的方法，默认是Get
baseURL?: string;   // 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
                    // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL。
transformRequest?: AxiosTransformer | AxiosTransformer[];   // 允许在向服务器发送前，修改请求数据，只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法。
                                                            // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream。
transformResponse?: AxiosTransformer | AxiosTransformer[];  // 在传递给 then/catch 前，允许修改响应数据
headers?: any;    // 即将被发送的自定义请求头
params?: any;     // 即将与请求一起发送的 URL 参数。必须是一个无格式对象(plain object)或 URLSearchParams 对象
paramsSerializer?: (params: any) => string;  // 一个负责 `params` 序列化的函数(e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
data?: any;   // 作为请求主体被发送的数据，只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'，
              // 在没有设置 `transformRequest` 时，必须是以下类型之一：string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
              // 浏览器专属：FormData, File, Blob
              // Node 专属： Stream
timeout?: number; // 指定请求超时的毫秒数(0 表示无超时时间)，如果请求话费了超过 `timeout` 的时间，请求将被中断
timeoutErrorMessage?: string; //
withCredentials?: boolean;    // 表示跨域请求时是否需要使用凭证(默认为false)
adapter?: AxiosAdapter;       // 允许自定义处理请求，以使测试更轻松. 返回一个 promise 并应用一个有效的响应 (查阅 [response docs](#response-api)).
auth?: AxiosBasicCredentials; // 表示应该使用 HTTP 基础验证，并提供凭据. 这将设置一个 `Authorization` 头，覆写掉现有的任意使用 `headers` 设置的自定义 `Authorization`头
responseType?: ResponseType;  // 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'(默认是json)
xsrfCookieName?: string;      // 用作 xsrf token 的值的cookie的名称(默认是'XSRF-TOKEN')
xsrfHeaderName?: string;      // 承载 xsrf token 的值的 HTTP 头的名称(默认是'X-XSRF-TOKEN')
onUploadProgress?: (progressEvent: any) => void;    // 允许为上传处理进度事件
onDownloadProgress?: (progressEvent: any) => void;  // 允许为下载处理进度事件
maxContentLength?: number;    //  定义允许的响应内容的最大尺寸
validateStatus?: (status: number) => boolean;   // 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。
                                                // 如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve;
                                                // 否则，promise 将被 rejecte
maxRedirects?: number;  // 定义在 node.js 中 follow 的最大重定向数目. 如果设置为0，将不会 follow 任何重定向(默认是5)
socketPath?: string | null; //
// `httpAgent` 和 `httpsAgent` 分别在 node.js 中用于定义在执行 http 和 https 时使用的自定义代理。
// 允许像这样配置选项: `keepAlive` 默认没有启用
httpAgent?: any;
httpsAgent?: any;
// 定义代理服务器的主机名称和端口
// `auth` 表示 HTTP 基础验证应当用于连接代理，并提供凭据
// 这将会设置一个 `Proxy-Authorization` 头，覆写掉已有的通过使用 `header` 设置的自定义 `Proxy-Authorization` 头。
proxy?: AxiosProxyConfig | false;
cancelToken?: CancelToken;  // 指定用于取消请求的 cancel token
 */
