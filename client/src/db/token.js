const TOKEN = 'token';

export default class TokenStorage{
    saveToken(token){
        localStorage.setItem(TOKEN,token);
    }
    getToken(){
        localStorage.getItem(TOKEN);
    }
    clearToken(){
        localStorage.clear(TOKEN);
    }
}