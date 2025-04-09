export enum AuthType {
    SIGNUP = 'signup',
    SIGNIN = 'signin'
}

export type AuthProps = {
    componentType: AuthType
}