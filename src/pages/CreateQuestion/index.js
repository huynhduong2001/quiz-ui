import { AuthContext } from '~/AuthContext';
import { useNavigate } from 'react-router-dom';

import styles from './CreateQuestion.module.scss';
import styles2 from '../Join/Join.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState, useContext } from 'react';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);
const cx2 = classNames.bind(styles2);
function CreateQuestion() {
    const { accessToken } = useContext(AuthContext);
    const navigate = useNavigate();

    const [datas, setDatas] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch('https://quiz-app-nodejs.onrender.com/v1/exam/', {
            headers: {
                'Content-Type': 'application/json',
                x_authorization: accessToken,
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                const exams = data.exams;
                console.log(data);
                setDatas(exams);
            })
            .catch((error) => console.log(error));
    };
    console.log(datas);
    const handleEditExam = (data) => {
        navigate('/createQuestion/editExam', { state: { data: data } });
        console.log('aa');
        return;
    };
    const handleCopyClick = (e, examId) => {
        e.stopPropagation();
        e.preventDefault(e);
        navigator.clipboard.writeText(examId);
        toast.success('Copy thành công!');
    };

    return (
        <div className="">
            <div className="mg-20">
                <a className={cx('btn-save', 'btn-create')} href="" onClick={() => navigate('/question')}>
                    <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                    Tạo đề thi
                </a>
            </div>
            <div className={cx2('featured-section-quizzzes')}>
                <div className={cx2('solo-quiz-container', 'text-unselectable')}>
                    <div className={cx2('solo-quizzes')}>
                        {datas &&
                            datas.map((data) => (
                                <button
                                    key={data._id}
                                    onClick={() => handleEditExam(data)}
                                    aria-label="Quiz Information Card"
                                    type="button"
                                    className={cx2(
                                        'solo-quiz',
                                        'max-in-row-2',
                                        'max-in-row-3',
                                        'max-in-row-4',
                                        'max-in-row-5',
                                    )}
                                    data-cy="solo-quiz-0"
                                >
                                    <div className={cx2('curved-edge-container', 'media-dimensions', 'media-wrapper')}>
                                        <div className={cx2('curve')}>
                                            <div className={cx2('content-container')}>
                                                <img
                                                    className={cx2('media-dimensions', 'media')}
                                                    aria-label="Quiz thumbnail"
                                                    src={`data:image/jpeg;base64,${data && data.image}`}
                                                ></img>
                                            </div>
                                        </div>
                                    </div>

                                    <p className={cx2('quiz-name')}>{data.name}</p>
                                    <p className={cx2('quiz-name', 'quiz-dec')}>{data.description}</p>
                                    <p className={cx2('quiz-name', 'quiz-dec')}>
                                        Mã đề thi:
                                        {data.examId.length > 10 ? data.examId.substring(0, 8) + '...' : data.examId}
                                        <span
                                            className={cx('icon-copy')}
                                            onClick={(e) => handleCopyClick(e, data.examId)}
                                        >
                                            <FontAwesomeIcon icon={faCopy}></FontAwesomeIcon>
                                        </span>
                                    </p>
                                </button>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateQuestion;
