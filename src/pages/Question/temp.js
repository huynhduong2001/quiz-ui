import React, { useEffect, useState } from 'react';
import './Question.css';
const Question = () => {
    const [title, setTitle] = useState('');
    const [avatar, setAvatar] = useState();
    const [numberQuestion, setNumberQuestion] = useState(0);
    const [timeQuestion, setTimeQuestion] = useState(0);
    const [publicQuestion, setPublicQuestion] = useState(false);

    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');

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
        console.log('createExam', title, avatar, numberQuestion, timeQuestion, publicQuestion);
    };
    // Hàm xử lý thay đổi câu trả lời
    const handleSelectedAnswerChange = (event) => {
        setSelectedAnswer(event.target.value);
    };

    // Hàm xử lý gửi câu trả lời
    const handleSubmitAnswer = (event) => {
        event.preventDefault();
        const updatedQuestions = [...questions];
        updatedQuestions[currentQuestion].selectedAnswer = selectedAnswer;
        setQuestions(updatedQuestions);
        setSelectedAnswer('');

        // Chuyển sang câu hỏi tiếp theo
        if (currentQuestion < updatedQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    // Hàm xử lý gửi bài thi
    const handleSubmitExam = (event) => {
        event.preventDefault();
        console.log('Submitted exam:', questions);
        // Thực hiện xử lý bài thi ở đây
        // Ví dụ: Gửi bài thi lên máy chủ hoặc thực hiện hành động nào đó với bài thi
    };

    // Hàm xử lý thêm câu hỏi và đáp án vào bộ đề
    const handleAddQuestion = () => {
        const updatedQuestions = [...questions];
        updatedQuestions.push({ question: '', answer: '', selectedAnswer: '' });
        setQuestions(updatedQuestions);
    };

    // Hàm xử lý thay đổi câu hỏi
    const handleQuestionChange = (event, index) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].question = event.target.value;
        setQuestions(updatedQuestions);
    };

    // Hàm xử lý thay đổi đáp án
    const handleAnswerChange = (event, index) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].answer = event.target.value;
        setQuestions(updatedQuestions);
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
                <div className="form-row">
                    <label className="form-label">Hình đại diện</label>
                    <input type="file" className="form-input" onChange={(e) => handlePreviewAvatar(e)} />
                    {avatar && <img src={avatar.preview} alt="" width="80%" />}
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
                <div className="form-row">
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
            <form className="exam-form" onSubmit={handleSubmitExam}>
                {questions.map((q, index) => (
                    <div className="question-container" key={index}>
                        <h3 className="question-heading">Question {index + 1}</h3>
                        <label className="question-label">
                            Question:
                            <input
                                className="question-input"
                                type="text"
                                value={q.question}
                                onChange={(event) => handleQuestionChange(event, index)}
                            />
                        </label>
                        <br />
                        <label className="answer-label">
                            Answer:
                            <input
                                className="answer-input"
                                type="text"
                                value={q.answer}
                                onChange={(event) => handleAnswerChange(event, index)}
                            />
                        </label>
                        <br />
                        {index === currentQuestion && (
                            <div>
                                <label className="selected-answer-label">
                                    Selected Answer:
                                    <input
                                        className="selected-answer-input"
                                        type="text"
                                        value={selectedAnswer}
                                        onChange={handleSelectedAnswerChange}
                                    />
                                </label>
                                <br />
                                <button className="submit-answer-button" type="button" onClick={handleSubmitAnswer}>
                                    Submit Answer
                                </button>
                            </div>
                        )}
                        <hr className="question-separator" />
                    </div>
                ))}
                {/* Các nút và hàm xử lý khác... */}
            </form>
        </div>
    );
};

export default Question;
