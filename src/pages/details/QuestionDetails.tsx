import { Link, useParams } from 'react-router';

import { clientRoutes } from '../../routes';
import { AuthorField } from '../../components/AuthorField';
import { useEffect, useState } from 'react';

import { Modal } from '../../components/Modal';
import { AnswerForm } from '../../components/formRelated/AnswerForm';
import { useQuestionDetails } from '../../hooks/useQuestionDetails';
import { AnswerCard } from '../../components/cards/AnswerCard';

export const QuestionDetails = () => {
    const { questionId } = useParams();

    const { updateCurrentQuestionData, currentQuestionData, createAnswer } =
        useQuestionDetails();

    const [formOpen, setFormOpen] = useState(false);
    useEffect(() => {
        updateCurrentQuestionData(questionId);
    }, [questionId]);

    if (!currentQuestionData) {
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

    const { questionData, answersData } = currentQuestionData;
    return (
        <main className=" sm:px-12 md:px-24 lg:px-40">
            <h1>Question Details</h1>

            <section className="bg-white  shadow-2xl rounded-xl p-10 space-y-8">
                <div className="flex justify-between">
                    <AuthorField name={questionData.user_username} />
                    <button
                        className="bg-accent text-white p-3 rounded-small font-medium"
                        onClick={() => setFormOpen(true)}
                    >
                        Add your answer
                    </button>
                </div>

                <h2 className="text-3xl font-bold ">{questionData.title}</h2>

                <p className=" text-lg">{questionData.description}</p>

                <hr className="border-secondary my-6" />

                <div className="space-y-6">
                    <h3 className="text-2xl font-bold">
                        {answersData.length > 0 ? 'Answers' : 'No answers yet'}
                    </h3>

                    {answersData.map(({ id, content, user_username }) => (
                        <AnswerCard
                            key={id}
                            content={content}
                            username={user_username}
                        />
                    ))}
                </div>
            </section>
            <Modal isOpened={formOpen} close={() => setFormOpen(false)}>
                <AnswerForm
                    closeModal={() => setFormOpen(false)}
                    createAnswer={createAnswer}
                    questionId={Number(questionId)}
                />
            </Modal>
        </main>
    );
};
