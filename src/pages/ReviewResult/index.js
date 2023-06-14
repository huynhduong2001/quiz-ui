import React, { useEffect, useState, useContext, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '~/AuthContext';

import styles from './ReviewResult.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function ReviewResult() {
    const location = useLocation();
    const id = useRef(location.state?.data);
    const navigate = useNavigate();

    const { accessToken } = useContext(AuthContext);
    const [result, setResult] = useState({
        _id: '1',
        userAnswers: [],
        timeFinish: 0,
        exam: {
            _id: '2',
            name: '',
            time: 0,
            questions: [
                {
                    questionText: '',
                    answers: [],
                    correctAnswer: 0,
                    _id: '3',
                },
            ],
            isPublic: false,
            description: '',
        },
    });

    useEffect(() => {
        const fetchDataResult = () => {
            fetch(`https://quiz-app-nodejs.onrender.com/v1/result/${id.current}`, {
                headers: {
                    'Content-Type': 'application/json',
                    x_authorization: accessToken,
                },
            })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    if (data.success) {
                        setResult(data.message);
                        console.log(result);
                    }
                })
                .catch((error) => console.log(error));
        };
        fetchDataResult();
    }, []);
    // Properties
    const [currentQuestion, setCurrentQuestion] = useState(0);

    function countCorrectAnswers(result) {
        const { userAnswers, exam } = result;

        let count = 0;
        for (let i = 0; i < userAnswers.length; i++) {
            if (userAnswers[i] === exam.correctAnswers[i]) {
                count++;
            }
        }
        return count;
    }

    const countCorrect = countCorrectAnswers(result);
    const countQuestions = result.exam.questions.length;
    const countScore = () => ((countCorrect / countQuestions) * 10).toFixed(1);
    const previousQuestion = () => {
        if (currentQuestion !== 0) setCurrentQuestion(currentQuestion - 1);
    };
    const nextQuestion = () => {
        if (currentQuestion + 1 < result.exam.questions.length) setCurrentQuestion(currentQuestion + 1);
    };

    return (
        <div className={cx('App')}>
            {/* 1. Header  */}
            <h1>{result.exam.name}</h1>
            {/* 2. Current Score  */}
            <h2>Thời gian:{result.exam.totalTime} giây</h2>
            <h2>Hoàn thành trong vòng: {result.timeFinish} giây</h2>
            <div className="space-around">
                <h2>
                    Số câu đúng:{countCorrect}/{countQuestions}
                </h2>
                <h2>Điểm:{countScore()}</h2>
            </div>
            <div className={cx('question-card')}>
                {/* Current Question  */}
                <h2>
                    Câu hỏi: {currentQuestion + 1} trên {result.exam.questions.length}
                </h2>
                <h3 className={cx('question-text')}>{result.exam.questions[currentQuestion].questionText}</h3>

                {/* List of possible answers  */}
                <ul>
                    {result.exam.questions[currentQuestion].answers.map((option, index) => {
                        return (
                            <li
                                key={index}
                                className={cx(
                                    result.userAnswers[currentQuestion] === index ? 'bg-answer' : '',
                                    result.exam.correctAnswers[currentQuestion] === index ? 'bg-right-answer' : '',
                                )}
                            >
                                {option}
                            </li>
                        );
                    })}
                </ul>
                <div className="list-button">
                    <button className={cx('btn-exam')} onClick={() => previousQuestion()}>
                        Câu trước
                    </button>
                    <button className={cx('btn-exam', 'bg-right-answer')} onClick={() => navigate('/myLibrary/')}>
                        Quay về
                    </button>
                    <button className={cx('btn-exam')} onClick={() => nextQuestion()}>
                        Câu sau
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ReviewResult;
