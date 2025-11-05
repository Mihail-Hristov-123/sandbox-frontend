import { useState } from 'react';
import { QuestionCard } from '../components/QuestionCard';
import { QuestionForm } from '../components/formRelated/QuestionForm';
import type { QuestionValues } from '../schemas/questions/QuestionSchema';

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

    return (
        <main className="min-h-screen bg-gray-50  ">
            <QuestionForm />
            <div className="max-w-[60vw] py-10 mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-10 text-center">
                    Latest questions
                </h1>

                <section className="flex flex-col gap-6 ">
                    {questions.map((question) => (
                        <QuestionCard key={question.title} {...question} />
                    ))}
                </section>
            </div>
        </main>
    );
};
