import { useCookies } from 'react-cookie';

function useAuthToken(){

    const[cookies,setCookies] = useCookies(["auth_token"]);
    var authToken = cookies.auth_token;
    
    if(authToken == undefined){
        return null;
    }else{
        return authToken;
    }
    
}

export { useAuthToken };
