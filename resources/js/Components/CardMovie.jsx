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
        <div className="relative group overflow-hidden">
            <img
                src={thumbnail}
                className="object-cover rounded-[30px] h-[340px] w-full"
                alt=""
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black rounded-bl-[28px] rounded-br-[28px]">
                <div className="px-7 pb-7">
                    <div className="font-medium text-xl text-white">{name}</div>
                    <p className="mb-0 text-gray-300 text-base mt-[10px]">
                        {category}
                    </p>
                </div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-y-[500px] group-hover:-translate-y-1/2 -translate-x-1/2 z-20 transition ease-in-out duration-500">
                <img src="/icons/ic_play.svg" className="" width="50" alt="" />
            </div>
            <a href={route('user.movie.show', slug)} className="inset-0 absolute z-50"></a>
        </div>
    );
}
