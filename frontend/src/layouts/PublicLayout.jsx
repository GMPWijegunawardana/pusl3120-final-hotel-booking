import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const PublicLayout = () => {
    return (
        <div className="w-full h-auto flex flex-col justify-between items-start gap-0 p-0">
            <NavBar/>
            <Outlet />
            <Footer/>
        </div>
    )
};

export default PublicLayout;