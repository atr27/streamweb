import { useState } from "react";
import { Link } from '@inertiajs/react';
import { router } from '@inertiajs/react';

export default function Topbar({ name, query }) {
    const [searchQuery, setSearchQuery] = useState(query || '');

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        router.get(
            route('user.browse', { query: value }),
            {},
            { 
                preserveState: true,
                preserveScroll: true,
                only: ['movies', 'query']
            }
        );
    };

    return (
        <div className="flex items-center justify-between cursor-pointer">
            <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                className="top-search w-[280px] rounded-full bg-white bg-[length:24px_24px] bg-no-repeat px-5 py-3 pl-12 outline outline-2 outline-gray-2 focus:outline-primary"
                placeholder="Search movie, genre"
            />
            <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-black">
                    Welcome, {name}
                </span>
                <Link
                    href={route('user.profile')}
                    className="w-[40px] rounded-full p-[5px]"
                >
                    <svg 
                        className="w-full h-full text-white rounded-full bg-yellow-500"
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                    </svg>
                </Link>
            </div>
            <style jsx="true">
                {`
                    .top-search {
                        background-image: url('/icons/ic_search.svg');
                        background-position: 16px center;
                    }
                `}
            </style>
        </div>
    );
}