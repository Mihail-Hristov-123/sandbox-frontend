import { useState } from 'react';
import { QuestionCard } from '../components/QuestionCard';

export interface Question {
    author: string;
    title: string;
    description: string;
}

export const QuestionsAndAnswers = () => {
    const [questions, setQuestions] = useState<Question[]>([
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
        <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-[60vw] mx-auto">
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
