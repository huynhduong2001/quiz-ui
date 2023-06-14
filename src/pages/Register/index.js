import React, { useState } from 'react';
import { toast } from 'react-toastify';
import styles from './Register.module.scss';
import classNames from 'classnames/bind';
import logo from '~/assets/images/logo.jpg';
const cx = classNames.bind(styles);

const Register = () => {
    const [username, setUsername] = useState('');
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();

        // Kiểm tra các trường dữ liệu có được nhập đầy đủ hay không
        if (!username || !firstName || !lastName || !password || !password2 || !email) {
            toast.error('Không được bỏ trống!');
            return;
        }
        if (password !== password2) {
            toast.error('Vui lòng nhập lại đúng mật khẩu!');

            return;
        }
        const register = {
            firstname: firstName,
            lastname: lastName,
            email: email,
            username: username,
            password: password,
        };
        // Thực hiện logic đăng ký tại đây
        fetch('https://quiz-app-nodejs.onrender.com/v1/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(register),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    toast.success('Đăng kí thành công!');
                    setUsername('');
                    setLastName('');
                    setFirstName('');
                    setPassword('');
                    setPassword2('');
                    setEmail('');
                    setError('');
                } else toast.error(data.message);
                // Xử lý dữ liệu trả về từ API (nếu có)

                console.log(data);
            })
            .catch((error) => {
                // Xử lý lỗi trong quá trình gửi yêu cầu
                console.log(error);
            });
        // Reset các trường dữ liệu sau khi đăng ký thành công
    };

    return (
        <div className={cx('register-form-container')}>
            <div className={cx('register-form')}>
                <div className={cx('logo')}>
                    <img src={logo} alt="Logo" />
                </div>
                <h1>Đăng Ký</h1>
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
                        <label htmlFor="username">Họ</label>
                        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="username">Tên</label>
                        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="password">Mật khẩu</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="password">Nhập lại mật khẩu</label>
                        <input type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} />
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
