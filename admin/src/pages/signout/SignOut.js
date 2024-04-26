import {useCookies} from 'react-cookie';
import {useNavigate} from 'react-router-dom';
import { useEffect } from 'react';

function SignOut(){

    const [cookies, setCookies] = useCookies(["admin_auth_token"]);
    var navigate = useNavigate();

    useEffect(function(){

        setCookies("admin_auth_token", null);

        //redirect login
        window.location.href = "http://localhost:3000/login";

    });

    return(
        "Please wait..."
    );
}


export default SignOut;