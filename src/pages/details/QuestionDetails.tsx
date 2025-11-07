import { Link, useParams } from 'react-router';
import { useQuestionService } from '../../hooks/useQuestionService';
import { clientRoutes } from '../../routes';
import { AuthorField } from '../../components/AuthorField';

export const QuestionDetails = () => {
    const { questionId } = useParams();

    const { allQuestions } = useQuestionService();

    // will be changed, as this section will also show previous answers etc.. This page is just a placeholder currently
    const currentQuestion = allQuestions?.find(
        (question) => question.id == Number(questionId),
    );

    if (!currentQuestion) {
        return (
            <main className="text-center">
                <h1>This question doesn't exist</h1>{' '}
                <p>
                    Go back to{' '}
                    <Link to={clientRoutes.QUESTIONS}>questions page</Link>
                </p>
            </main>
        );
    }

    return (
        <main>
            <h1>Question details</h1>
            <section className="px-40 py-12 border border-secondary shadow-xl space-y-6 ">
                <AuthorField name={currentQuestion.authorName} />

                <h2 className="text-3xl font-bold">{currentQuestion.title}</h2>

                <p className="text-lg ">{currentQuestion.description}</p>
            </section>
        </main>
    );
};
