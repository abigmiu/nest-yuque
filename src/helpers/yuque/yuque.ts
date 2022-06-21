import { IUser, IRepo } from 'src/models/yuque';
import http from './request';

/** 获取用户信息 */
export function getUser(token: string): Promise<IUser> {
    return http.get(token, '/user');
}

/** 根据userId获取Book类型的知识库列表 */
export function getReposById(token: string, id: number): Promise<Array<IRepo>> {
    return http.get(token, `/users/${id}/repos`, {
        params: {
            type: 'Book',
        },
    });
}

/** 根据repo-id获取文档列表 */
export function getDocsById(
    token: string,
    id: number,
    query: Record<string, number>,
) {
    return http.get(token, `/repos/${id}/docs`, {
        params: query,
    });
}

/** 创建文档 */
export function createDoc(
    token: string,
    repoId: number,
    data: Record<string, any>,
) {
    return http.post(token, `/repos/${repoId}/docs`, data);
}

export function updateDoc(
    token: string,
    repoId: number,
    data: Record<string, any>,
) {
    return http.put(token, `/repos/${repoId}/docs`, data);
}
