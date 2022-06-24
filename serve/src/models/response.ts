export interface IResponse {
    data: JSON | null | string;
    code: number;
    message?: string;
}
