import request from "@/common/utils/request"


export interface ApiResult<T> {
    code: number;
    message: string;
    result: T;
}

export async function get<T>(url: string, params?: any): Promise<ApiResult<T>> {
    const response = await request.get<ApiResult<T>>(url, { params });
    return response.data;
}

export async function post<T>(url: string, data?: any): Promise<ApiResult<T>> {
    const response = await request.post<ApiResult<T>>(url, data);
    return response.data;
}

export async function put<T>(url: string, data?: any): Promise<ApiResult<T>> {
    const response = await request.put<ApiResult<T>>(url, data);
    return response.data;
}

export async function del<T>(url: string, params?: any): Promise<ApiResult<T>> {
    const response = await request.delete<ApiResult<T>>(url, { params });
    return response.data;
}

export async function getFileOpenKey<String>() {
    const data = await get<String>(
        '/localFile/getFileOpenKey',
    )
    return data.result;
}

//列表
export async function getList4LocalFile<T>(path: string, startNum: number, pageSize: number) {
    const data = await get<T>(
        '/localFile/list',
        { path, startNum, pageSize }
    )
    return data.result;
}

export async function deleteLocalFile(path: string) {
    const data = await del(
        `/localFile/deleteFile/${path}`
    )
}

export async function getKeywordSearchListt4LocalFile<T>(searchType: string, path: string, keyword: string) {
    const data = await get<T>(
        '/localFile/keywordSearchList',
        { searchType, path, keyword }
    )
    return data.result;
}

export async function getList4Picture<T>(path: string, startNum: number, pageSize: number) {
    const data = await get<T>(
        '/picture/list',
        { path, startNum, pageSize }
    )
    return data.result;
}

export async function getList4Video<T>(searchType: string, keyword: string, startNum: number, pageSize: number) {
    const data = await get<T>(
        '/video/list',
        { searchType, keyword, startNum, pageSize }
    )
    return data.result;
}

