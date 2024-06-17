
import { useSelector } from 'react-redux';
import { Outlet,useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const User = () => {
    return (
        <div className='flex justify-center items-center h-screen '>
            <Outlet />
        </div>
    );
}

export default User;