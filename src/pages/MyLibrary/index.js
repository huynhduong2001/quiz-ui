import styles from './MyLibrary.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function MyLibrary() {
    return (
        <div className={cx('flex flex-grow overflow-auto bg-light-1 content overflow-auto')}>
            <div className={cx('flex flex-col w-screen md:flex-row md:justify-center md:mt-6 mt-4')}>
                <div className={cx('w-60 md:mr-6 z-1')}>
                    <div className={cx('flex flex-col overflow-y-auto', 'navigation-drawer', 'fixed w-60 gap-y-4')}>
                        <div
                            className={cx(
                                'flex px-3 pb-1 justify-left items-center font-bold text-dark-3 text-base md:text-xl md:p-0 md:h-8',
                            )}
                        >
                            <span className={cx('fs-20')} translate="no">
                                Thư viện của tôi
                            </span>
                        </div>
                        <div className={cx('flex flex-col divide-y divide-dark-10%')}>
                            <ul
                                className={cx(
                                    'flex flex-row flex-wrap text-xs p-3 gap-2 md:text-sm md:flex-col md:p-0 md:pb-4 md:gap-y-1',
                                )}
                            >
                                <div className={cx('md:w-full')}>
                                    <li
                                        className={cx(
                                            'flex border border-dark-6 rounded text-dark-4 hover:bg-light hover:shadow-sm hover:text-dark-2 cursor-pointer h-6 items-center md:border-0 md:mb-0 md:w-full md:h-8 p-0 bg-light-3 md:bg-light-1',
                                        )}
                                    >
                                        <button
                                            className={cx(
                                                'flex flex-row flex-grow items-center justify-between h-full',
                                            )}
                                        >
                                            <div
                                                className={cx(
                                                    'flex flex-row items-center border-r-1 border-dark-10% md:border-0 w-8 h-full justify-center',
                                                )}
                                            >
                                                <i
                                                    className={cx('flex items-center fal fa-user px-2 font-semibold')}
                                                ></i>
                                            </div>
                                            <div className={cx('flex flex-grow px-2 items-center')}>
                                                <span className={cx('font-semibold truncate')}>Danh sách bài thi</span>
                                            </div>
                                            <div className={cx('flex px-2 items-center text-xs')}>0</div>
                                        </button>
                                    </li>
                                </div>
                                <div className={cx('md:w-full')}>
                                    <li
                                        className={cx(
                                            'flex border border-dark-6 rounded text-dark-4 hover:bg-light hover:shadow-sm hover:text-dark-2 cursor-pointer h-6 items-center md:border-0 md:mb-0 md:w-full md:h-8 p-0 bg-light-3 md:bg-light-1',
                                        )}
                                    >
                                        <button
                                            className={cx(
                                                'flex flex-row flex-grow items-center justify-between h-full',
                                            )}
                                        >
                                            <div
                                                className={cx(
                                                    'flex flex-row items-center border-r-1 border-dark-10% md:border-0 w-8 h-full justify-center',
                                                )}
                                            >
                                                <i
                                                    className={cx(
                                                        'flex items-center fal fa-file-import px-2 font-semibold',
                                                    )}
                                                ></i>
                                            </div>
                                            <div className={cx('flex flex-grow px-2 items-center')}>
                                                <span className={cx('font-semibold truncate')}>Danh sách đề thi</span>
                                            </div>
                                            <div className={cx('flex px-2 items-center text-xs')}>0</div>
                                        </button>
                                    </li>
                                </div>

                                <div className={cx('md:w-full')}>
                                    <li
                                        className={cx(
                                            'flex border border-dark-6 rounded text-dark-4 hover:bg-light hover:shadow-sm hover:text-dark-2 cursor-pointer h-6 items-center md:border-0 md:mb-0 md:w-full md:h-8 p-0 bg-light-3 md:bg-light-1',
                                        )}
                                    >
                                        <button
                                            className={cx(
                                                'flex flex-row flex-grow items-center justify-between h-full',
                                            )}
                                        >
                                            <div
                                                className={cx(
                                                    'flex flex-row items-center border-r-1 border-dark-10% md:border-0 w-8 h-full justify-center',
                                                )}
                                            >
                                                <i
                                                    className={cx(
                                                        'flex items-center fal fa-archive px-2 font-semibold',
                                                    )}
                                                ></i>
                                            </div>
                                            <div className={cx('flex flex-grow px-2 items-center')}>
                                                <span className={cx('font-semibold truncate')}>Tất cả</span>
                                            </div>
                                            <div className={cx('flex px-2 items-center text-xs')}></div>
                                        </button>
                                    </li>
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={cx('bg-light md:bg-transparent w-4/6')}>
                    <div className={cx('flex flex-col m-0 p-0 gap-y-4')}>
                        <div className={cx('flex flex-col pb-8 gap-y-1')}>
                            <div class="w-600">
                                <button className={cx('w-full')}>
                                    <div
                                        className={cx(
                                            'quiz-card cursor-pointer relative flex flex-col items-start min-w-82 md:h-auto md:min-w-initial md:border md:border-dark-10% bg-light-3 p-2 rounded hover:bg-light-2',
                                        )}
                                        aria-label="Quiz"
                                        tabindex="0"
                                        role="button"
                                    >
                                        <div className={cx('flex flex-row w-full')}>
                                            <div className={cx('flex flex-col items-center')}>
                                                <div
                                                    className={cx(
                                                        'h-18 w-18 md:w-26 md:h-26 relative rounded-sm overflow-hidden bg-lilac',
                                                    )}
                                                >
                                                    <div className={cx('w-full h-full')}>
                                                        <img
                                                            className={cx(
                                                                'lazy-img',
                                                                'rounded-inherit',
                                                                'object-contain',
                                                                'w-full h-full',
                                                            )}
                                                            alt="Quiz image"
                                                            lazy="loaded"
                                                            src="https://cf.quizizz.com/img/logos/new/logo_placeholder_sm.png?w=200&amp;h=200"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={cx('flex w-full')}>
                                                <div
                                                    className={cx(
                                                        'flex flex-col w-full ml-3 content-container relative md:gap-1.5',
                                                    )}
                                                >
                                                    <div
                                                        className={cx(
                                                            'name font-bold flex flex-row justify-between text-base',
                                                        )}
                                                    >
                                                        <div class="w-full">
                                                            <div class="w-full flex justify-between">
                                                                <div className={cx('name', 'overflow-hidden md:h-6')}>
                                                                    Toán THPT
                                                                </div>
                                                                <div className={cx('')}></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={cx('')}
                                                        translate="no"
                                                        class="text-dark-3 flex flex-row justify-between items-center text-xs"
                                                    >
                                                        <div class="flex flex-row items-center">
                                                            <div className={cx('')} translate="no" class="mr-3.5">
                                                                <FontAwesomeIcon
                                                                    icon={faList}
                                                                    className={cx(
                                                                        'flex items-center mr-0.5 fs-12 inline-flex',
                                                                    )}
                                                                ></FontAwesomeIcon>{' '}
                                                                0 Câu hỏi
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={cx('')} class="flex items-center justify-between">
                                                        <div className={cx('flex items-center pr-2', 'text-tn')}>
                                                            <div className={cx('')}>
                                                                <img
                                                                    className={cx('')}
                                                                    src="https://lh3.googleusercontent.com/a/AGNmyxZrAiASlx4RXEgNbHH-yXqd6mbbUe5PGWpfGbH3=s96-c"
                                                                    class="w-6 h-6 mr-2 rounded-full"
                                                                    alt="User"
                                                                />
                                                            </div>
                                                            <div
                                                                className={cx('')}
                                                                class="flex items-center font-normal text-dark-4"
                                                            >
                                                                <a
                                                                    className={cx(
                                                                        'mr-2 hover:underline max-w-20',
                                                                        'userName',
                                                                    )}
                                                                    href="/profile/64677ec47c504d001dbc2796"
                                                                >
                                                                    Dương Huỳnh
                                                                </a>
                                                                <div
                                                                    className={cx('')}
                                                                    class="mr-2 h-0.5 w-0.5 flex justify-center items-center rounded-full bg-dark-4 max-w-20"
                                                                ></div>
                                                                <div className={cx('')} translate="no" class="time">
                                                                    6 ngày&nbsp;
                                                                    <span
                                                                        className={cx('')}
                                                                        translate="no"
                                                                        class="_i18n-container LANG_vi"
                                                                    >
                                                                        trước
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            </div>
                            <div class="w-600">
                                <button className={cx('w-full')}>
                                    <div
                                        className={cx(
                                            'quiz-card cursor-pointer relative flex flex-col items-start min-w-82 md:h-auto md:min-w-initial md:border md:border-dark-10% bg-light-3 p-2 rounded hover:bg-light-2',
                                        )}
                                        aria-label="Quiz"
                                        tabindex="0"
                                        role="button"
                                    >
                                        <div className={cx('flex flex-row w-full')}>
                                            <div className={cx('flex flex-col items-center')}>
                                                <div
                                                    className={cx(
                                                        'h-18 w-18 md:w-26 md:h-26 relative rounded-sm overflow-hidden bg-lilac',
                                                    )}
                                                >
                                                    <div className={cx('w-full h-full')}>
                                                        <img
                                                            className={cx(
                                                                'lazy-img',
                                                                'rounded-inherit',
                                                                'object-contain',
                                                                'w-full h-full',
                                                            )}
                                                            alt="Quiz image"
                                                            lazy="loaded"
                                                            src="https://cf.quizizz.com/img/logos/new/logo_placeholder_sm.png?w=200&amp;h=200"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={cx('flex w-full')}>
                                                <div
                                                    className={cx(
                                                        'flex flex-col w-full ml-3 content-container relative md:gap-1.5',
                                                    )}
                                                >
                                                    <div
                                                        className={cx(
                                                            'name font-bold flex flex-row justify-between text-base',
                                                        )}
                                                    >
                                                        <div class="w-full">
                                                            <div class="w-full flex justify-between">
                                                                <div className={cx('name', 'overflow-hidden md:h-6')}>
                                                                    Toán THPT
                                                                </div>
                                                                <div className={cx('')}></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={cx('')}
                                                        translate="no"
                                                        class="text-dark-3 flex flex-row justify-between items-center text-xs"
                                                    >
                                                        <div class="flex flex-row items-center">
                                                            <div className={cx('')} translate="no" class="mr-3.5">
                                                                <FontAwesomeIcon
                                                                    icon={faList}
                                                                    className={cx(
                                                                        'flex items-center mr-0.5 fs-12 inline-flex',
                                                                    )}
                                                                ></FontAwesomeIcon>{' '}
                                                                0 Câu hỏi
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={cx('')} class="flex items-center justify-between">
                                                        <div className={cx('flex items-center pr-2', 'text-tn')}>
                                                            <div className={cx('')}>
                                                                <img
                                                                    className={cx('')}
                                                                    src="https://lh3.googleusercontent.com/a/AGNmyxZrAiASlx4RXEgNbHH-yXqd6mbbUe5PGWpfGbH3=s96-c"
                                                                    class="w-6 h-6 mr-2 rounded-full"
                                                                    alt="User"
                                                                />
                                                            </div>
                                                            <div
                                                                className={cx('')}
                                                                class="flex items-center font-normal text-dark-4"
                                                            >
                                                                <a
                                                                    className={cx(
                                                                        'mr-2 hover:underline max-w-20',
                                                                        'userName',
                                                                    )}
                                                                    href="/profile/64677ec47c504d001dbc2796"
                                                                >
                                                                    Dương Huỳnh
                                                                </a>
                                                                <div
                                                                    className={cx('')}
                                                                    class="mr-2 h-0.5 w-0.5 flex justify-center items-center rounded-full bg-dark-4 max-w-20"
                                                                ></div>
                                                                <div className={cx('')} translate="no" class="time">
                                                                    6 ngày&nbsp;
                                                                    <span
                                                                        className={cx('')}
                                                                        translate="no"
                                                                        class="_i18n-container LANG_vi"
                                                                    >
                                                                        trước
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyLibrary;
