import React, { useRef, useState } from 'react';
import styles from './Exam.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Exam() {
    // Properties
    const [showResults, setShowResults] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);

    const questions = [
        {
            text: 'What is the capital of America?',
            options: [
                { id: 0, text: 'New York City', isCorrect: false },
                { id: 1, text: 'Boston', isCorrect: false },
                { id: 2, text: 'Santa Fe', isCorrect: false },
                { id: 3, text: 'Washington DC', isCorrect: true },
            ],
        },
        {
            text: 'What year was the Constitution of America written?',
            options: [
                { id: 0, text: '1787', isCorrect: true },
                { id: 1, text: '1776', isCorrect: false },
                { id: 2, text: '1774', isCorrect: false },
                { id: 3, text: '1826', isCorrect: false },
            ],
        },
        {
            text: 'Who was the second president of the US?',
            options: [
                { id: 0, text: 'John Adams', isCorrect: true },
                { id: 1, text: 'Paul Revere', isCorrect: false },
                { id: 2, text: 'Thomas Jefferson', isCorrect: false },
                { id: 3, text: 'Benjamin Franklin', isCorrect: false },
            ],
        },
        {
            text: 'What is the largest state in the US?',
            options: [
                { id: 0, text: 'California', isCorrect: false },
                { id: 1, text: 'Alaska', isCorrect: true },
                { id: 2, text: 'Texas', isCorrect: false },
                { id: 3, text: 'Montana', isCorrect: false },
            ],
        },
        {
            text: 'Which of the following countries DO NOT border the US?',
            options: [
                { id: 0, text: 'Canada', isCorrect: false },
                { id: 1, text: 'Russia', isCorrect: true },
                { id: 2, text: 'Cuba', isCorrect: true },
                { id: 3, text: 'Mexico', isCorrect: false },
            ],
        },
    ];

    const answers = useRef([]);

    // Helper Functions

    /* A possible answer was clicked */
    const optionClicked = (isCorrect, idanswer) => {
        // Increment the score
        if (isCorrect) {
            setScore(score + 1);
        }
        answers.current[currentQuestion] = idanswer;
        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowResults(true);
        }
    };

    const previousQuestion = () => {
        if (currentQuestion !== 0) setCurrentQuestion(currentQuestion - 1);
    };
    const nextQuestion = () => {
        if (currentQuestion + 1 < questions.length) setCurrentQuestion(currentQuestion + 1);
    };
    /* Resets the game back to default */
    const restartGame = () => {
        setScore(0);
        setCurrentQuestion(0);
        setShowResults(false);
    };

    return (
        <div className={cx('App')}>
            {/* 1. Header  */}
            <h1>Thi toán</h1>

            {/* 2. Current Score  */}
            <h2>Thời gian:</h2>

            {/* 3. Show results or show the question game  */}
            {showResults ? (
                /* 4. Final Results */
                <div className={cx('final-results')}>
                    <h1>Bạn đã hoàn thành bài thi</h1>
                    <h2>
                        {score} out of {questions.length} correct - ({(score / questions.length) * 100}%)
                    </h2>
                    <button onClick={() => restartGame()}>Quay trở về</button>
                </div>
            ) : (
                /* 5. Question Card  */
                <div className={cx('question-card')}>
                    {/* Current Question  */}
                    <h2>
                        Question: {currentQuestion + 1} trong {questions.length}
                    </h2>
                    <h3 className={cx('question-text')}>{questions[currentQuestion].text}</h3>

                    {/* List of possible answers  */}
                    <ul>
                        {questions[currentQuestion].options.map((option) => {
                            return (
                                <li
                                    key={option.id}
                                    onClick={() => optionClicked(option.isCorrect, option.id)}
                                    className={cx(answers.current[currentQuestion] === option.id ? 'bg-answer' : '')}
                                >
                                    {option.text}
                                </li>
                            );
                        })}
                    </ul>
                    <div className="list-button">
                        <button className={cx('btn-exam')} onClick={() => previousQuestion()}>
                            Câu trước
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
