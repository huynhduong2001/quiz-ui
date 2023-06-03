import styles from './CreateQuestion.module.scss';
import styles2 from '../Join/Join.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
const cx2 = classNames.bind(styles2);
function CreateQuestion() {
    return (
        <div className="">
            <div className="mg-20">
                <a className={cx('btn-save', 'btn-create')} href="/question">
                    <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                    Tạo đề thi
                </a>
            </div>
            <div className={cx2('featured-section-quizzzes')}>
                <div className={cx2('solo-quiz-container', 'text-unselectable')}>
                    <div className={cx2('solo-quizzes')}>
                        <button
                            aria-label="Quiz Information Card"
                            type="button"
                            className={cx2('solo-quiz', 'max-in-row-2', 'max-in-row-3', 'max-in-row-4', 'max-in-row-5')}
                            data-cy="solo-quiz-0"
                        >
                            <div className={cx2('curved-edge-container', 'media-dimensions', 'media-wrapper')}>
                                <div className={cx2('curve')}>
                                    <div className={cx2('content-container')}>
                                        <img
                                            className={cx2('media-dimensions', 'media')}
                                            aria-label="Quiz thumbnail"
                                            src="https://media.quizizz.com/_mdserver/main/media/resource/gs/quizizz-media/quizzes/d4b5f497-d247-412f-8640-15de5e285c00-v2?w=200&amp;h=200"
                                        ></img>
                                    </div>
                                </div>
                            </div>

                            <p className={cx2('quiz-name')}>Ôn Toán Giữa Kì 2</p>
                        </button>
                        <button
                            aria-label="Quiz Information Card"
                            type="button"
                            className={cx2('solo-quiz', 'max-in-row-2', 'max-in-row-3', 'max-in-row-4', 'max-in-row-5')}
                            data-cy="solo-quiz-1"
                        >
                            <div className={cx2('curved-edge-container', 'media-dimensions', 'media-wrapper')}>
                                <div className={cx2('curve')}>
                                    <div className={cx2('content-container')}>
                                        <img
                                            className={cx2('media-dimensions', 'media')}
                                            aria-label="Quiz thumbnail"
                                            src="https://media.quizizz.com/_mdserver/main/media/resource/gs/quizizz-media/quizzes/06664d85-294b-4f22-9d24-1d3829484b87-v2?w=200&amp;h=200"
                                        ></img>
                                    </div>
                                </div>
                            </div>

                            <p className={cx2('quiz-name')}>ÔN TRẮC NGHIỆM TOÁN 7 KỲ 2</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateQuestion;
