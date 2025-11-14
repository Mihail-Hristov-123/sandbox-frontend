import { QuestionCard } from '../components/cards/QuestionCard';

import { useQuestions } from '../hooks/useQuestions';
import { QuestionForm } from '../components/formRelated/QuestionForm';
import { Loader } from '../components/Loader';
import { useEffect, useState } from 'react';
import type { QuestionReturnValue } from '../schemas/questions/QuestionSchema';

export const Questions = () => {
    const {
        allQuestions,
        createQuestion,
        updateQuestions,
        isLoadingQuestions,
    } = useQuestions();

    return (
        <main>
            <div className="max-w-[60vw] mx-auto max-lg:max-w-[80vw]">
                <QuestionForm
                    createQuestion={createQuestion}
                    updateQuestions={updateQuestions}
                />
                <h1 className=" pt-28 pb-12">Latest questions</h1>

                <section className="flex flex-col gap-12">
                    {isLoadingQuestions ? (
                        <Loader />
                    ) : allQuestions?.length ? (
                        allQuestions.map((question) => (
                            <QuestionCard key={question.title} {...question} />
                        ))
                    ) : (
                        <p className="text-center text-xl">
                            No questions are available right now
                        </p>
                    )}
                </section>
            </div>
        </main>
    );
};
