import React, { useRef, useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '~/AuthContext';

import styles from './Exam.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Exam() {
    const { accessToken } = useContext(AuthContext);
    const location = useLocation();
    const id = location.state?.data;
    console.log(id);
    const [exam, setExam] = useState({
        _id: '',
        name: '',
        examId: '',
        questions: [
            {
                questionText: '',
                answers: [],
                _id: '',
            },
        ],
        correctAnswers: [0],
        totalTime: 0,
        description: '',
        isPublic: true,
        createdBy: '',
    });
    const navigate = useNavigate();
    // Properties
    const [showIntro, setShowIntro] = useState(true);
    const [showResults, setShowResults] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const answers = useRef([]);
    const [seconds, setSeconds] = useState();
    // Helper Functions

    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        const url = `https://quiz-app-nodejs.onrender.com/v1/exam/${id}`;
        try {
            const response = await fetch(url, {
                method: 'GET',
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                if (data.success) {
                    setExam(data.message);
                    setSeconds(data.message.totalTime);
                    answers.current = Array.from({ length: data.message.questions.length });
                } else toast.error('Không tìm thấy phòng thi!');
            } else {
                toast.error('Không tìm thấy phòng thi!');
            }
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
            toast.error('Đã xảy ra lỗi khi gọi API!');
        }
    };
    /* A possible answer was clicked */
    const optionClicked = (index) => {
        answers.current[currentQuestion] = index;
        setSelectedAnswer(index);
    };

    const previousQuestion = () => {
        if (currentQuestion !== 0) {
            setCurrentQuestion(currentQuestion - 1);
            setSelectedAnswer(null);
        }
    };
    const nextQuestion = () => {
        if (currentQuestion + 1 < exam.questions.length) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
        }
    };
    /* Resets the game back to default */
    const restartGame = () => {
        setScore(0);
        setCurrentQuestion(0);
        setShowResults(false);
        setSelectedAnswer(null);
        navigate('/');
    };
    //tinh diem
    function countCorrectAnswers(exam) {
        let count = 0;
        for (let i = 0; i < answers.current.length; i++) {
            if (answers.current[i] === exam.correctAnswers[i]) {
                count++;
            }
        }
        return count;
    }

    const handleJoinExam = () => {
        for (let i = 0; i < exam.questions.length; i++) {
            delete exam.questions[i]._id;
        }
        delete exam._id;
        delete exam.__v;
        delete exam.image;

        setShowIntro(!showIntro);
    };
    const handleSaveAnswers = async () => {
        const countCorrect = countCorrectAnswers(exam);
        setScore(countCorrect);
        setShowResults(true);
        const finishAnswers = [...answers.current].map((element) => {
            if (element === undefined || element === null) {
                return -1;
            }
            return element;
        });
        const result = {
            timeFinish: exam.totalTime - seconds,
            userAnswers: finishAnswers,
            exam: exam,
        };
        console.log(answers.current, finishAnswers);

        await fetch('https://quiz-app-nodejs.onrender.com/v1/result/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                x_authorization: accessToken,
            },
            body: JSON.stringify(result),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    toast.success('Bạn đã hoàn thành bài thi!');
                } else toast.error(data.message);
                console.log(data);
            })
            .catch((error) => {
                // Xử lý lỗi trong quá trình gửi yêu cầu
                console.log(error);
            });
    };

    //countdown time
    useEffect(() => {
        if (showIntro === false && seconds > 0 && showResults === false) {
            // Bắt đầu đếm ngược khi component được render lần đầu tiên
            const timer = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds - 1);
            }, 1000);
            return () => {
                clearInterval(timer);
            };
        }
        if (seconds === 0 && showIntro === false) {
            handleSaveAnswers();
            toast.error('Hết giờ!');
        }
    }, [seconds, showIntro]);

    // Chuyển đổi giây thành phút và giây
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return (
        <div className={cx('App')}>
            {/* 1. Header  */}
            <h1>Tên: {exam.name}</h1>

            {/* 2. Current Score  */}
            <h2>Thời gian:{`${minutes} phút ${remainingSeconds < 10 ? '0' : ''}${remainingSeconds} giây`} </h2>

            {/* 3. Show results or show the question game  */}
            {showIntro ? (
                <div className={cx('final-results')}>
                    <h1>Bạn đã sẵn sàng thi?</h1>
                    <h2>Số câu: {exam.questions.length}</h2>
                    <div className="list-button">
                        <button className={cx('btn-exam', 'bg-right-answer')} onClick={() => handleJoinExam()}>
                            Vào thi
                        </button>
                        <button className={cx('btn-exam')} onClick={() => navigate('/')}>
                            Quay trở về
                        </button>
                    </div>
                </div>
            ) : showResults ? (
                /* 4. Final Results */
                <div className={cx('final-results')}>
                    <h1>Bạn đã hoàn thành bài thi</h1>
                    <h2>
                        {score} trên {exam.questions.length} đúng - (
                        {((score / exam.questions.length) * 100).toFixed(1)}
                        %)
                    </h2>
                    <button className={cx('btn-exam')} onClick={() => restartGame()}>
                        Quay trở về
                    </button>
                </div>
            ) : (
                /* 5. Question Card  */
                <div className={cx('question-card')}>
                    {/* Current Question  */}
                    <h2>
                        Câu hỏi: {currentQuestion + 1} trên {exam.questions.length}
                    </h2>
                    <h3 className={cx('question-text')}>{exam.questions[currentQuestion].questionText}</h3>

                    {/* List of possible answers  */}
                    <ul>
                        {exam &&
                            exam.questions[currentQuestion].answers.map((option, index) => {
                                return (
                                    <li
                                        key={index}
                                        onClick={() => optionClicked(index)}
                                        className={cx(
                                            answers.current[currentQuestion] === index ? 'bg-right-answer' : '',
                                            selectedAnswer === index ? 'bg-right-answer' : '',
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
                        <button className={cx('btn-exam')} onClick={() => handleSaveAnswers()}>
                            Nộp bài
                        </button>
                        <button className={cx('btn-exam')} onClick={() => nextQuestion()}>
                            Câu sau
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Exam;
