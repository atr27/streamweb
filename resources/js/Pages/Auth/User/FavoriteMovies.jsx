import AuthenticatedLayout from '@/Layouts/Authenticated/Index';
import { Head } from '@inertiajs/react';
import CardMovie from '@/Components/CardMovie';

export default function FavoriteMovies({ auth, favorites, activePlan }) {
    return (
        <AuthenticatedLayout
            auth={auth}
        >
            <Head title="Your Favorite Movies" />
            
            <div className="py-2">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h1 className="text-2xl font-semibold mb-6">Film Favorit Anda</h1>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {favorites.length > 0 ? (
                                    favorites.map((favorite) => (
                                        <CardMovie
                                            key={favorite.id}
                                            slug={favorite.movie.slug}
                                            id={favorite.movie.id}
                                            name={favorite.movie.title}
                                            thumbnail={favorite.movie.thumbnail}
                                            category={favorite.movie.genre}
                                            rating={favorite.movie.rating}
                                        />
                                    ))
                                ) : (
                                    <div className="col-span-full text-center py-10">
                                        <p className="text-gray-500">Anda belum memiliki film favorit</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}