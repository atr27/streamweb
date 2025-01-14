import { Link } from '@inertiajs/react';
import PropTypes from 'prop-types';

CardMovie.propTypes = {
    slug: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired
}

export default function CardMovie({
    slug,
    name,
    category,
    thumbnail,
}) {
    return (
        <div className="group absolute mr-[30px] overflow-hidden">
            {/* <!-- Movies --> */}
            <img
                src={thumbnail}
                className="h-[340px] w-[250px] rounded-[30px] object-cover"
                alt=""
            />
            <div className="absolute bottom-0 left-0 right-0 rounded-bl-[28px] rounded-br-[28px] bg-gradient-to-t from-black">
                <div className="px-7 pb-7">
                    <div className="text-xl font-medium text-white">
                        {name}
                    </div>
                    <p className="mb-0 mt-[10px] text-base text-gray-300">
                        {category}
                    </p>
                </div>
            </div>
            <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-[500px] transition duration-500 ease-in-out group-hover:-translate-y-1/2">
                <img src="/icons/ic_play.svg" className="" width="50" alt="" />
            </div>
            <Link href={route('auth.movie.show', slug)} className="absolute inset-0 z-50"></Link>
        </div>
    );
}
