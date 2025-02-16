import Authenticated from "@/Layouts/Authenticated/Index";
import CardMovie from "@/Components/CardMovie";
import { Head } from "@inertiajs/react";

export default function Browse({ auth, movies, query }) {
    console.log('Movies received:', movies); // Debugging

    return (
        <Authenticated auth={auth} query={query}>
            <Head>
                <title>Browse</title>
            </Head>

            <div className="px-[52px] mt-[30px] text-white">
                <div className="text-2xl font-semibold mb-4">
                    {movies.length > 0 ? (
                        "Search Result"
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20">
                            <span>Film tidak ditemukan</span>
                            <span className="text-base text-gray-400 mt-2">
                                Coba cari dengan kata kunci lain
                            </span>
                        </div>
                    )}
                </div>
                {movies.length > 0 && (
                    <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
                        {movies.map((movie, index) => (
                            <CardMovie
                                key={movie.id}
                                slug={movie.slug}
                                name={movie.title}
                                category={movie.genre}
                                thumbnail={movie.thumbnail}
                            />
                        ))}
                    </div>
                )}
            </div>
        </Authenticated>
    );
}
