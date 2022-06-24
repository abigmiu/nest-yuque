export interface IYuequeData<T = any> {
    data: T;
}

export interface IMiu {
    userId: number;
    repoId?: number;
}

export interface IUser {
    id: number;
    name: string;
    avatar_url: string;
    login: string;
}

export interface IRepo {
    id: number;
    type: 'Book' | 'Design' | 'all';
    slug: string;
    name: string;
    user_id: number;
    namespace: string;
    created_at: Date;
    description: string;
    user: IUser;
}

export interface IDoc {
    id: number;
    title: string;
    slug: string;
    status: number;
    public: number;
    created_at: Date;
    updated_at: Date;
}
