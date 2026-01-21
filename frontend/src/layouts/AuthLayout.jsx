import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';

const AuthLayout = () => {
    return (
        <div className="w-full h-screen flex flex-col justify-between items-start gap-0 p-0">
            <NavBar/>
            <Outlet />
        </div>
    )
};

export default AuthLayout;