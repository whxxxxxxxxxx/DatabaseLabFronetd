import { getToken } from "@/utils";
import {Navigate} from 'react-router-dom'

export function AuthRoute({ children }) {
    const token = getToken();
    return token ? <>{children}</> : <Navigate to={'/login'} replace />;
}
