import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

const UserActivation = () => {
    // const location = useLocation();
    const dispatch = useDispatch();
    // const queryParams = new URLSearchParams(location.search);

    // Mengambil nilai parameter query
    // const token = queryParams.get("token");
    // console.log(token)
    // const navigate = useNavigate();
    // const serverUrl = import.meta.env.VITE_SERVER_URL;

    // useEffect(() => {
    //     axios.post(serverUrl + `/auth/activate/` + token)
    //         .then(res => { 
    //             console.log('Activation account successfully', res.data);
    //             dispatch({type:'ACTIVATION_SUCCESS',modalMessage:{header:'Account has been set up',text:'Account activated successfully, please login'}})
    //             navigate('/login');
    //         })
    //         .catch(err => {
    //             console.log('User Activation failed', err);
    //             // Handle the error as needed
    //         });
    // }, [token, navigate, serverUrl]);

    // return <h1>{token}</h1>;
};

export default UserActivation;
