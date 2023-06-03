import React, { useState } from 'react';
import styles from './Register.module.scss';
import classNames from 'classnames/bind';
import logo from '~/assets/images/logo.jpg';
const cx = classNames.bind(styles);

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();

        // Kiểm tra các trường dữ liệu có được nhập đầy đủ hay không
        if (!username || !password || !email) {
            setError('Vui lòng nhập đầy đủ thông tin!');
            return;
        }
        if (password != password2) {
            setError('Vui lòng nhập lại đúng mật khẩu!');
            return;
        }
        // Thực hiện logic đăng ký tại đây

        // Reset các trường dữ liệu sau khi đăng ký thành công
        setUsername('');
        setPassword('');
        setEmail('');
        setError('');
    };

    return (
        <div className={cx('register-form-container')}>
            <div className={cx('register-form')}>
                <div className={cx('logo')}>
                    <img src={logo} alt="Logo" />
                </div>
                <h1>Form Đăng Ký</h1>
                {error && <p className={cx('error-message')}>{error}</p>}
                <form onSubmit={handleRegister}>
                    <div>
                        <label htmlFor="username">Tên đăng nhập</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Mật khẩu</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Nhập lại mật khẩu</label>
                        <input
                            type="password"
                            id="password"
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <button type="submit">Đăng Ký</button>
                    <a href="/login" className={cx('undo-login')}>
                        Quay lại đăng nhập
                    </a>
                </form>
            </div>
        </div>
    );
};

export default Register;
