import React, { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '~/AuthContext';
import styles from './Login.module.scss';
import classNames from 'classnames/bind';
import logo from '~/assets/images/logo.jpg';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);
const Login = () => {
    const navigate = useNavigate();
    const { setIsLoggedIn, setAccessToken, setRefreshToken } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username.trim() === '') {
            toast.error('Vui lòng nhập tên đăng nhập');
            return;
        }

        if (password === '') {
            toast.error('Vui lòng nhập mật khẩu');
            return;
        }

        try {
            await fetch('https://quiz-app-nodejs.onrender.com/v1/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    if (data.success) {
                        setIsLoggedIn(true);
                        setAccessToken(data.accessToken);
                        setRefreshToken(data.refreshToken);
                        localStorage.setItem('isLoggedIn', 'true');
                        localStorage.setItem('accessToken', data.accessToken);
                        localStorage.setItem('refreshToken', data.refreshToken);
                        navigate('/');
                    } else toast.error(data.message);
                })
                .catch((error) => {
                    // Xử lý lỗi trong quá trình gửi yêu cầu
                    toast.error(error);
                });
        } catch (error) {
            console.log('Lỗi:', error);
            toast.error('Đã xảy ra lỗi trong quá trình đăng nhập');
        }
    };

    return (
        <div className={cx('login-container')}>
            <div className={cx('login-form-container')}>
                <div className={cx('logo')}>
                    <img src={logo} alt="Logo" />
                </div>
                <h2>Đăng nhập</h2>
                <form onSubmit={handleSubmit}>
                    <div className={cx('form-group')}>
                        <label htmlFor="username">Tên đăng nhập:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className={cx('form-group')}>
                        <label htmlFor="password">Mật khẩu:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className={cx('btn-submit')}>
                        Đăng nhập
                    </button>
                    <a href="/register" className={cx('btn-submit', 'btn-register')}>
                        Đăng kí
                    </a>
                    <a href="/forgotpw" className={cx('forgot-pw')}>
                        Quên mật khẩu?
                    </a>
                </form>
            </div>
        </div>
    );
};

export default Login;
