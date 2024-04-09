import {useParams} from 'react-router-dom';
import {useEffect} from 'react';

function AdminLogin(){

    var params = useParams();
    var token = params.token;

    useEffect(()=>{
        window.location.href = "http://localhost:3001/login/" + token;
    });

    return(
        <>
            Admin auto login...
        </>
    );
}

export default AdminLogin;