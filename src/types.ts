export interface IUser {
  id: number;
  email: string;
  password: string;
  firstName: string;
  secondName: string;
  tel: string;
  roleId: number;
}

export interface IOrganization {
  id?: number;
  name: string;
  description: string;
  location: string;
  photo?: string;
  userId: number;
  category: 1;
}

export interface IAuthResponse {
  token: string;
  user: IUser;
}

export interface ILoginCredentials {
  email: string;
  password: string;
}

export interface IRegisterCredentials {
  email: string;
  password: string;
  firstName: string;
  secondName: string;
  tel: string;
}

export type OrganizationAction = "add" | "edit" | "delete";