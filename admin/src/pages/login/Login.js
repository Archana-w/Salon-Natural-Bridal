import {useParams} from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

function Login(){

    const [cookies, setCookies] = useCookies(["admin_auth_token"]);
    var params = useParams();
    var navigate = useNavigate();

    const token = params.token;

    useEffect(()=>{
        
        //validate token
        axios.post("http://localhost:5000/token/validate",{token:token}).then((response)=>{

            var data = response.data;
            var status = data.status;
            if (status == "success") {

                var user = data.user;
                var type = user.type;

                if(type == "admin"){
                    setCookies("admin_auth_token", token);
                    navigate("/");
                }else{
                    alert("You can not access.");
                }

            } else if (status == "invalid_user") {
                var message = data.message;
                alert(message);
            } else {
                alert(JSON.stringify(data));
            }

        }).catch((error)=>{
            alert("Error - "+error);
        });

    });

    return(
        <>
            Auto login....
        </>
    );
}

export default Login;