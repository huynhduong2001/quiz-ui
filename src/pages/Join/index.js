import styles from './Join.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
function Join() {
    return (
        <>
            <div className={cx('content-actionable')}>
                <div className={cx('home-proceed-game-container', 'theme-streak')}>
                    <div className={cx('home-proceed-game')}>
                        <div className={cx('proceed-game-container')}>
                            <form className={cx('proceed-game-action-wrapper')}>
                                <div className={cx('proceed-game-input-container')}>
                                    <input
                                        className={cx('check-room-input')}
                                        placeholder="Nhập mã tham gia"
                                        type="tel"
                                        pattern="\d*"
                                        maxlength="8"
                                        aria-label="Nhập mã tham gia để chơi một trò chơi"
                                        data-cy="gamecode-field"
                                    />
                                </div>
                                <button
                                    aria-label="Tham gia trò chơi"
                                    isfloating="true"
                                    className={cx('check-room-button', 'text-unselectable')}
                                    data-cy="joinGame-button"
                                    type="submit"
                                >
                                    <span className={cx('visible')}>THAM GIA</span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className={cx('home-hero-container')}>
                    <div className={cx('home-hero', 'theme-streak')}>
                        <div
                            className={cx('themed-streak-hero')}
                            canthemebeunlockedtoday="false"
                            themestreak="[object Object]"
                        >
                            <div
                                className={cx(
                                    'hero-details-container',
                                    'flex-view',
                                    'flex-column',
                                    'all-center',
                                    'h-full',
                                )}
                            >
                                <div className={cx('hero-details')}>
                                    <button
                                        type="button"
                                        className={cx('avatar-wrapper', 'flex-view', 'all-center', 'text-unselectable')}
                                        aria-label="Chọn avatar."
                                    >
                                        <div className={cx('select-avatar')}>
                                            <span className={cx('select-avatar-icon')}> + </span>
                                        </div>
                                    </button>
                                    <p className={cx('player-name')}>Dương Huỳnh</p>
                                </div>
                                <div className={cx('player-info')}>
                                    <div className={cx('links-container', 'flex-view', 'all-center')}>
                                        <a href="/join/settings">
                                            <div className={cx('hero-button')}>
                                                <span>Chỉnh sửa Hồ sơ</span>
                                            </div>
                                        </a>
                                        <span className={cx('dot-separator')}>●</span>
                                        <a href="/join/activity">
                                            <div className={cx('hero-button')}>
                                                <span>Xem Hoạt động</span>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* list bai thi */}
            <div className={cx('featured-section-quizzzes')}>
                <div className={cx('solo-quiz-container', 'text-unselectable')}>
                    <div className={cx('solo-quizzes')}>
                        <button
                            aria-label="Quiz Information Card"
                            type="button"
                            className={cx('solo-quiz', 'max-in-row-2', 'max-in-row-3', 'max-in-row-4', 'max-in-row-5')}
                            data-cy="solo-quiz-0"
                        >
                            <div className={cx('curved-edge-container', 'media-dimensions', 'media-wrapper')}>
                                <div className={cx('curve')}>
                                    <div className={cx('content-container')}>
                                        <img
                                            className={cx('media-dimensions', 'media')}
                                            aria-label="Quiz thumbnail"
                                            src="https://media.quizizz.com/_mdserver/main/media/resource/gs/quizizz-media/quizzes/d4b5f497-d247-412f-8640-15de5e285c00-v2?w=200&amp;h=200"
                                        ></img>
                                    </div>
                                </div>
                            </div>

                            <p className={cx('quiz-name')}>Ôn Toán Giữa Kì 2</p>
                        </button>
                        <button
                            aria-label="Quiz Information Card"
                            type="button"
                            className={cx('solo-quiz', 'max-in-row-2', 'max-in-row-3', 'max-in-row-4', 'max-in-row-5')}
                            data-cy="solo-quiz-1"
                        >
                            <div className={cx('curved-edge-container', 'media-dimensions', 'media-wrapper')}>
                                <div className={cx('curve')}>
                                    <div className={cx('content-container')}>
                                        <img
                                            className={cx('media-dimensions', 'media')}
                                            aria-label="Quiz thumbnail"
                                            src="https://media.quizizz.com/_mdserver/main/media/resource/gs/quizizz-media/quizzes/06664d85-294b-4f22-9d24-1d3829484b87-v2?w=200&amp;h=200"
                                        ></img>
                                    </div>
                                </div>
                            </div>

                            <p className={cx('quiz-name')}>ÔN TRẮC NGHIỆM TOÁN 7 KỲ 2</p>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Join;
