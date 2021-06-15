import React from 'react';
import LoginForm from '../../components/loginForm';
import './style.css'

const Login = () => {
    return (
        <>
            <section className="loginPage">
                <div className="loginPage__container">
                    <LoginForm />
                </div>
            </section>
        </>
    )
}

export default Login;