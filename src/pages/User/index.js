
import { Outlet,useNavigate } from 'react-router-dom';

const User = () => {
    return (
        <div className='flex justify-center items-center h-screen '>
            <Outlet />
        </div>
    );
}

export default User;