import { ErrorMessage } from './ErrorMessage';

interface Props {
    image: File | null;
    setImage: (image: File | null) => void;
    error: string | null;
    className?: string;
}

export const PictureInput = ({ image, setImage, error, className }: Props) => {
    if (image) {
        return (
            <div className="flex flex-col items-center gap-4 w-full">
                <img
                    src={URL.createObjectURL(image)}
                    alt="preview"
                    className="avatar w-2/3"
                />

                <button
                    type="button"
                    onClick={() => setImage(null)}
                    className="text-red-500 text-xl"
                >
                    Remove image
                </button>
            </div>
        );
    }

    return (
        <label className={`cursor-pointer w-full ${className}`}>
            <div className="h-36 rounded-small border-2 border-dashed border-gray-400 grid place-items-center gap-2 hover:border-primary hover:bg-gray-50 transition-colors">
                <span>Click to upload</span>
            </div>

            <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setImage(e.target.files?.[0] ?? null)}
            />
            <ErrorMessage errorMessage={error} className=" text-center pt-2" />
        </label>
    );
};
