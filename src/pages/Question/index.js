import React, { useEffect, useRef, useState } from 'react';
import styles from '~/pages/Exam/Exam.module.scss';
import './Question.css';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);
const Question = () => {
    const [title, setTitle] = useState('');
    const [avatar, setAvatar] = useState();
    const [numberQuestion, setNumberQuestion] = useState(0);
    const [timeQuestion, setTimeQuestion] = useState(0);
    const [publicQuestion, setPublicQuestion] = useState(false);

    const [showQuestion, setShowQuestion] = useState(false);
    //temp
    const [tempNameQuestion, setTempNameQuestion] = useState('');
    const [tempOptionsAnswer, setTempOptionsAnswer] = useState([
        { id: 0, text: '', isCorrect: true },
        { id: 1, text: '', isCorrect: false },
        { id: 2, text: '', isCorrect: false },
        { id: 3, text: '', isCorrect: false },
    ]);

    // const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [correctAnswer, setCorrectAnswer] = useState(0);

    const questions = useRef([]);

    useEffect(() => {
        //cleans up
        return () => {
            avatar && URL.revokeObjectURL(avatar.preview);
        };
    }, [avatar]);
    const handlePreviewAvatar = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setAvatar(file);
    };

    const handleCreateExam = () => {
        questions.current = Array.from({ length: numberQuestion }, () => ({
            text: '',
            options: [
                { id: 0, text: '', isCorrect: true },
                { id: 1, text: '', isCorrect: false },
                { id: 2, text: '', isCorrect: false },
                { id: 3, text: '', isCorrect: false },
            ],
        }));

        // console.log('createExam', title, avatar, numberQuestion, timeQuestion, publicQuestion, questions);
        setShowQuestion(true);
    };

    function findIsCorrect(options) {
        return options.findIndex((option) => option.isCorrect === true);
    }
    const previousQuestion = () => {
        if (currentQuestion !== 0) {
            questions.current[currentQuestion].text = tempNameQuestion;
            questions.current[currentQuestion].options = tempOptionsAnswer;
            setCurrentQuestion(currentQuestion - 1);
            setTempNameQuestion(questions.current[currentQuestion - 1].text);
            setTempOptionsAnswer(questions.current[currentQuestion - 1].options);
            setCorrectAnswer(findIsCorrect(questions.current[currentQuestion - 1].options));
        }
    };
    const nextQuestion = () => {
        if (currentQuestion + 1 < questions.current.length) {
            questions.current[currentQuestion].text = tempNameQuestion;
            questions.current[currentQuestion].options = tempOptionsAnswer;
            setCurrentQuestion(currentQuestion + 1);
            setTempNameQuestion(questions.current[currentQuestion + 1].text);
            setTempOptionsAnswer(questions.current[currentQuestion + 1].options);
            setCorrectAnswer(findIsCorrect(questions.current[currentQuestion + 1].options));
        }
    };
    const deleteOptionAnswer = (index) => {
        const options = [...tempOptionsAnswer];
        options.splice(index, 1);
        const newOptions = options.map((option, i) => ({
            ...option,
            id: i,
        }));
        setTempOptionsAnswer(newOptions);
        questions.current[currentQuestion].options = newOptions;
    };
    const addOption = () => {
        const option = [...tempOptionsAnswer, { id: tempOptionsAnswer.length, text: '', isCorrect: false }];
        setTempOptionsAnswer(option);
        questions.current[currentQuestion].options = option;
    };

    const handleChangeNameQuestion = (value) => {
        setTempNameQuestion(value);
        questions.current[currentQuestion].text = value;
    };
    const handleChangeOptionsAnswer = (e, index) => {
        const option = [...tempOptionsAnswer];
        option[index].text = e.target.value;
        questions.current[currentQuestion].options = option;
        setTempOptionsAnswer(option);
    };
    const handleSelectCorrectAnswer = (index) => {
        setCorrectAnswer(index);
        const options = questions.current[currentQuestion].options;
        const newOptions = options.map((option) => ({ ...option, isCorrect: false }));
        newOptions[index].isCorrect = true;
        questions.current[currentQuestion].options = newOptions;
        setTempOptionsAnswer(newOptions);
    };
    const handleSubmitExam = () => {};

    return (
        <div className="exam-container">
            <h1 className="exam-title">Tạo đề thi</h1>
            <div className="form-container">
                <input
                    type="text"
                    placeholder="Nhập tiêu đề"
                    className="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <div className="form-row">
                    <label className="form-label">Hình đại diện</label>
                    <input type="file" className="form-input" onChange={(e) => handlePreviewAvatar(e)} />
                    {avatar && <img src={avatar.preview} alt="" width="50%" className="flex mg-auto" />}
                </div>
                <div className="form-row">
                    <label className="form-label">Số lượng câu hỏi của bài kiểm tra</label>
                    <input
                        type="number"
                        className="form-input"
                        value={numberQuestion}
                        onChange={(e) => setNumberQuestion(e.target.value)}
                    />
                </div>
                <div className="form-row">
                    <label className="form-label">Thời gian làm bài kiểm tra (phút)</label>
                    <input
                        type="number"
                        className="form-input"
                        value={timeQuestion}
                        onChange={(e) => setTimeQuestion(e.target.value)}
                    />
                </div>
                <div className="form-row  inline-box">
                    <label className="form-label">Chọn chế độ công khai</label>
                    <input
                        type="checkbox"
                        className="form-input-checkbox"
                        checked={publicQuestion}
                        onChange={() => setPublicQuestion(!publicQuestion)}
                    />
                </div>
                <button className="form-button" onClick={() => handleCreateExam()}>
                    Tạo
                </button>
            </div>
            {showQuestion && (
                <div className={cx('App')}>
                    {/* 1. Header  */}
                    <h1>{title || 'Bỏ trống'}</h1>

                    {/* 2. Current Score  */}
                    <h2>Thời gian:{timeQuestion} phút</h2>

                    {/* 3. Show results or show the question game  */}
                    <div className={cx('question-card')}>
                        {/* Current Question  */}
                        <h2>
                            Question: {currentQuestion + 1} trong {questions.current.length}
                        </h2>
                        <input
                            type="text"
                            className={cx('question-text')}
                            value={tempNameQuestion}
                            onChange={(e) => handleChangeNameQuestion(e.target.value)}
                        />
                        <h3 className="float-left">Đáp án</h3>
                        {/* List of possible answers  */}
                        <ul>
                            {questions.current[currentQuestion].options.map((option, index) => {
                                return (
                                    <li key={index} className={cx('li-answer')}>
                                        <input
                                            key={index}
                                            value={tempOptionsAnswer[index].text}
                                            onChange={(e) => handleChangeOptionsAnswer(e, index)}
                                        />
                                        <span className="btn-close" onClick={() => deleteOptionAnswer(index)}>
                                            <FontAwesomeIcon icon={faCircleXmark}></FontAwesomeIcon>
                                        </span>
                                        <label>
                                            <input
                                                type="radio"
                                                className={cx('radio-button')}
                                                checked={index === correctAnswer}
                                                onChange={() => handleSelectCorrectAnswer(index)}
                                            />
                                            Câu trả lời đúng
                                        </label>
                                    </li>
                                );
                            })}
                        </ul>
                        <div className="list-button">
                            <button className={cx('btn-exam')} onClick={() => previousQuestion()}>
                                Câu trước
                            </button>
                            <button className={cx('btn-exam')} onClick={() => addOption()}>
                                Thêm câu trả lời
                            </button>
                            <button className={cx('btn-exam')} onClick={() => nextQuestion()}>
                                Câu sau
                            </button>
                        </div>
                        <button className={cx('btn-exam', 'btn-save')}>Lưu</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Question;
