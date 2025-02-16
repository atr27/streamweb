import ReactPlayer from "react-player";
import { Link } from "@inertiajs/react";

export default function Show({ movie }) {
    return (
        <>
            <section
                className="watching-page relative mx-auto w-screen h-screen font-poppins bg-form-bg overflow-hidden"
                id="stream"
            >
                <div className="h-full pt-[90px] overflow-hidden">
                    <ReactPlayer
                        url={movie.video_url}
                        controls
                        width="100%"
                        height="calc(100vh - 100px)"
                        className="react-player"
                    />
                </div>

                {/* Back to dashboard button */}
                <div className="absolute left-5 top-5 z-20">
                    <Link href={route("user.dashboard")}>
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/2223/2223615.png"
                            className="btn-back w-[46px] transition-all bg-yellow-500 hover:bg-yellow-400 rounded-full p-3 shadow-lg"
                            alt="Back to dashboard"
                        />
                    </Link>
                </div>

                {/* Video Title */}
                <div className="title-video absolute left-1/2 top-7 max-w-[310px] -translate-x-1/2 text-center md:max-w-[620px]">
                    <span className="select-none text-2xl font-medium text-white drop-shadow-md transition-all">
                        {movie.title}
                    </span>
                </div>
            </section>
            {/* Movie Description Section */}
            <section className="movie-description bg-form-bg py-10 px-5 md:px-16">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-white text-2xl font-semibold mb-6">Movie Details</h2>
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Movie Poster */}
                        <div className="w-full md:w-1/4">
                            <img 
                                src={movie.thumbnail} 
                                alt="Movie Poster" 
                                className="w-full max-w-[200px] rounded-md shadow-lg"
                            />
                        </div>
                        {/* Movie Information */}
                        <div className="w-full md:w-3/4">
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-white text-xl font-medium">{movie.title}</h3>
                                    <p className="text-gray-300 mt-2">
                                        {movie.description}
                                    </p>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
        </>
    );
}
