import React from "react";
import { useHistory } from "react-router";
import './style.css'
import AuthContext from './../../provider/AuthProvider'

import NavBar from "../../components/navbar";

const Home = () => {

    const history = useHistory();
    const { isLogged, setIsLogged } = React.useContext(AuthContext);

    React.useEffect(()=>{
        setIsLogged();
    })
    React.useEffect(()=>{
        if(!isLogged) return history.push("/login")
    },[])

    return (
        <>
            <NavBar/>
        </>
    )
}

export default Home;
