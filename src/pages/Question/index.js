import React, { useEffect, useRef, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '~/AuthContext';
import styles from '~/pages/Exam/Exam.module.scss';
import './Question.css';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);
const Question = () => {
    const { accessToken } = useContext(AuthContext);
    const navigate = useNavigate();

    const [idUser, setIdUser] = useState();
    const [title, setTitle] = useState('');
    const [dec, setDec] = useState('');
    const [avatar, setAvatar] = useState('');
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

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [correctAnswer, setCorrectAnswer] = useState(0);

    const questions = useRef([]);

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
                console.log(user);
                setIdUser(user._id);
            })
            .catch((error) => console.log(error));
    }, [accessToken]);

    useEffect(() => {
        //cleans up
        return () => {
            avatar && URL.revokeObjectURL(avatar.preview);
        };
    }, [avatar]);
    const handlePreviewAvatar = (e) => {
        const file = e.target.files[0];
        setAvatar(file);
    };

    const handleCreateExam = (e) => {
        e.preventDefault(e);
        if (title.trim() === '') {
            toast.error('Vui lòng nhập tiêu đề');
            return;
        }
        if (dec.trim() === '') {
            toast.error('Vui lòng nhập mô tả');
            return;
        }
        // if (avatar === null) {
        //     toast.error('Vui lòng thêm hình ảnh');
        //     return;
        // }
        if (numberQuestion <= 0) {
            toast.error('Vui lòng xem lại số lượng câu hỏi');
            return;
        }
        if (timeQuestion <= 0) {
            toast.error('Vui lòng xem lại thời gian làm bài');
            return;
        }

        questions.current = Array.from({ length: numberQuestion }, () => ({
            text: '',
            options: [
                { id: 0, text: '', isCorrect: true },
                { id: 1, text: '', isCorrect: false },
                { id: 2, text: '', isCorrect: false },
                { id: 3, text: '', isCorrect: false },
            ],
        }));
        setCorrectAnswer(0);
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
        // xóa trúng dòng câu trả lời đúng
        if (index === tempOptionsAnswer.length - 1) {
            newOptions[newOptions.length - 1].isCorrect = true;
            setCorrectAnswer(newOptions.length - 1);
        } else if (correctAnswer === index) newOptions[index].isCorrect = true;

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

    const checkNullQuestions = () => {
        for (let i = 0; i < questions.current.length; i++) {
            if (questions.current[i].text === '') return true;
            for (let j = 0; j < questions.current[i].options.length; j++) {
                if (questions.current[i].options[j].text == null) return true;
            }
        }
        return false;
    };
    const handleSaveQuestion = () => {
        const isNull = checkNullQuestions();
        if (isNull) {
            toast.error('Không được bỏ trống!');
            return;
        }
        const fomatquestions = questions.current.map((question) => ({
            questionText: question.text,
            answers: question.options.map((option) => option.text),
        }));

        const fomatAnswer = questions.current.map((question) =>
            question.options.findIndex((option) => option.isCorrect),
        );
        const formData = new FormData();
        formData.append('image', avatar);
        formData.append('name', title);
        formData.append('totalTime', timeQuestion);
        formData.append('description', dec);
        formData.append('questions', JSON.stringify(fomatquestions));
        formData.append('correctAnswers', JSON.stringify(fomatAnswer));
        formData.append('createdBy', idUser);
        formData.append('isPublic', publicQuestion);
        // if (avatar) formData.append('image', avatar);
        console.log(typeof JSON.stringify(fomatquestions));
        console.log(typeof JSON.parse(JSON.stringify(fomatquestions)));
        // const exam = {
        //     name: title,
        //     // image: formData,
        //     totalTime: timeQuestion,
        //     description: dec,
        //     questions: fomatquestions,
        //     correctAnswers: fomatAnswer,
        //     createdBy: idUser,
        //     isPublic: publicQuestion,
        // };
        // console.log('exam:', exam, 'accessToken', accessToken);

        fetch('https://quiz-app-nodejs.onrender.com/v1/exam/', {
            method: 'POST',
            headers: {
                // 'Content-Type': 'multipart/form-data',
                // 'Content-Type': 'application/json',
                x_authorization: accessToken,
            },
            body: formData,
            // body: JSON.stringify(exam),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    toast.success('Tạo thành công!');
                    navigate('/createQuestion');
                } else toast.error(data.message);
                console.log(data);
            })
            .catch((error) => {
                // Xử lý lỗi trong quá trình gửi yêu cầu
                console.log(error);
            });
    };
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
                <input
                    type="text"
                    placeholder="Nhập mô tả"
                    className="title"
                    value={dec}
                    onChange={(e) => setDec(e.target.value)}
                />
                <div className="form-row">
                    <label className="form-label">Hình đại diện</label>
                    <input
                        type="file"
                        accept="image/*"
                        className="form-input"
                        onChange={(e) => handlePreviewAvatar(e)}
                    />
                    {avatar && <img src={URL.createObjectURL(avatar)} alt="" width="50%" className="flex mg-auto" />}
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
                    <label className="form-label">Thời gian làm bài kiểm tra (giây)</label>
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
                        onChange={(e) => setPublicQuestion(!publicQuestion)}
                    />
                </div>

                <button className="form-button" onClick={(e) => handleCreateExam(e)}>
                    Tạo
                </button>
            </div>
            {showQuestion && (
                <div className={cx('App')}>
                    {/* 1. Header  */}
                    <h1>{title || 'Bỏ trống'}</h1>

                    {/* 2. Current Score  */}
                    <h2>Thời gian:{timeQuestion} giây</h2>

                    {/* 3. Show results or show the question game  */}
                    <div className={cx('question-card')}>
                        {/* Current Question  */}
                        <h2>
                            Câu hỏi: {currentQuestion + 1} trên {questions.current.length}
                        </h2>
                        <input
                            type="text"
                            className={cx('question-text', 'color-black')}
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
                        <button className={cx('btn-exam', 'btn-save')} onClick={() => handleSaveQuestion()}>
                            Lưu
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Question;
