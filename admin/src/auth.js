import { useCookies } from 'react-cookie';

function useAuthToken(){

    const [cookies, setCookies] = useCookies(["admin_auth_token"]);
    var authToken = cookies.admin_auth_token;
    
    if(authToken == undefined){
        return null;
    }else{
        return authToken;
    }
    
}

export { useAuthToken };
