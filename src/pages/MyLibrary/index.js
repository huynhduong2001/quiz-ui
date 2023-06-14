import { AuthContext } from '~/AuthContext';
import { useNavigate } from 'react-router-dom';

import styles from './MyLibrary.module.scss';
import styles2 from '~/pages/EditExam/EditExam.module.scss';

import { toast } from 'react-toastify';

import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faList } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState, useContext } from 'react';

const cx = classNames.bind(styles);
const cx2 = classNames.bind(styles2);

function MyLibrary() {
    const { accessToken } = useContext(AuthContext);
    const [dataResult, setResultExam] = useState([]);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        fetchDataResult();
    }, []);

    const fetchDataResult = () => {
        fetch('https://quiz-app-nodejs.onrender.com/v1/result/', {
            headers: {
                'Content-Type': 'application/json',
                x_authorization: accessToken,
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                const result = data.message;
                console.log(data);
                setResultExam(result);
            })
            .catch((error) => console.log(error));
    };
    const handleReviewResult = (id) => {
        navigate('/myLibrary/reviewResult', { state: { data: id } });
    };
    const handleDeleteExam = (id) => {
        setShowModal(false);
        console.log(id);
        const url = 'https://quiz-app-nodejs.onrender.com/v1/result/' + id;
        fetch(url, {
            method: 'DELETE',
            headers: {
                x_authorization: accessToken,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    toast.success('Xóa thành công!');
                    fetchDataResult();
                } else toast.error(data.message);
                console.log(data);
            })
            .catch((error) => {
                // Xử lý lỗi trong quá trình gửi yêu cầu
                console.log(error);
            });
    };
    return (
        <>
            <div className={cx('flex flex-grow overflow-auto bg-light-1 content overflow-auto max-height')}>
                <div className={cx('flex flex-col w-screen md:flex-row md:justify-center md:mt-6 mt-4')}>
                    <div className={cx('bg-light md:bg-transparent w-4/6')}>
                        <div className={cx('flex flex-col m-0 p-0 gap-y-4')}>
                            <div className={cx('flex flex-col pb-8 gap-y-1')}>
                                {dataResult &&
                                    dataResult
                                        // .slice()
                                        // .reverse()
                                        .map((data) => (
                                            <div className="w-600 flex" key={data._id}>
                                                <button
                                                    className={cx('w-full')}
                                                    onClick={() => handleReviewResult(data._id)}
                                                >
                                                    <div
                                                        className={cx(
                                                            'quiz-card cursor-pointer relative flex flex-col items-start min-w-82 md:h-auto md:min-w-initial md:border md:border-dark-10% bg-light-3 p-2 rounded hover:bg-light-2',
                                                        )}
                                                        aria-label="Quiz"
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
                                                                            alt="Quiz "
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
                                                                        <div className="w-full">
                                                                            <div className="w-full flex justify-between">
                                                                                <div
                                                                                    className={cx(
                                                                                        'name',
                                                                                        'overflow-hidden md:h-6',
                                                                                    )}
                                                                                >
                                                                                    {data.name}
                                                                                </div>
                                                                                <div className={cx('')}></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className={cx(
                                                                            'name font-bold flex flex-row justify-between text-base',
                                                                        )}
                                                                    >
                                                                        <div className="w-full">
                                                                            <div className="w-full flex justify-between">
                                                                                <div
                                                                                    className={cx(
                                                                                        'name',
                                                                                        'overflow-hidden md:h-6',
                                                                                        'dec',
                                                                                    )}
                                                                                >
                                                                                    {data.description}
                                                                                </div>
                                                                                <div className={cx('')}></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        translate="no"
                                                                        className="text-dark-3 flex flex-row justify-between items-center text-xs"
                                                                    >
                                                                        <div className="flex flex-row items-center">
                                                                            <div translate="no" className="mr-3.5">
                                                                                <FontAwesomeIcon
                                                                                    icon={faList}
                                                                                    className={cx(
                                                                                        'flex items-center mr-0.5 fs-12 inline-flex',
                                                                                    )}
                                                                                ></FontAwesomeIcon>{' '}
                                                                                {data.score}/{data.totalQuestions} Câu
                                                                                trả lời đúng /{' '}
                                                                                {(
                                                                                    (data.score / data.totalQuestions) *
                                                                                    10
                                                                                ).toFixed(1)}{' '}
                                                                                điểm
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </button>
                                                <span className={cx('btn-close')} onClick={() => setShowModal(true)}>
                                                    <FontAwesomeIcon icon={faCircleXmark}></FontAwesomeIcon>
                                                </span>
                                                {showModal && (
                                                    <div className={cx2('modal')}>
                                                        <div className={cx2('modal-content')}>
                                                            {/* Nội dung của modal */}
                                                            <h2>Xóa đề thi</h2>
                                                            <p>Bạn có thật sự muốn xóa đề thi?</p>
                                                            <div className="list-button">
                                                                <button
                                                                    className={cx2('bg-red')}
                                                                    onClick={() => handleDeleteExam(data._id)}
                                                                >
                                                                    Xóa
                                                                </button>
                                                                <button onClick={() => setShowModal(false)}>
                                                                    Đóng
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MyLibrary;
