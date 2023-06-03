import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faBookBookmark, faHouse, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <div className={cx('sidebar-container')}>
            <div
                className={cx('main-navigation flex flex-col h-full bg-light-3 shrink-0 filter-box-shadow')}
                translate="no"
            >
                <div className={cx('sidebar-navigation flex flex-col overflow-y-auto')}>
                    <a
                        aria-current="page"
                        href="/"
                        className={cx(
                            'router-link-active router-link-exact-active link flex items-center pl-4 whitespace-nowrap w-full hover:bg-light-1 cursor-pointer py-2 active text-lilac font-semibold bg-light-1',
                        )}
                        exactpath=""
                        aria-label="Trang chủ"
                    >
                        <div className={cx('flex items-center w-full')}>
                            <div className={cx('flex items-center justify-center w-6')}>
                                <FontAwesomeIcon icon={faHouse} className={cx('fs-12')}></FontAwesomeIcon>
                            </div>
                            <span className={cx('text-sm whitespace-nowrap pl-1')}>Trang Chủ</span>
                        </div>
                    </a>
                    <a
                        className={cx(
                            'link flex items-center pl-4 whitespace-nowrap w-full hover:bg-light-1 cursor-pointer py-2 text-dark-4',
                        )}
                        href="/myLibrary"
                        exactpath=""
                        aria-label="Thư viện của tôi"
                    >
                        <div className={cx('flex items-center w-full')}>
                            <div className={cx('flex items-center justify-center w-6')}>
                                <FontAwesomeIcon icon={faBookBookmark} className={cx('fs-12')}></FontAwesomeIcon>
                            </div>
                            <span className={cx('text-sm whitespace-nowrap pl-1')}>Thư viện của tôi</span>
                        </div>
                    </a>
                    <a
                        className={cx(
                            'link flex items-center pl-4 whitespace-nowrap w-full hover:bg-light-1 cursor-pointer py-2 text-dark-4',
                        )}
                        href="/createQuestion"
                        aria-label="Tạo đề thi"
                    >
                        <div className={cx('flex items-center w-full')}>
                            <div className={cx('flex items-center justify-center w-6')}>
                                <FontAwesomeIcon icon={faBook} className={cx('fs-12')}></FontAwesomeIcon>
                            </div>
                            <span className={cx('text-sm whitespace-nowrap pl-1')}>Tạo đề thi</span>
                        </div>
                    </a>
                    <a
                        className={cx(
                            'link flex items-center pl-4 whitespace-nowrap w-full hover:bg-light-1 cursor-pointer py-2 text-dark-4',
                        )}
                        href="/myAccount"
                        exactpath=""
                        aria-label="Tài khoản"
                    >
                        <div className={cx('flex items-center w-full')}>
                            <div className={cx('flex items-center justify-center w-6')}>
                                <FontAwesomeIcon icon={faUser} className={cx('fs-12')}></FontAwesomeIcon>
                            </div>
                            <span className={cx('text-sm whitespace-nowrap pl-1')}>Tài khoản</span>
                        </div>
                    </a>
                    <a
                        className={cx(
                            'link flex items-center pl-4 whitespace-nowrap w-full hover:bg-light-1 cursor-pointer py-2 text-dark-4',
                        )}
                        href="/"
                        exactpath=""
                        aria-label="Đăng xuất"
                    >
                        <div className={cx('flex items-center w-full')}>
                            <div className={cx('flex items-center justify-center w-6')}>
                                <FontAwesomeIcon icon={faRightFromBracket} className={cx('fs-12')}></FontAwesomeIcon>
                            </div>
                            <span className={cx('text-sm whitespace-nowrap pl-1')}>Đăng xuất</span>
                        </div>
                    </a>
                </div>
                <div></div>
            </div>
        </div>
    );
}

export default Sidebar;
