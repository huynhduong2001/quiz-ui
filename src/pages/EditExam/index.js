import React, { useEffect, useRef, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '~/pages/Exam/Exam.module.scss';
import styles2 from '~/pages/EditExam/EditExam.module.scss';
import '~/pages/Question/Question.css';
import { AuthContext } from '~/AuthContext';
import { toast } from 'react-toastify';

import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);
const cx2 = classNames.bind(styles2);
const EditExam = () => {
    const { accessToken } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const exam = useRef(location.state?.data);
    const [title, setTitle] = useState('');
    const [dec, setDec] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [urlFile, setUrlFile] = useState(null);
    const [numberQuestion, setNumberQuestion] = useState(0);
    const [timeQuestion, setTimeQuestion] = useState(0);
    const [publicQuestion, setPublicQuestion] = useState(false);

    const [showQuestion, setShowQuestion] = useState(false);
    const [error, setError] = useState('');

    // const [userId, setUserId] = useState();
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
    const [showModal, setShowModal] = useState(false);
    const openModal = () => {
        setShowModal(true);
    };

    // Hàm xử lý đóng modal
    const closeModal = () => {
        setShowModal(false);
    };

    //chuyen questions data có sẵn sang fomat mẫu
    function fomat_question(questions, correctAnswers) {
        const convertedQuestions = [];
        for (let i = 0; i < questions.length; i++) {
            const question = questions[i];
            const options = [];

            for (let j = 0; j < question.answers.length; j++) {
                const answer = question.answers[j];
                const isCorrect = correctAnswers[i] === j;
                options.push({
                    id: j,
                    text: answer,
                    isCorrect: isCorrect,
                });
            }

            const convertedQuestion = {
                text: question.questionText,
                options: options,
            };
            convertedQuestions.push(convertedQuestion);
        }
        return convertedQuestions;
    }
    function base64ToBlob(base64String) {
        const byteCharacters = atob(base64String);
        const byteArrays = [];
        const sliceSize = 1024;

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        const blob = new Blob(byteArrays, { type: 'image/png' });
        return new File([blob], 'avt.png', { type: 'image/png' });
    }
    function loadData() {
        setTitle(exam.current.name);
        setDec(exam.current.description);
        setUrlFile(exam.current.image);
        setNumberQuestion(exam.current.questions.length);
        setTimeQuestion(exam.current.totalTime);
        setPublicQuestion(exam.current.isPublic);
        questions.current = fomat_question(exam.current.questions, exam.current.correctAnswers);
        setTempNameQuestion(questions.current[currentQuestion].text);
        setTempOptionsAnswer(questions.current[currentQuestion].options);
        setShowQuestion(true);
    }
    useEffect(() => {
        loadData();
    }, []);
    useEffect(() => {
        //cleans up
        return () => {
            avatar && URL.revokeObjectURL(avatar);
        };
    }, [avatar]);
    const handlePreviewAvatar = (e) => {
        // console.log(avatar);
        const file = e.target.files[0];
        setAvatar(file);
        // setUrlFile(URL.createObjectURL(file));
        const reader = new FileReader();

        reader.onloadend = () => {
            const base64String = reader.result;
            // Xử lý chuỗi base64String ở đây (gửi lên API, hiển thị lên giao diện, v.v.)

            // cắt data:image/jpeg;base64,
            setUrlFile(base64String.substring(23));
            console.log(base64String);
        };

        reader.readAsDataURL(file);
    };

    const handleCreateExam = (e) => {
        e.preventDefault(e);
        if (title.trim() === '') {
            setError('Vui lòng nhập tiêu đề');
            return;
        }
        if (dec.trim() === '') {
            setError('Vui lòng nhập mô tả');
            return;
        }
        if (avatar === null) {
            setError('Vui lòng thêm hình ảnh');
            return;
        }
        if (numberQuestion <= 0) {
            setError('Vui lòng xem lại số lượng câu hỏi');
            return;
        }
        if (timeQuestion <= 0) {
            setError('Vui lòng xem lại thời gian làm bài');
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
        setError('');
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
    const handleSaveQuestion = async () => {
        const isNull = checkNullQuestions();
        if (isNull) {
            toast.error('Không được bỏ trống!');
            return;
        }
        const fomatquestions = questions.current.map((question) => ({
            questionText: question.text,
            answers: question.options.map((option) => option.text),
        }));
        const updateQuestion = () => {
            const temp = exam.current.questions;
            for (let i = 0; i < fomatquestions.length; i++) {
                temp[i].questionText = fomatquestions[i].questionText;
                temp[i].answers = fomatquestions[i].answers;
            }
            return temp;
        };

        const fomatAnswer = questions.current.map((question) =>
            question.options.findIndex((option) => option.isCorrect),
        );

        const updatedQuestions = updateQuestion();

        const formData = new FormData();
        formData.append('image', !avatar ? base64ToBlob(urlFile) : avatar);
        formData.append('totalTime', timeQuestion);
        formData.append('description', dec);
        formData.append('questions', JSON.stringify(updatedQuestions));
        formData.append('correctAnswers', JSON.stringify(fomatAnswer));
        formData.append('isPublic', publicQuestion);
        formData.append('name', title);

        try {
            const id = exam.current._id;
            const url = `https://quiz-app-nodejs.onrender.com/v1/exam/${id}`;
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    // content_type: 'multipart/form-data; boundary=<calculated when request is sent>',
                    x_authorization: accessToken,
                },
                body: formData,
            });
            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    toast.success('Cập nhập thành công!');
                    navigate('/createQuestion');
                } else toast.error('Lưu thất bại');
            }
        } catch (error) {
            console.error('error = ', error);
        }
    };
    const handleDeleteExam = () => {
        const id = exam.current._id;
        console.log(id, accessToken);
        const url = 'https://quiz-app-nodejs.onrender.com/v1/exam/' + id;
        fetch(url, {
            method: 'DELETE',
            headers: {
                x_authorization: accessToken,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    navigate('/createQuestion');
                    toast.success('Xóa thành công!');
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
            <button className={cx2('form-button', 'btn-delete')} onClick={openModal}>
                Xóa
            </button>
            <h1 className="exam-title">Sửa đề thi</h1>
            <div className="form-container">
                {error && <p className={cx('error-message')}>{error}</p>}
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
                    {urlFile && (
                        <img
                            src={`data:image/jpeg;base64,${urlFile}`}
                            alt="Image"
                            width="50%"
                            className="flex mg-auto"
                        />
                    )}
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

                <button disabled className="form-button bg-light-1" onClick={(e) => handleCreateExam(e)}>
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
                            Cập nhật
                        </button>
                    </div>
                </div>
            )}
            {showModal && (
                <div className={cx2('modal')}>
                    <div className={cx2('modal-content')}>
                        {/* Nội dung của modal */}
                        <h2>Xóa đề thi</h2>
                        <p>Bạn có thật sự muốn xóa đề thi?</p>
                        <div className="list-button">
                            <button className={cx2('bg-red')} onClick={() => handleDeleteExam()}>
                                Xóa
                            </button>
                            <button onClick={closeModal}>Đóng</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditExam;
