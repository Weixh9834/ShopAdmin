import { useCookies } from '@vueuse/integrations/useCookies'

const cookie = useCookies()
const ADMINTOKEN = "admin-token"
    //get
export function getToken() {
    return cookie.get(ADMINTOKEN)
}
//set
export function setToken(token) {
    return cookie.set(ADMINTOKEN, token)
}
//remove
export function removeToken() {
    return cookie.remove(ADMINTOKEN)
}