import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [accessToken, setAccessToken] = useState();
    const [refreshToken, setRefreshToken] = useState();

    useEffect(() => {
        const checkLoggedInStatus = async () => {
            try {
                const storedLoggedInStatus = await localStorage.getItem('isLoggedIn');
                const storedAccessToken = await localStorage.getItem('accessToken');
                const storedRefreshToken = await localStorage.getItem('refreshToken');

                if (storedLoggedInStatus && storedLoggedInStatus === 'true') {
                    setIsLoggedIn(true);
                }
                if (storedAccessToken) {
                    setAccessToken(storedAccessToken);
                }
                if (storedRefreshToken) {
                    setRefreshToken(storedRefreshToken);
                }
            } catch (error) {
                console.log('Error retrieving data from localStorage:', error);
            }
        };

        checkLoggedInStatus();
    }, []);

    useEffect(() => {
        const refreshTokenAsync = async () => {
            try {
                console.log('Refreshing', refreshToken, 'accessToken', accessToken);
                setTimeout(async () => {
                    const response = await fetch('https://quiz-app-nodejs.onrender.com/v1/refresh', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            x_authorization: accessToken,
                        },
                        body: JSON.stringify({ refreshToken: refreshToken }),
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setAccessToken(data.accessToken);
                        localStorage.setItem('accessToken', data.accessToken);
                        localStorage.setItem('refreshToken', refreshToken);
                    } else {
                        console.log('Refresh request failed');
                    }
                }, 300000);
            } catch (error) {
                console.log('Timeout error:', error);
            }
        };

        refreshTokenAsync();
    }, [accessToken, refreshToken]);

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                accessToken,
                setAccessToken,
                refreshToken,
                setRefreshToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
