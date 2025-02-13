import React, { useContext, useState } from 'react'
import useForm from '../hooks/useForm'
import ENVIROMENT from  "../utils/constants/enviroment"
import { Link,useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'


const LoginScreen = () => {

    const {login, isAuthenticatedState} = useContext(AuthContext)
    console.log("Authenticated: ", isAuthenticatedState)
    const navigate = useNavigate()

    const { form_state, handleChangeInput } = useForm({ email: '', password: '' })
    const url = new URLSearchParams(window.location.search)
    url.get("verified")
    if(url.get("verified")){
        alert("Cuenta Verificada")
    }
    const handleSubmitForm = async (event) => {

        try {
            event.preventDefault()
            const response = await fetch(ENVIROMENT.API_URL + '/api/auth/login', {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(form_state)
            })

            const data = await response.json()
            console.log(data)
            login(data.data.access_token)
            navigate("/home")
        }
        catch (error) {
            console.error("Error al loguear", error)
        }

    }
    const errores = {
        email: [],
        password: []
    }

    form_state.email && form_state.email.length > 30 && errores.email.push("El limite de caracteres es 30")
    form_state.email && form_state.email.length < 5 && errores.email.push("El minimo de caracteres es 5")
    form_state.password && form_state.password.length < 5 && errores.password.push("El minimo de caracteres es 5")



    return (
        <main className='auth-screen'>
            <h1 className='title'>Login</h1>
            <form onSubmit={handleSubmitForm} className='auth-form'>
                <div className='input-container'>
                    <label htmlFor='email'>Ingresa tu email:</label>
                    <input
                        name='email'
                        id='email'
                        placeholder='joedoe@email.com'
                        value={form_state.email}
                        onChange={handleChangeInput}
                    />
                    {
                        errores.email.map((error, index) => <p key={index} style={{ color: 'red' }}>{error}</p>)
                    }
                </div>
                <div className='input-container'>
                    <label htmlFor='password'>Ingresa tu contraseña:</label>
                    <input
                        name='password'
                        id='password'
                        value={form_state.password}
                        onChange={handleChangeInput}
                    />
                    {
                        errores.password.map((error, index) => <p style={{ color: 'red' }} key={index}>{error}</p>)
                    }
                </div>
                <button className="button-send" type='submit' disabled={
                    errores.email.length ||
                    errores.password.length ||
                    !form_state.email ||
                    !form_state.password
                }>
                    Iniciar sesion
                </button>
                <span>No tienes una Cuenta? <Link to={"/register"}>Registrate Aquí</Link></span><br />
                <Link to={"/forgot-password"}>Olvide mi Contraseña</Link>
                
            </form>
        </main>
    )
}

export default LoginScreen