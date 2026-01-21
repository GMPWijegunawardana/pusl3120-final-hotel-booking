import { Outlet } from 'react-router-dom';
import AdminMenuBar from '../components/AdminMenuBar';

const DashboardLayout = () => {
    return(
        <div className="w-full h-screen flex flex-row justify-between items-start gap-0 p-0">
            <div className="h-full w-[250px] bg-[#422f2f]">
                <AdminMenuBar/>
            </div>
            <div className="h-full grow">
                <Outlet />
            </div>
        </div>
    )
};

export default DashboardLayout;