import { useForm } from 'react-hook-form';

import { LabelledInput } from './form/LabelledInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { QuestionSchema } from '../schemas/questions/QuestionSchema';
import { LabelledTextArea } from './form/LabelledTextArea';

export const QuestionForm = () => {
    const {
        register,
        formState: { errors },
    } = useForm({ resolver: zodResolver(QuestionSchema) });

    return (
        <form>
            <h1>Form</h1>
            <LabelledInput
                labelText="Question title:"
                errors={errors}
                register={register}
                name={'title'}
            />
            <LabelledTextArea
                labelText="Description:"
                errors={errors}
                register={register}
                name={'description'}
            />
            <input type="submit" />
        </form>
    );
};
