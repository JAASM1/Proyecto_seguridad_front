export interface Iuser {
    id : number;
    name : string;
    email : string;
    password : string;
}

export type Iuserlogin = Omit <Iuser, "name">
export type IUserRegister = Omit<Iuser, 'id'>

export interface Iauth{
    user: Iuser;
    accessToken: string,
    refreshToken: string;
}