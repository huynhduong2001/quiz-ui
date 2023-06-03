import React, { useState } from 'react';
import styles from './Login.module.scss';
import classNames from 'classnames/bind';
import logo from '~/assets/images/logo.jpg';
const cx = classNames.bind(styles);

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username.trim() === '') {
            setError('Vui lòng nhập tên đăng nhập');
            return;
        }

        if (password === '') {
            setError('Vui lòng nhập mật khẩu');
            return;
        }

        // Xử lý logic đăng nhập ở đây
        console.log('Username:', username);
        console.log('Password:', password);

        setUsername('');
        setPassword('');
        setError('');
    };

    return (
        <div className={cx('login-container')}>
            <div className={cx('login-form-container')}>
                <div className={cx('logo')}>
                    <img src={logo} alt="Logo" />
                </div>
                <h2>Đăng nhập</h2>
                {error && <p className={cx('error-message')}>{error}</p>}
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
