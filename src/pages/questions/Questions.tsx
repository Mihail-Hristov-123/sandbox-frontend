import { QuestionCard } from './components/QuestionCard';
import { QuestionForm } from './components/QuestionForm';
import { Loader } from '@/components/Loader';
import { useLoadQuestions } from './hooks/useLoadQuestions';

export const Questions = () => {
    const { allQuestions, isLoadingQuestions, loadQuestions } =
        useLoadQuestions();

    const questionsContent = isLoadingQuestions ? (
        <Loader />
    ) : allQuestions?.length ? (
        allQuestions.map((question) => (
            <QuestionCard key={question.title} {...question} />
        ))
    ) : (
        <p className="text-center text-xl">
            No questions are available right now
        </p>
    );

    return (
        <main>
            <div className="max-w-[60vw] mx-auto max-lg:max-w-[80vw]">
                <QuestionForm refreshQuestions={loadQuestions} />
                <h1 className=" py-16">Latest questions</h1>

                <section className="flex flex-col gap-12">
                    {questionsContent}
                </section>
            </div>
        </main>
    );
};
