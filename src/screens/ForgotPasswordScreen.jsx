import React from 'react'
import ENVIROMENT from '../utils/constants/enviroment'
import useForm from '../hooks/useForm'
import { data } from 'react-router-dom'

const ForgotPasswordScreen = () => {
    const { form_state, handleChangeInput } = useForm({ email: "" })
    const handleSubmitForgotPassword = async (e) => {
        try {
            e.preventDefault()
            const response = await fetch(ENVIROMENT.API_URL + "/api/auth/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form_state)
            })
            const data = await response.json()
            if(data.ok){
                alert("Se envio el mail de verificacion")
            }
        }
        catch (error) {
            console.error(error)
        }

    }


    return (
        <div>
            <h1>Olvide mi Contraseña</h1>
            <p>Vamos a enviarte un correo electronico con los pasos a seguir para restablecer tu contraseña </p>
            <form onSubmit={handleSubmitForgotPassword}>
                <label htmlFor="email">Ingresa el Email</label>
                <input type="text" placeholder='joedoe@gmail.com' name='email' id='email' onChange={handleChangeInput}/>
                <button>Enviar Correo</button>
            </form>

        </div>
    )
}

export default ForgotPasswordScreen