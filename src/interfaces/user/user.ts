export interface Iuser {
    id : number;
    name : string;
    email : string;
    password : string;
}

export type Iuserlogin = Omit <Iuser, "name">

export interface Iauth{
    user: Iuser;
    accessToken: string,
    refreshToken: string;
}