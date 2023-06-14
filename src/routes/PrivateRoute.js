import React, { useContext, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '~/AuthContext';

const PrivateRoute = ({ children }) => {
    const { isLoggedIn } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 0);
    }, []);

    if (isLoading) {
        // Hiển thị trạng thái tải nếu quá trình kiểm tra đang diễn ra
        return <div>Loading...</div>;
    }

    return isLoggedIn ? children : <Navigate to="/login" replace state={{ from: window.location.pathname }} />;
};

export default PrivateRoute;
