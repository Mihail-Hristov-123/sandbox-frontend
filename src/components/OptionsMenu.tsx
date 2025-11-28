import optionsSvg from '@/assets/options.svg';

export const OptionsMenu = () => {
    const handleDeletion = () => {
        if (window.confirm('Do you really want to delete this publication?')) {
            console.log('Deleted');
        }
    };

    return (
        <div className="group relative">
            <img src={optionsSvg} className="w-6" alt="Options icon" />
            <section className="hidden group-hover:flex flex-col bg-white absolute top-6 w-fit px-4 rounded-small">
                <button className="w-full" onClick={handleDeletion}>
                    Delete
                </button>
            </section>
        </div>
    );
};
