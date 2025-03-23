export interface Iuser {
    name : string;
    email : string;
    password : string;
}

export type Iuserlogin = Omit <Iuser, "name">

export interface Iauth{
    user: Iuser;
    token: string;
}