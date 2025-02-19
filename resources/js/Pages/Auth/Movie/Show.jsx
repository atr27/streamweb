import ReactPlayer from "react-player";
import { Link, router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Show({ movie }) {
    const [isLoading, setIsLoading] = useState(false);
    const [isFavorited, setIsFavorited] = useState(false);

    useEffect(() => {
        // Cek status favorit saat komponen dimuat
        checkFavoriteStatus();
    }, []);

    const showNotification = (message, type = 'success') => {
        toast[type](message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    };

    const checkFavoriteStatus = () => {
        axios.get(route('user.favorites.check'), {
            params: {
                movie_id: movie.id
            }
        })
        .then(response => {
            setIsFavorited(response.data.is_favorited);
        })
        .catch(error => {
            console.error('Error checking favorite status:', error);
            showNotification('Gagal memeriksa status favorit', 'error');
        });
    };

    const handleFavoriteToggle = (movieId) => {
        setIsLoading(true);
        axios.post(route('user.favorites.store'), {
            movie_id: movieId
        })
        .then(response => {
            setIsLoading(false);
            setIsFavorited(response.data.is_favorited);
            showNotification(response.data.message);
        })
        .catch(error => {
            setIsLoading(false);
            showNotification(error.response?.data?.message || 'Terjadi kesalahan', 'error');
        });
    };

    return (
        <>
            <section
                className="watching-page relative mx-auto w-screen h-screen font-poppins bg-form-bg overflow-hidden"
                id="stream"
            >
                {/* Back to dashboard button - pindahkan ke atas video untuk mobile */}
                <div className="absolute left-3 top-3 z-20 md:left-5 md:top-5">
                    <Link href={route("user.dashboard")}>
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/2223/2223615.png"
                            className="btn-back w-[35px] md:w-[46px] transition-all bg-yellow-500 hover:bg-yellow-400 rounded-full p-2 md:p-3 shadow-lg"
                            alt="Back to dashboard"
                        />
                    </Link>
                </div>

                {/* Video Title - sesuaikan ukuran dan posisi untuk mobile */}
                <div className="title-video absolute left-1/2 top-3 md:top-7 max-w-[280px] md:max-w-[620px] -translate-x-1/2 text-center z-20">
                    <span className="select-none text-lg md:text-2xl font-medium text-white drop-shadow-md transition-all">
                        {movie.title}
                    </span>
                </div>

                {/* Video Player Container */}
                <div className="h-full pt-[60px] md:pt-[90px] overflow-hidden">
                    <ReactPlayer
                        url={movie.video_url}
                        controls
                        width="100%"
                        height="100%"
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)'
                        }}
                        className="react-player"
                        playsinline // Penting untuk iOS
                        config={{
                            file: {
                                attributes: {
                                    controlsList: 'nodownload', // Mencegah download
                                    disablePictureInPicture: true // Menonaktifkan PiP
                                }
                            }
                        }}
                    />
                </div>
            </section>
            {/* Movie Description Section */}
            <section className="movie-description bg-form-bg py-10 px-4 md:px-16">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-white text-xl md:text-2xl font-semibold mb-6">Movie Details</h2>
                    <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                        {/* Movie Poster */}
                        <div className="w-full md:w-1/4 flex justify-center md:justify-start">
                            <img 
                                src={movie.thumbnail} 
                                alt="Movie Poster" 
                                className="w-full h-auto max-w-[200px] rounded-md shadow-lg"
                            />
                        </div>
                        {/* Movie Information */}
                        <div className="w-full md:w-3/4">
                            <div className="space-y-4">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                                    <h3 className="text-white text-lg md:text-xl font-medium">{movie.title}</h3>
                                    <button 
                                        className={`w-full sm:w-auto px-4 py-2 ${
                                            isFavorited ? 'bg-red-500 hover:bg-red-400' : 'bg-yellow-500 hover:bg-yellow-400'
                                        } text-white rounded-md flex items-center justify-center sm:justify-start gap-2 transition-all ${
                                            isLoading ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                        onClick={() => handleFavoriteToggle(movie.id)}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        ) : (
                                            <svg 
                                                xmlns="http://www.w3.org/2000/svg" 
                                                className="h-5 w-5" 
                                                viewBox="0 0 20 20" 
                                                fill={isFavorited ? 'currentColor' : 'none'}
                                                stroke="currentColor"
                                            >
                                                <path 
                                                    fillRule="evenodd" 
                                                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" 
                                                    clipRule="evenodd" 
                                                />
                                            </svg>
                                        )}
                                        {isLoading ? 'Memproses...' : (isFavorited ? 'Hapus dari Favorit' : 'Tambah ke Favorit')}
                                    </button>
                                </div>
                                <p className="text-gray-300 text-sm md:text-base mt-2">
                                    {movie.description}
                                </p>
                                <div className="grid grid-cols-2 gap-4 text-sm md:text-base">
                                    <div>
                                        <span className="text-gray-400 block">Genre</span>
                                        <span className="text-white">{movie.genre}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-400 block">Duration</span>
                                        <span className="text-white">{movie.duration}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-400 block">Year</span>
                                        <span className="text-white">{movie.release_year}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-400 block">Rating</span>
                                        <span className="text-white">{movie.rating}/10</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </>
    );
}
