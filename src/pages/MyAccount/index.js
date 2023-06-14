import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '~/AuthContext';
import { toast } from 'react-toastify';

import styles from './MyAccount.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faLock, faUserPlus } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function MyAccount() {
    // const [user, setUser] = useState();
    const { accessToken } = useContext(AuthContext);
    const [avatar, setAvatar] = useState();
    const [urlFile, setUrlFile] = useState(null);
    const [lastName, setLastName] = useState();
    const [firstName, setFirstName] = useState();
    const [password, setPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [newPassword2, setNewPassword2] = useState();

    useEffect(() => {
        fetch('https://quiz-app-nodejs.onrender.com/v1/user/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                x_authorization: accessToken,
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                const user = data.user;
                console.log(user);
                setFirstName(user.firstname);
                setLastName(user.lastname);
                setUrlFile(user.image);
                // setAvatar(handleObjectUrl(user.image.data));
                // setUrlFile(handleUrlImg(user.image.data));
            })
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        //cleans up
        return () => {
            avatar && URL.revokeObjectURL(avatar);
        };
    }, [avatar]);
    const handlePreviewAvatar = (e) => {
        // console.log(avatar);
        const file = e.target.files[0];
        setAvatar(file);
        // setUrlFile(URL.createObjectURL(file));
        const reader = new FileReader();

        reader.onloadend = () => {
            const base64String = reader.result;
            // Xử lý chuỗi base64String ở đây (gửi lên API, hiển thị lên giao diện, v.v.)

            // cắt data:image/jpeg;base64,
            setUrlFile(base64String.substring(23));
            console.log(base64String);
        };

        reader.readAsDataURL(file);
    };
    function base64ToBlob(base64String) {
        const byteCharacters = atob(base64String);
        const byteArrays = [];
        const sliceSize = 1024;

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        const blob = new Blob(byteArrays, { type: 'image/png' });
        return new File([blob], 'avt.png', { type: 'image/png' });
    }
    const handleSaveInfo = async () => {
        if (!lastName) {
            toast.error('Không bỏ trống họ!');
            return;
        }
        if (!firstName) {
            toast.error('Không bỏ trống tên!');
            return;
        }
        console.log(!avatar || base64ToBlob(urlFile));
        if (!avatar) setAvatar(base64ToBlob(urlFile));
        const formData = new FormData();
        formData.set('image', !avatar || base64ToBlob(urlFile));
        formData.set('firstname', firstName);
        formData.set('lastname', lastName);
        const response = await fetch('https://quiz-app-nodejs.onrender.com/v1/user/update', {
            method: 'PATCH',
            headers: {
                // 'Content-Type': 'multipart/form-data;',
                x_authorization: accessToken,
            },
            body: formData,
        });
        if (response.ok) {
            const data = await response.json();
            if (data.success) {
                toast.success('Lưu thành công!');
            } else toast.error('Lưu thất bại');
        } else {
            console.log(response.json());
        }
    };
    const handleUpdatePW = async () => {
        if (!password) {
            toast.error('Không bỏ trống mật khẩu cũ!');
            return;
        }
        if (!newPassword) {
            toast.error('Không bỏ trống mật khẩu mới!');
            return;
        }
        if (!newPassword2) {
            toast.error('Không bỏ trống nhập lại mật khẩu mới!');
            return;
        }
        if (newPassword2 !== newPassword) {
            toast.error('Vui lòng nhập lại mật khẩu trùng mật khẩu mới');
            return;
        }
        const changePW = {
            old_password: password,
            new_password: newPassword,
        };
        const response = await fetch('https://quiz-app-nodejs.onrender.com/v1/user/', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                x_authorization: accessToken,
            },
            body: JSON.stringify(changePW),
        });
        if (response.ok) {
            const data = await response.json();
            if (data && data.success) {
                toast.success('Lưu thành công!');
                setNewPassword('');
                setNewPassword2('');
                setPassword('');
            } else if (!data.success) toast.error('Lưu thất bại!');
        } else {
            toast.error('Sai mật khẩu!');
        }
    };
    return (
        <div className="flex flex-grow overflow-auto bg-light-1">
            <div className={cx('flex flex-col p-12 mx-auto rounded', 'settings-container', 'mt-18 mb-22 bg-light-3')}>
                <div className="flex mt-6 text-2xl font-bold justify-left text-dark-3">
                    <span>Cài đặt</span>
                </div>
                <div className="flex pb-3 mt-8 mb-6 text-base font-semibold border-b h-9 border-dark-6">
                    <FontAwesomeIcon
                        icon={faUserPlus}
                        className="flex items-center mr-2 fs-16 inline-flex"
                        width="16px"
                    />
                    <span>Ảnh đại diện</span>
                </div>
                <div>
                    <label htmlFor="upload-button" className={cx('upload-button-label')}>
                        <input
                            type="file"
                            accept="image/*"
                            id="upload-button"
                            className={cx('file-input')}
                            onChange={(e) => handlePreviewAvatar(e)}
                        />
                        <span className={cx('upload-button-text')}>Chọn file</span>
                    </label>

                    {/* {urlFIle && <img src={urlFIle} alt="" width="50%" className="flex mg-auto" />} */}
                    <img src={`data:image/jpeg;base64,${urlFile}`} alt="Image" width="50%" className="flex mg-auto" />
                </div>
                <div className="flex pb-3 mt-8 mb-6 text-base font-semibold border-b h-9 border-dark-6">
                    <FontAwesomeIcon
                        icon={faCircleUser}
                        className="flex items-center mr-2 fs-16 inline-flex"
                        width="16px"
                    />
                    <span>Họ và tên</span>
                </div>
                <div className={cx('email')}>
                    <div className={cx('mb-1 text-xs font-semibold text-dark-3')}>
                        <span>Họ</span>
                    </div>
                    <div className={cx('relative w-full')} aria-label="E-mail">
                        <div className="relative">
                            <input
                                id="email-input"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                aria-describedby="input-error-message"
                                aria-invalid="false"
                                aria-required="false"
                                type="text"
                                name=""
                                className="focus:outline-none h-10 w-full py-2 text-sm placeholder-sm font-semibold remove-number-selector pl-3 border border-solid border-dark-6 rounded focus:ring-2 focus:ring-lilac focus:ring-offset-0 bg-light-3 text-dark-2 placeholder-dark-5 pr-3"
                                placeholder="Nhập họ"
                            />
                        </div>
                    </div>
                </div>
                <div className={cx('username')}>
                    <div className={cx('mt-6 mb-1 text-xs font-semibold text-dark-3')}>
                        <span>Tên</span>
                    </div>
                    <div className={cx('relative w-full')} aria-label="Tên tài khoản">
                        <div className="relative">
                            <input
                                id="username-input"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                aria-describedby="input-error-message"
                                aria-invalid="false"
                                aria-required="false"
                                type="text"
                                name=""
                                className="focus:outline-none h-10 w-full py-2 text-sm placeholder-sm font-semibold remove-number-selector pl-3 border border-solid border-dark-6 rounded focus:ring-2 focus:ring-lilac focus:ring-offset-0 bg-light-3 text-dark-2  border-dark-4 placeholder-dark-5 pr-3 pr-2"
                                placeholder="Nhập tên"
                                lang=""
                            />
                        </div>
                    </div>
                </div>
                <button
                    className="flex none-border items-center justify-center px-7.5 py-2.5 text-lg font-semibold q-shadow mb-1 h-10 base bg-lilac text-light-3 hover:bg-lilac-light active:bg-lilac-dark rounded-lg primary transition-colors duration-200 ease-in-out flex relative min-w-max w-full mt-6 w-full mt-6"
                    aria-label="Lưu thay đổi"
                    type="button"
                    translate="no"
                    onClick={() => handleSaveInfo()}
                >
                    <span className="fs-16 white-color">Lưu thay đổi</span>
                </button>
                <div className="flex pb-3 mt-8 mb-6 text-base font-semibold border-b h-9 border-dark-6">
                    <FontAwesomeIcon icon={faLock} className="flex items-center mr-2 fs-16 inline-flex" width="16px" />
                    <span> Mật khẩu</span>
                </div>
                <form className={cx('password-form')}>
                    <div className="mb-1 text-xs font-semibold text-dark-3">
                        <span>Mật khẩu cũ</span>
                    </div>
                    <div className="relative w-full" aria-label="Mật khẩu mới">
                        <div className="relative">
                            <input
                                id="old-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                aria-describedby="input-error-message"
                                aria-invalid="false"
                                aria-required="false"
                                type="password"
                                name=""
                                className="focus:outline-none h-10 w-full py-2 text-sm placeholder-sm remove-number-selector pl-3 border border-solid border-dark-6 rounded focus:ring-2 focus:ring-lilac focus:ring-offset-0 bg-light-3 text-dark-2  border-dark-4 placeholder-dark-5 pr-3 pr-2"
                                placeholder=""
                                lang=""
                            />
                        </div>
                    </div>
                    <div className="mb-1 text-xs font-semibold text-dark-3">
                        <span>Mật khẩu mới (Ít nhất 6 ký tự)</span>
                    </div>
                    <div className="relative w-full" aria-label="Mật khẩu mới">
                        <div className="relative">
                            <input
                                id="new-password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                aria-describedby="input-error-message"
                                aria-invalid="false"
                                aria-required="false"
                                type="password"
                                name=""
                                className="focus:outline-none h-10 w-full py-2 text-sm placeholder-sm remove-number-selector pl-3 border border-solid border-dark-6 rounded focus:ring-2 focus:ring-lilac focus:ring-offset-0 bg-light-3 text-dark-2  border-dark-4 placeholder-dark-5 pr-3 pr-2"
                                placeholder=""
                                lang=""
                            />
                        </div>
                    </div>

                    <div className="mt-6 mb-1 text-xs font-semibold text-dark-3">
                        <span>Mật khẩu mới một lần nữa</span>
                    </div>
                    <div className="relative w-full" aria-label="Mật khẩu mới lặp lại">
                        <div className="relative">
                            <input
                                id="repeat-password"
                                value={newPassword2}
                                onChange={(e) => setNewPassword2(e.target.value)}
                                aria-describedby="input-error-message"
                                aria-invalid="false"
                                aria-required="false"
                                type="password"
                                name=""
                                className="focus:outline-none h-10 w-full py-2 text-sm placeholder-sm remove-number-selector pl-3 border border-solid border-dark-6 rounded focus:ring-2 focus:ring-lilac focus:ring-offset-0 bg-light-3 text-dark-2  border-dark-4 placeholder-dark-5 pr-3 pr-2"
                                placeholder=""
                                lang=""
                            />
                        </div>
                    </div>

                    <button
                        className="flex none-border items-center justify-center px-7.5 py-2.5 text-lg font-semibold q-shadow mb-1 h-10 base bg-lilac text-light-3 hover:bg-lilac-light active:bg-lilac-dark rounded-lg primary transition-colors duration-200 ease-in-out flex relative min-w-max w-full mt-6 w-full mt-6"
                        aria-label="Cập nhật mật khẩu"
                        type="button"
                        translate="no"
                        onClick={() => handleUpdatePW()}
                    >
                        <span className="fs-16 white-color">Cập nhật mật khẩu</span>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default MyAccount;
