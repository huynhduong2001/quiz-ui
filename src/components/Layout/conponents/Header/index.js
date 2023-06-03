import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import styles from './Header.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function Header() {
    return (
        <header className={cx('header-wrapper')}>
            <div className={cx('header')}>
                <div className={cx('navigation')}>
                    <div className={cx('logo-img-container')}>
                        <a href="/" className={cx('link-is-active')}>
                            <span className={cx('logo-q')}>
                                <img src={images.logo} alt="quizizz" />
                            </span>
                        </a>
                    </div>
                    <div className={cx('search-input-container')}>
                        <input
                            type="text"
                            className={cx('search-input')}
                            placeholder="Tìm quiz"
                            data-cy="header-search-field"
                        />
                        <a data-cy="header-search-button">
                            <span className={cx('search-icon-container')}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} className={cx('search-icon')} />
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
