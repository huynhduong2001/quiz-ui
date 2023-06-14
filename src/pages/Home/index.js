import { Fragment, useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AuthContext } from '~/AuthContext';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function Home() {
    const { accessToken } = useContext(AuthContext);
    const [user, setUser] = useState();
    const navigate = useNavigate();
    const [allDatas, setAllDatas] = useState([]);
    const [codeJoin, setCodeJoin] = useState('');
    useEffect(() => {
        if (accessToken) {
            fetchAllDatas();
        }
    }, [accessToken]);
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
                setUser(user);
            })
            .catch((error) => console.log(error));
    }, []);
    const fetchAllDatas = () => {
        fetch('https://quiz-app-nodejs.onrender.com/v1/exam/all')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setAllDatas(data.exams || []);
                console.log(data);
            })
            .catch((error) => console.log(error));
    };

    const fetchJoinExam = async (idExam) => {
        const url = 'https://quiz-app-nodejs.onrender.com/v1/exam/info-exam/';
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ examId: idExam }),
            });
            console.log(response);
            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    toast.success('Vào phòng thi thành công!');
                    navigate('/exam', { state: { data: data.message._id } });
                } else toast.error('Không tìm thấy mã phòng!');
            } else {
                toast.error('Không tìm thấy mã phòng!');
            }
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
            toast.error('Đã xảy ra lỗi khi gọi API!');
        }
    };
    const handleJoinGame = async () => {
        if (!codeJoin) {
            toast.error('Vui lòng nhập mã tham gia!');
            return;
        }
        fetchJoinExam(codeJoin);
    };

    const handleJoinExamPublic = (id) => {
        navigate('/exam', { state: { data: id } });
    };

    return (
        <Fragment>
            <div className={cx('content-actionable')}>
                <div className={cx('home-proceed-game-container', 'theme-streak')}>
                    <div className={cx('home-proceed-game')}>
                        <div className={cx('proceed-game-container')}>
                            <div className={cx('proceed-game-action-wrapper')}>
                                <div className={cx('proceed-game-input-container')}>
                                    <input
                                        className={cx('check-room-input')}
                                        placeholder="Nhập mã tham gia"
                                        type="tel"
                                        pattern="\d*"
                                        aria-label="Nhập mã tham gia để chơi một trò chơi"
                                        data-cy="gamecode-field"
                                        value={codeJoin}
                                        onChange={(e) => setCodeJoin(e.target.value)}
                                    />
                                </div>
                                <button
                                    aria-label="Tham gia trò chơi"
                                    isfloating="true"
                                    className={cx('check-room-button', 'text-unselectable')}
                                    data-cy="joinGame-button"
                                    onClick={() => handleJoinGame()}
                                >
                                    <span className={cx('visible')}>THAM GIA</span>
                                </button>
                            </div>
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
                                            <span className={cx('select-avatar-icon')}>
                                                <img
                                                    className={cx('media-dimensions', 'media', 'avt-small')}
                                                    src={`data:image/jpeg;base64,${user && user.image}`}
                                                    alt=""
                                                    width="50%"
                                                />
                                            </span>
                                        </div>
                                    </button>
                                    <p className={cx('player-name')}>
                                        {user && user.lastname} {user && user.firstname}
                                    </p>
                                </div>
                                <div className={cx('player-info')}>
                                    <div className={cx('links-container', 'flex-view', 'all-center')}>
                                        <a onClick={() => navigate('/myAccount')}>
                                            <div className={cx('hero-button')}>
                                                <span>Chỉnh sửa Hồ sơ</span>
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

            <div>
                <div className={cx('featured-section-header')}>
                    <div className={cx('featured-section-title', 'text-unselectable')}>
                        <span>Có thể bạn quan tâm</span>
                    </div>
                </div>
                <div className={cx('featured-section-quizzzes')}>
                    <div className={cx('solo-quiz-container', 'text-unselectable')}>
                        <div className={cx('solo-quizzes')}>
                            {allDatas &&
                                allDatas.map((data) => (
                                    <button
                                        key={data._id}
                                        aria-label="Quiz Information Card"
                                        type="button"
                                        className={cx(
                                            'solo-quiz',
                                            'max-in-row-2',
                                            'max-in-row-3',
                                            'max-in-row-4',
                                            'max-in-row-5',
                                        )}
                                        data-cy="solo-quiz-0"
                                        onClick={() => handleJoinExamPublic(data._id)}
                                    >
                                        <div
                                            className={cx('curved-edge-container', 'media-dimensions', 'media-wrapper')}
                                        >
                                            <div className={cx('curve')}>
                                                <div className={cx('content-container')}>
                                                    <img
                                                        className={cx('media-dimensions', 'media')}
                                                        src={`data:image/jpeg;base64,${data.image}`}
                                                        alt=""
                                                        width="50%"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <p className={cx('quiz-name')}>{data.name}</p>
                                        <p className={cx('quiz-name', 'quiz-dec')}>{data.description}</p>
                                    </button>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Home;
