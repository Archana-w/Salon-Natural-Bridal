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

function useCurrentUserType(){

    const[cookies,setCookies] = useCookies(["user_type"]);
    var userType = cookies.user_type;

    if(userType == undefined){
        return null;
    }else{
        return userType;
    }

}

export { useAuthToken, useCurrentUserType };
