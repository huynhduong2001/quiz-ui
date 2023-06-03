import React, { useState } from 'react';
import styles from './ForgotPassWord.module.scss';
import classNames from 'classnames/bind';
import logo from '~/assets/images/logo.jpg';

const cx = classNames.bind(styles);

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Xử lý logic để gửi yêu cầu lấy lại mật khẩu qua email

        // Sau khi gửi yêu cầu thành công, hiển thị thông báo thành công
        setMessage('Yêu cầu lấy lại mật khẩu đã được gửi đến email của bạn.');
        setEmail('');
    };

    return (
        <div className={cx('forgot-password')}>
            <div className={cx('forgot-password-container')}>
                <div className={cx('logo')}>
                    <img src={logo} alt="Logo" />
                </div>
                <h2>Quên mật khẩu</h2>
                <form onSubmit={handleSubmit}>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <button type="submit">Gửi yêu cầu</button>
                </form>
                {message && <p>{message}</p>}
                <a href="/login" className={cx('undo-login')}>
                    Quay lại đăng nhập
                </a>
            </div>
        </div>
    );
};

export default ForgotPassword;
