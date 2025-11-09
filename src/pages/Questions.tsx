import { useState } from 'react';
import { QuestionCard } from '../components/cards/QuestionCard';
import { QuestionForm } from '../components/formRelated/QuestionForm';
import { AddButton } from '../components/AddButton';
import { Modal } from '../components/Modal';
import { useQuestionService } from '../hooks/useQuestionService';

export const Questions = () => {
    const { allQuestions } = useQuestionService();

    const [formOpen, setFormOpen] = useState(false);

    return (
        <main>
            <div className="max-w-[60vw] mx-auto">
                <h1>Latest questions</h1>

                <section className="flex flex-col gap-12">
                    {allQuestions ? (
                        allQuestions.length ? (
                            allQuestions.map((question) => (
                                <QuestionCard
                                    key={question.title}
                                    {...question}
                                    authorName={question.authorName}
                                />
                            ))
                        ) : (
                            <p className="text-center text-xl">
                                No questions are available right now
                            </p>
                        )
                    ) : null}
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
