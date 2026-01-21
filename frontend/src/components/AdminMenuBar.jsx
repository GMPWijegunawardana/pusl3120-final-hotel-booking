import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaCalendarCheck, FaDoorOpen, FaUsers, FaTachometerAlt, FaMoneyBillWave, FaStar, FaBell, FaEnvelope, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { logoutUser, getCurrentUser } from '../services/authService';

const AdminMenuBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = getCurrentUser();

    const isActive = (path) => {
      return location.pathname === path || (path === '/dashboard/bookings' && location.pathname === '/dashboard');
    };

    const handleLogout = () => {
      logoutUser();
      navigate('/auth/login');
    };

  return (
    <div className='w-full h-full flex flex-col justify-between items-start p-4'>
        <div className='w-full flex flex-col gap-6'>
          <div className='flex items-center gap-3'>
            <FaTachometerAlt className='text-white text-[24px]' />
            <h1 className='text-white font-semibold text-[20px]'>Dashboard</h1>
          </div>
          <div className='w-full h-auto flex flex-col justify-center items-start gap-2'>
              <p 
                className={`w-full text-white font-medium text-[16px] px-4 py-2 hover:bg-[#544444] rounded-[8px] hover:cursor-pointer flex items-center gap-3 ${isActive('/dashboard/bookings') ? 'bg-[#544444]' : ''}`}
                onClick={() => navigate("/dashboard/bookings")}
              >
                <FaCalendarCheck className='text-[18px]' />
                Bookings
              </p>
              <p 
                className={`w-full text-white font-medium text-[16px] px-4 py-2 hover:bg-[#544444] rounded-[8px] hover:cursor-pointer flex items-center gap-3 ${isActive('/dashboard/rooms') ? 'bg-[#544444]' : ''}`}
                onClick={() => navigate("/dashboard/rooms")}
              >
                <FaDoorOpen className='text-[18px]' />
                Rooms
              </p>
              <p 
                className={`w-full text-white font-medium text-[16px] px-4 py-2 hover:bg-[#544444] rounded-[8px] hover:cursor-pointer flex items-center gap-3 ${isActive('/dashboard/users') ? 'bg-[#544444]' : ''}`}
                onClick={() => navigate("/dashboard/users")}
              >
                <FaUsers className='text-[18px]' />
                Users
              </p>
              <p 
                className={`w-full text-white font-medium text-[16px] px-4 py-2 hover:bg-[#544444] rounded-[8px] hover:cursor-pointer flex items-center gap-3 ${isActive('/dashboard/payments') ? 'bg-[#544444]' : ''}`}
                onClick={() => navigate("/dashboard/payments")}
              >
                <FaMoneyBillWave className='text-[18px]' />
                Payments
              </p>
              <p 
                className={`w-full text-white font-medium text-[16px] px-4 py-2 hover:bg-[#544444] rounded-[8px] hover:cursor-pointer flex items-center gap-3 ${isActive('/dashboard/reviews') ? 'bg-[#544444]' : ''}`}
                onClick={() => navigate("/dashboard/reviews")}
              >
                <FaStar className='text-[18px]' />
                Reviews
              </p>
              <p 
                className={`w-full text-white font-medium text-[16px] px-4 py-2 hover:bg-[#544444] rounded-[8px] hover:cursor-pointer flex items-center gap-3 ${isActive('/dashboard/notifications') ? 'bg-[#544444]' : ''}`}
                onClick={() => navigate("/dashboard/notifications")}
              >
                <FaBell className='text-[18px]' />
                Notifications
              </p>
              <p 
                className={`w-full text-white font-medium text-[16px] px-4 py-2 hover:bg-[#544444] rounded-[8px] hover:cursor-pointer flex items-center gap-3 ${isActive('/dashboard/contacts') ? 'bg-[#544444]' : ''}`}
                onClick={() => navigate("/dashboard/contacts")}
              >
                <FaEnvelope className='text-[18px]' />
                Contacts
              </p>
          </div>
        </div>

        {/* User Info and Logout at Bottom */}
        <div className='w-full flex flex-col gap-3 border-t border-[#544444] pt-4'>
          {/* User Info */}
          <div className='w-full flex items-center gap-3 px-2'>
            <FaUserCircle className='text-white text-[32px]' />
            <div className='flex flex-col'>
              <span className='text-white font-semibold text-[14px]'>{user?.name || 'Admin'}</span>
              <span className='text-gray-400 text-[12px] truncate'>{user?.email || 'admin@example.com'}</span>
            </div>
          </div>
          
          {/* Logout Button */}
          <button 
            className='w-full text-white font-medium text-[16px] px-4 py-2  hover:bg-red-500 rounded-[8px] cursor-pointer flex items-center justify-center gap-3 transition'
            onClick={handleLogout}
          >
            <FaSignOutAlt className='text-[18px]' />
            Logout
          </button>
        </div>
    </div>
  )
}

export default AdminMenuBar
