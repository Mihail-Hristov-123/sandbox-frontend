export const Home = () => {
    return (
        <main className="min-h-[130vh]">
            <section className=" bg-cover  bg-fixed h-[70vh] bg-[url('/landing-background.jpg')]">
                <div className="backdrop-brightness-68 size-full flex flex-col justify-center text-white text-center ">
                    <h1 className="text-white text-5xl font-extrabold">
                        Let's go fishing
                    </h1>
                    <h2 className="text-2xl">
                        Find the best spots and tips for your next fishing
                        adventure
                    </h2>
                </div>
            </section>
        </main>
    );
};
