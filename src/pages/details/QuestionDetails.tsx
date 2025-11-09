import { Link, useParams } from 'react-router';
import { useQuestionService } from '../../hooks/useQuestionService';
import { clientRoutes } from '../../routes';
import { AuthorField } from '../../components/AuthorField';
import { useEffect, useState } from 'react';
import { AnswerCard } from '../../components/cards/AnswerCard';
import { Modal } from '../../components/Modal';
import { AnswerForm } from '../../components/formRelated/AnswerForm';

export const QuestionDetails = () => {
    const { questionId } = useParams();

    const { updateCurrentQuestion, currentQuestion, createAnswer } =
        useQuestionService();

    const [formOpen, setFormOpen] = useState(false);
    useEffect(() => {
        updateCurrentQuestion(Number(questionId));
    }, [questionId]);

    if (!currentQuestion) {
        return (
            <main className="text-center">
                <h1>This question doesn't exist</h1>{' '}
                <p>
                    Go back to{' '}
                    <Link to={clientRoutes.QUESTIONS}>questions page</Link>
                </p>
            </main>
        );
    }

    const { questionData, answersData } = currentQuestion;
    return (
        <main className=" sm:px-12 md:px-24 lg:px-40">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-10 text-center">
                Question Details
            </h1>

            <section className="bg-white border border-gray-200 shadow-xl rounded-xl p-10 space-y-8">
                <div className=" flex justify-between">
                    <h2 className="text-3xl font-semibold text-gray-900">
                        {questionData.title}
                    </h2>
                    <button
                        className="bg-accent text-white p-3 rounded-small font-medium"
                        onClick={() => setFormOpen(true)}
                    >
                        Write an answer
                    </button>
                </div>
                <AuthorField name={questionData.authorName} />

                <p className="text-lg text-gray-700 leading-relaxed">
                    {questionData.description}
                </p>

                <hr className="border-gray-200 my-6" />

                <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-800">
                        {answersData.length > 0 ? 'Answers' : 'No answers yet'}
                    </h3>

                    {answersData.map((answer) => (
                        <AnswerCard key={answer.id} {...answer} />
                    ))}
                </div>
            </section>
            <Modal isOpened={formOpen} close={() => setFormOpen(false)}>
                <AnswerForm
                    closeModal={() => setFormOpen(false)}
                    questionId={Number(questionId)}
                    createAnswer={createAnswer}
                />
            </Modal>
        </main>
    );
};
