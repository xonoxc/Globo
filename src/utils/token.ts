import { jwtDecode } from "jwt-decode"

const getTokenExpiry = (token: string): number => {
     const { exp } = jwtDecode<{ exp: number }>(token)
     return exp * 1000
}

export { getTokenExpiry }
