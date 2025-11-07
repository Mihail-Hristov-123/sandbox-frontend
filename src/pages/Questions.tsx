import { useState } from 'react';
import { QuestionCard } from '../components/QuestionCard';
import { QuestionForm } from '../components/formRelated/QuestionForm';
import type { QuestionValues } from '../schemas/questions/QuestionSchema';
import { AddButton } from '../components/AddButton';
import { Modal } from '../components/Modal';

export type Question = QuestionValues & {
    author: string;
};

export const Questions = () => {
    const [questions, _setQuestions] = useState<Question[]>([
        {
            author: 'Fred',
            title: 'How do I tie a hook?',
            description:
                'I am new to fishing, how do I tie my hook to the line? Is there any specific knot that you would recommend?',
        },
        {
            author: 'JuanPike',
            title: 'How do I unhook a fish?',
            description: 'What is the preferred way to unhook a predator fish?',
        },
    ]);

    const [formOpen, setFormOpen] = useState(false);

    return (
        <main>
            <div className="max-w-[60vw] mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 my-10">
                    Latest questions
                </h1>

                <section className="flex flex-col gap-6">
                    {questions.map((question) => (
                        <QuestionCard key={question.title} {...question} />
                    ))}
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
