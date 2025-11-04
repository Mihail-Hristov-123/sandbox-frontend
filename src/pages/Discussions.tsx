import { useState } from 'react';
import { AuthorField } from '../components/AuthorField';
import { CommentForm } from '../components/CommentForm';

interface Answer {
    author: string;
    content: string;
}

export interface Question {
    author: string;
    title: string;
    description: string;
    answers: Answer[];
}

export const QuestionsAndAnswers = () => {
    const [questions, setQuestions] = useState<Question[]>([
        {
            author: 'Fred',
            title: 'How do I tie a hook?',
            description:
                'I am new to fishing, how do I tie my hook to the line? Is there any specific knot that you would recommend?',
            answers: [
                {
                    author: 'Josh123',
                    content:
                        'Check out the Palomar knot – it’s easy to tie once you get the hang of it and holds really well!',
                },
            ],
        },
    ]);

    return (
        <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-10 text-center">
                    Questions & Answers
                </h1>

                <section className="space-y-8">
                    {questions.map(
                        ({ author, title, description, answers }, index) => (
                            <div
                                key={index}
                                className="bg-white shadow-sm rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow"
                            >
                                <article className="cursor-pointer">
                                    <AuthorField name={author} />

                                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                                        {title}
                                    </h2>

                                    <p className="text-gray-700 leading-relaxed mb-4">
                                        {description}
                                    </p>

                                    {/* {answers.length > 0 && (
                                    <section className="mt-6 border-t border-gray-100 pt-4">
                                        <h3 className="text-lg font-medium text-gray-800 mb-3">
                                            Answers
                                        </h3>
                                        <div className="space-y-4">
                                            {answers.map(
                                                ({ author, content }, i) => (
                                                    <div
                                                        key={i}
                                                        className="bg-gray-50 p-4 rounded-md border border-gray-200"
                                                    >
                                                        <AuthorField
                                                            name={author}
                                                        />
                                                        <p className="text-gray-700 mb-2">
                                                            {content}
                                                        </p>
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    </section>
                                )} */}
                                </article>
                                <CommentForm />
                            </div>
                        ),
                    )}
                </section>
            </div>
        </main>
    );
};
