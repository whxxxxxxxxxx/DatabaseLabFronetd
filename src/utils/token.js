const TOKENKEY = 'token_key'
const REFRESHTOKENKEY = 'refresh_token_key'

function setToken(token){
    localStorage.setItem(TOKENKEY,token)
}

function getToken(){
    return localStorage.getItem(TOKENKEY)
}

function setRefreshToken(refresh_token){
    localStorage.setItem(REFRESHTOKENKEY,refresh_token)
}

function getRefreshToken(){
    return localStorage.getItem(REFRESHTOKENKEY)
}

function removeToken(){
    localStorage.removeItem(TOKENKEY)
}

export {
    setToken,
    getToken,
    removeToken,
    getRefreshToken,setRefreshToken
}