import { useState } from 'react';
import { QuestionCard } from '../components/cards/QuestionCard';
import { QuestionForm } from '../components/formRelated/QuestionForm';
import { AddButton } from '../components/AddButton';
import { Modal } from '../components/Modal';
import { useQuestions } from '../hooks/useQuestions';

export const Questions = () => {
    const { allQuestions, createQuestion } = useQuestions();

    const [formOpen, setFormOpen] = useState(false);

    return (
        <main>
            <div className="max-w-[60vw] mx-auto max-lg:max-w-[80vw]">
                <h1>Latest questions</h1>

                <section className="flex flex-col gap-12">
                    {allQuestions ? (
                        allQuestions.length ? (
                            allQuestions.map((question) => (
                                <QuestionCard
                                    key={question.title}
                                    {...question}
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
                    <QuestionForm
                        createQuestion={createQuestion}
                        closeModal={() => setFormOpen(false)}
                    />
                </Modal>
            ) : (
                <AddButton onClick={() => setFormOpen(true)} />
            )}
        </main>
    );
};
