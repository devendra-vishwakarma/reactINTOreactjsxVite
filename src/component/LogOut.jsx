import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const LogOut = () => {
    const navigate = useNavigate();
    // return (<>
    //     <button>
    //         <a href="http://127.0.0.1:3001/ReactWithYii/YiiLogin/basic/web/index.php?r=site%2Flogin"></a>
    //     </button>
    // </>)

    let token = localStorage.getItem("token");

    if (token) {
        localStorage.removeItem("token");
        navigate("/signIn");
    }
}

export default LogOut;