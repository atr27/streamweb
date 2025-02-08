import { Link } from "@inertiajs/react";
import PropTypes from "prop-types";
FeaturedMovie.propTypes = {
    slug: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    rating: PropTypes.number
}

export default function FeaturedMovie({
    slug,
    name,
    category,
    thumbnail,
    rating = 0,
}) {
    // Konversi rating ke number jika masih dalam bentuk string
    const numericRating = typeof rating === 'string' ? parseFloat(rating) : rating;

    return (
        <div className="group absolute mr-[30px] overflow-hidden">
        {/* <!-- Movie Thumbnail --> */}
        <img
            src={thumbnail}
            className="h-[340px] w-[520px] rounded-[30px] object-cover"
            alt=""
        />
        {/* <!-- rating --> */}
        <div className="rating absolute left-0 top-0">
            <div className="flex items-center gap-1 p-[30px]">
                <img src="/icons/ic_star.svg" alt="" />
                <span className="mt-1 text-sm font-medium text-white">
                    {numericRating.toFixed(1)}/10.0
                </span>
            </div>
        </div>
        {/* <!-- bottom detail --> */}
        <div className="absolute bottom-0 left-0 right-0 flex h-[100px] h-[130px] items-center justify-between rounded-bl-[28px] rounded-br-[28px] bg-gradient-to-t from-black px-7">
            <div>
                <div className="text-[22px] font-medium text-white">
                    {name}
                </div>
                <p className="mb-0 text-sm font-light text-white">
                    {category}
                </p>
            </div>
            <div className="translate-x-[100px] transition duration-500 ease-in-out group-hover:translate-x-0">
                <img
                    src="/icons/ic_play.svg"
                    width="50"
                    alt=""
                />
            </div>
        </div>
        <Link
            href={route('auth.movie.show', slug)}
            className="absolute inset-0 z-50"
        ></Link>
    </div>
    );
}