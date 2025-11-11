import { QuestionCard } from '../components/cards/QuestionCard';

import { useQuestions } from '../hooks/useQuestions';
import { QuestionForm } from '../components/formRelated/QuestionForm';

export const Questions = () => {
    const { allQuestions, createQuestion } = useQuestions();

    return (
        <main>
            <div className="max-w-[60vw] mx-auto max-lg:max-w-[80vw]">
                <QuestionForm createQuestion={createQuestion} />
                <h1 className=" pt-28 pb-12">Latest questions</h1>

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
        </main>
    );
};
