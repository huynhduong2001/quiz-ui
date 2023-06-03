import styles from './MyAccount.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faLock } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function MyAccount() {
    return (
        <div class="flex flex-grow overflow-auto bg-light-1">
            <div className={cx('flex flex-col p-12 mx-auto rounded', 'settings-container', 'mt-18 mb-22 bg-light-3')}>
                <div class="flex mt-6 text-2xl font-bold justify-left text-dark-3">
                    <span>Cài đặt</span>
                </div>
                <div class="flex pb-3 mt-8 mb-6 text-base font-semibold border-b h-9 border-dark-6">
                    <FontAwesomeIcon
                        icon={faCircleUser}
                        class="flex items-center mr-2 fs-16 inline-flex"
                        width="16px"
                    />
                    <span> Tài khoản</span>
                </div>
                <div className={cx('email')}>
                    <div className={cx('mb-1 text-xs font-semibold text-dark-3')}>
                        <span>E-mail</span>
                    </div>
                    <div className={cx('relative w-full')} aria-label="E-mail">
                        <div class="relative">
                            <input
                                id="email-input"
                                aria-describedby="input-error-message"
                                aria-invalid="false"
                                aria-required="false"
                                type="text"
                                name=""
                                class="focus:outline-none h-10 w-full py-2 text-sm placeholder-sm font-semibold remove-number-selector pl-3 border border-solid border-dark-6 rounded focus:ring-2 focus:ring-lilac focus:ring-offset-0 bg-light-3 text-dark-2 placeholder-dark-5 pr-3"
                                placeholder="johndoe@company.com"
                                autocomplete="off"
                                maxlength="-1"
                                tabindex="0"
                            />
                        </div>
                    </div>
                </div>
                <div className={cx('username')}>
                    <div className={cx('mt-6 mb-1 text-xs font-semibold text-dark-3')}>
                        <span>Tên tài khoản</span>
                    </div>
                    <div className={cx('relative w-full')} class="" aria-label="Tên tài khoản">
                        <div class="relative">
                            <input
                                id="username-input"
                                aria-describedby="input-error-message"
                                aria-invalid="false"
                                aria-required="false"
                                type="text"
                                name=""
                                class="focus:outline-none h-10 w-full py-2 text-sm placeholder-sm font-semibold remove-number-selector pl-3 border border-solid border-dark-6 rounded focus:ring-2 focus:ring-lilac focus:ring-offset-0 bg-light-3 text-dark-2  border-dark-4 placeholder-dark-5 pr-3 pr-2"
                                placeholder="johndoe42"
                                autocomplete="off"
                                lang=""
                                maxlength="-1"
                                tabindex="0"
                            />
                        </div>
                    </div>
                </div>
                <button
                    class="flex none-border items-center justify-center px-7.5 py-2.5 text-lg font-semibold q-shadow mb-1 h-10 base bg-lilac text-light-3 hover:bg-lilac-light active:bg-lilac-dark rounded-lg primary transition-colors duration-200 ease-in-out flex relative min-w-max w-full mt-6 w-full mt-6"
                    aria-label="Lưu thay đổi"
                    type="button"
                    translate="no"
                >
                    <span class="fs-16 white-color">Lưu thay đổi</span>
                </button>
                <div class="flex pb-3 mt-8 mb-6 text-base font-semibold border-b h-9 border-dark-6">
                    <FontAwesomeIcon icon={faLock} class="flex items-center mr-2 fs-16 inline-flex" width="16px" />
                    <span> Mật khẩu</span>
                </div>
                <form className={cx('password-form')}>
                    <div class="mb-1 text-xs font-semibold text-dark-3">
                        <span>Mật khẩu mới (Ít nhất 6 ký tự)</span>
                    </div>
                    <div class="relative w-full" aria-label="Mật khẩu mới">
                        <div class="relative">
                            <input
                                id="new-password"
                                aria-describedby="input-error-message"
                                aria-invalid="false"
                                aria-required="false"
                                type="password"
                                name=""
                                class="focus:outline-none h-10 w-full py-2 text-sm placeholder-sm remove-number-selector pl-3 border border-solid border-dark-6 rounded focus:ring-2 focus:ring-lilac focus:ring-offset-0 bg-light-3 text-dark-2  border-dark-4 placeholder-dark-5 pr-3 pr-2"
                                placeholder=""
                                autocomplete="off"
                                lang=""
                                maxlength="-1"
                                tabindex="0"
                            />
                        </div>
                    </div>

                    <div class="mt-6 mb-1 text-xs font-semibold text-dark-3">
                        <span>Mật khẩu mới một lần nữa</span>
                    </div>
                    <div class="relative w-full" aria-label="Mật khẩu mới lặp lại">
                        <div class="relative">
                            <input
                                id="repeat-password"
                                aria-describedby="input-error-message"
                                aria-invalid="false"
                                aria-required="false"
                                type="password"
                                name=""
                                class="focus:outline-none h-10 w-full py-2 text-sm placeholder-sm remove-number-selector pl-3 border border-solid border-dark-6 rounded focus:ring-2 focus:ring-lilac focus:ring-offset-0 bg-light-3 text-dark-2  border-dark-4 placeholder-dark-5 pr-3 pr-2"
                                placeholder=""
                                autocomplete="off"
                                lang=""
                                maxlength="-1"
                                tabindex="0"
                            />
                        </div>
                    </div>

                    <button
                        class="flex none-border items-center justify-center px-7.5 py-2.5 text-lg font-semibold q-shadow mb-1 h-10 base bg-lilac text-light-3 hover:bg-lilac-light active:bg-lilac-dark rounded-lg primary transition-colors duration-200 ease-in-out flex relative min-w-max w-full mt-6 w-full mt-6"
                        aria-label="Cập nhật mật khẩu"
                        type="button"
                        translate="no"
                    >
                        <span class="fs-16 white-color">Cập nhật mật khẩu</span>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default MyAccount;
