import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {

    const tokenExists = () => {
        const token = localStorage.getItem("token");
        return token !== '';
        
    }

		// Aquí va la condición. Puede ser una condición de cualquier tipo. Lo que 
		// Importa es que valide si el usuario está loggeado o no
    if(tokenExists()){
        return <Outlet />
    } else { 
        return <Navigate to='/login' />
    }                     // Aquí le debemos decir la ruta a la que queremos llevar
};                        // al usuario si no está autenticado

export default ProtectedRoutes;