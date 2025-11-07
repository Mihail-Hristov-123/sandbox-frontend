import { useForm } from 'react-hook-form';
import { LabelledInput } from './LabelledInput';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    QuestionSchema,
    type QuestionValues,
} from '../../schemas/questions/QuestionSchema';
import { LabelledTextArea } from './LabelledTextArea';
import { useAuthContext } from '../../contexts/auth/useAuthContext';
import { NavLink } from 'react-router';
import { clientRoutes } from '../../routes';
import { useQuestionService } from '../../hooks/useQuestionService';

export const QuestionForm = ({ closeModal }: { closeModal: () => void }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ resolver: zodResolver(QuestionSchema) });

    const { isLoggedIn } = useAuthContext();
    const { createQuestion } = useQuestionService();

    const onSubmit = async (data: QuestionValues) => {
        await createQuestion(data, () => {
            reset();
            closeModal();
        });
    };

    return (
        <div>
            {isLoggedIn ? (
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-12 min-w-[40vw]"
                >
                    <h2 className="text-center text-3xl">Ask a question</h2>
                    <div className=" px-14 space-y-12">
                        <LabelledInput
                            labelText="Question title:"
                            errors={errors}
                            register={register}
                            name="title"
                        />

                        <LabelledTextArea
                            labelText="Description:"
                            errors={errors}
                            register={register}
                            name="description"
                        />
                    </div>
                    <input type="submit" />
                </form>
            ) : (
                <p className="text-center py-4 px-12 text-xl">
                    <NavLink to={clientRoutes.LOG_IN}>Log in</NavLink> to access
                    this feature.
                </p>
            )}
        </div>
    );
};
