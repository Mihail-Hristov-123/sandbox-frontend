import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import profilePicPlaceholder from '@/assets/user.png';

import { useAuthContext } from '@/contexts/auth/useAuthContext';
import { NavLink } from 'react-router';
import { CLIENT_ROUTES } from '@/routes';

import {
    AnswerSchema,
    type AnswerValues,
} from '@/schemas/questions/AnswerSchema';
import { ErrorMessage } from '@/components/formRelated/ErrorMessage';
import { useCreateAnswer } from '../hooks/useCreateAnswer';

export const AnswerForm = ({
    questionId,
    updateAnswers,
}: {
    questionId: number;
    updateAnswers: () => Promise<void>;
}) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ resolver: zodResolver(AnswerSchema) });

    const { isLoggedIn } = useAuthContext();
    const { createAnswer } = useCreateAnswer(questionId);
    const errorMessage = errors.content?.message;
    const onSubmit = async (data: AnswerValues) => {
        const result = await createAnswer(data);
        if (result.success) {
            reset();
            await updateAnswers();
        }
    };

    return (
        <div>
            {isLoggedIn ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex w-full gap-6 justify-around h-fit">
                        <img
                            src={profilePicPlaceholder}
                            className="size-13"
                            alt="Your profile picture"
                        />
                        <textarea
                            {...register('content')}
                            placeholder="Your answer"
                            className=" grow p-2 border border-primary rounded-small max-h-[30vh] h-13 min-h-13"
                        />
                        <input type="submit" className="h-fit text-lg" />
                    </div>

                    <ErrorMessage
                        errorMessage={errorMessage}
                        className="text-center py-4"
                    />
                </form>
            ) : (
                <p className="text-center py-4 px-12 text-xl">
                    <NavLink to={CLIENT_ROUTES.LOG_IN}>Log in</NavLink> to
                    answer the question
                </p>
            )}
        </div>
    );
};
