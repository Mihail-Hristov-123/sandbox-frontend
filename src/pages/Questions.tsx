import { useState } from 'react';
import { QuestionCard } from '../components/QuestionCard';
import { QuestionForm } from '../components/formRelated/QuestionForm';
import type { QuestionValues } from '../schemas/questions/QuestionSchema';
import { AddButton } from '../components/AddButton';
import { Modal } from '../components/Modal';
import { useQuestionService } from '../hooks/useQuestionService';

export type Question = QuestionValues & {
    author: string;
};

export const Questions = () => {
    const { allQuestions } = useQuestionService();

    const [formOpen, setFormOpen] = useState(false);

    return (
        <main>
            <div className="max-w-[60vw] mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 my-10">
                    Latest questions
                </h1>

                <section className="flex flex-col gap-12">
                    {allQuestions ? (
                        allQuestions.map((question) => (
                            <QuestionCard
                                key={question.title}
                                {...question}
                                author={question.authorName}
                            />
                        ))
                    ) : (
                        <p className="text-center text-xl">
                            No questions are available right now
                        </p>
                    )}
                </section>
            </div>
            {formOpen ? (
                <Modal isOpened={true} close={() => setFormOpen(false)}>
                    <QuestionForm closeModal={() => setFormOpen(false)} />
                </Modal>
            ) : (
                <AddButton onClick={() => setFormOpen(true)} />
            )}
        </main>
    );
};
