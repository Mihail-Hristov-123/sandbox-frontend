import { Link, useParams } from 'react-router';
import { CLIENT_ROUTES } from '@/routes';
import { AuthorField } from '@/components/AuthorField';
import { AnswerForm } from './components/AnswerForm';
import { useLoadQuestionDetails } from './hooks/useLoadQuestionDetails';
import { AnswerCard } from './components/AnswerCard';
import { Loader } from '@/components/Loader';
import { useCheckIsOwner } from '@/hooks/useCheckIsOwner';
import { DeleteButton } from '@/components/DeleteButton';
import { useDeleteResource } from '@/hooks/useDeleteResource';

export const QuestionDetails = () => {
    const { questionId } = useParams();

    const { updateCurrentQuestionData, currentQuestionData, isLoading } =
        useLoadQuestionDetails(questionId);

    if (isLoading) {
        return (
            <main className=" size-full grid place-items-center">
                <Loader />
            </main>
        );
    }
    if (!currentQuestionData) {
        return (
            <main className="text-center py-12">
                <h1>This question doesn't exist</h1>{' '}
                <p>
                    Go back to{' '}
                    <Link to={CLIENT_ROUTES.QUESTIONS}>questions page</Link>
                </p>
            </main>
        );
    }

    const { questionData, answersData } = currentQuestionData;
    const { deleteResource: deleteQuestion } = useDeleteResource(
        'question',
        questionData.id,
    );
    const { isOwner } = useCheckIsOwner(questionData.user_id);

    return (
        <main className=" sm:px-12 md:px-24 lg:px-40 pt-10">
            <section className="bg-white  shadow-2xl rounded-xl p-10 space-y-8">
                <div className="flex justify-between items-center">
                    <AuthorField
                        userId={questionData.user_id}
                        name={questionData.user_username}
                        profilePictureLink={questionData.profile_pic_url}
                    />
                    {isOwner && (
                        <DeleteButton deleteResource={deleteQuestion} />
                    )}
                </div>

                <h2 className="text-3xl font-bold ">{questionData.title}</h2>

                <p className=" text-lg">{questionData.description}</p>

                <AnswerForm
                    questionId={Number(questionId)}
                    updateAnswers={updateCurrentQuestionData}
                />
                <hr className="border-secondary my-6" />
                <div className="space-y-10">
                    <h3 className="text-2xl font-bold">
                        {answersData.length > 0 ? 'Answers' : 'No answers yet'}
                    </h3>

                    {answersData.map((props) => (
                        <AnswerCard key={props.id} {...props} />
                    ))}
                </div>
            </section>
        </main>
    );
};
