import React from "react"
import ENVIROMENT from "../utils/constants/enviroment"
import  getAuthenticatedHeaders  from "../fetching/customHeaders"
import { useFetch } from "../hooks/useFetch"
import { Link } from "react-router-dom"

const HomeScreen = () => {

    const { 
        data: workspace_response,
        error: workspace_response_error,
        loading: workspace_loading

    } = useFetch(ENVIROMENT.API_URL + "/api/workspace",{
        method: "GET",
            headers: getAuthenticatedHeaders()
    })
    console.log(workspace_response)


    return (
        <div>
            <h1>BIENVENIDO A TU APP</h1>
            <div>
                <h2>TUS ESPACIOS DE TRABAJO</h2>
                <div>
                    {
                        workspace_loading
                        ? <h2>Cargando</h2>
                        : (
                            workspace_response.data.workspace.length ?
                            workspace_response.data.workspace.map(workspace => {
                                return (
                                    <div key={workspace._id}>
                                        <h3>{workspace_loading.name}</h3>
                                        <Link to={`/workspace/${workspace._id}`}>IR AL ESPACIO DE TRABAJO</Link>
                                    </div>
                                )
                            })
                            : <h3>Aun no creaste un espacio de Trabajo!</h3>
                        )               
                    }
                </div>
            </div>
            <div>
                <span>Aun no tienes espacios de Trabajo?</span>
                <Link to="/workspace/new">Crear un Espacio de Trabajo</Link>
            </div>
        </div>
    )
}

export default HomeScreen