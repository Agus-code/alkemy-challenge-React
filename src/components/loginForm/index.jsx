import axios from "axios";
import React from "react";
import { useHistory } from "react-router";
import './style.css'

import AuthContext from "../../provider/AuthProvider";

const LoginForm = () => {

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [seePassword, setSeePassword] = React.useState(false)
    const [errorMsg, setErrorMsg] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const history = useHistory();

    const { isLogged, setIsLogged } = React.useContext(AuthContext);

    const handleLogIn = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg("")

        if (email.length === 0 || password.length === 0) {
            setLoading(false);
            return setErrorMsg("Complete all fields")
        }

        const chars = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!chars.test(email)) {
            setLoading(false);
            return setErrorMsg("invalid email")
        }

        const data = {
            email,
            password
        }

        await axios.post("http://challenge-react.alkemy.org/", data,{
            "Access-Control-Allow-Origin": "http://localhost:3000"
        })
            .then(res => localStorage.setItem("token", res.data.token))
            .then(() => {
                setLoading(false);
                setEmail("");
                setPassword("");
                history.push("/")
            })
            .catch(() => {
                setErrorMsg("Please provide valid email and password");
                setLoading(false)
            }
            )
    }

    React.useEffect(()=>{
        setIsLogged()
    })

    React.useEffect(()=>{
        if (isLogged) return history.push("/")
    },[isLogged])

    return (
        <>
            <article className="loginForm">
                <div className="loginForm__container">
                    <header className="loginForm__header">
                        <h2 className="loginForm__header-h2">
                            Log In
                        </h2>
                    </header>
                    {errorMsg !== "" &&
                        <div className="loginForm__errorMsg">
                            <p className="loginForm__errorMsg-p">{errorMsg}</p>
                        </div>
                    }
                    <section className="loginForm__section">
                        <form className="loginForm__form" onSubmit={handleLogIn}>
                            <div className="loginForm__form-item">
                                <input
                                    type="text"
                                    placeholder="Email"
                                    className="loginForm__form-item-input"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="loginForm__form-item">
                                <input
                                    type={seePassword ? "text" : "password"}
                                    placeholder="Password"
                                    className="loginForm__form-item-input"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                                {seePassword
                                    ? <i className="loginForm__form-item-input-icon fas fa-eye-slash" onClick={() => setSeePassword(false)}></i>
                                    : <i className="loginForm__form-item-input-icon fas fa-eye" onClick={() => setSeePassword(true)}></i>
                                }
                            </div>
                            <div className="loginForm__form-item">
                                <button className="loginForm__form-item-btn">
                                    Log In
                                </button>
                            </div>
                        </form>
                        {loading &&
                            <div className="loginForm__loading">
                                <div className="loginForm__loading-circle">
                                </div>
                            </div>
                        }
                    </section>
                </div>
            </article>
        </>
    )
}

export default LoginForm;