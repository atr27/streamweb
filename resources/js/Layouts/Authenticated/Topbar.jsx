import { useState } from "react";
import { Link } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { MobileSidebar } from '@/Layouts/Authenticated/Sidebar';

export default function Topbar({ name, query, auth }) {
    const [searchQuery, setSearchQuery] = useState(query || '');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&size=100&font-size=0.4`;

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
        <div className="flex items-center justify-between px-4 py-3 lg:px-6">
            {/* Mobile Menu Button */}
            <button 
                className="lg:hidden text-2xl p-2 -ml-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                <FontAwesomeIcon icon={faBars} className="w-6 h-6" />
            </button>

            {/* Search Input */}
            <div className="flex-1 mx-4 lg:mx-0 lg:flex-none">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearch}
                    className="top-search w-full lg:w-[280px] rounded-full bg-white bg-[length:24px_24px] bg-no-repeat px-5 py-3 pl-12 outline outline-2 outline-gray-2 focus:outline-primary"
                    placeholder="Search movie, genre"
                />
            </div>

            {/* User Info */}
            <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                    <div className="text-base lg:text-xl font-semibold">{name}</div>
                </div>
                <div className="h-[60px] w-[60px] rounded-full overflow-hidden bg-gray-100">
                    <img 
                        src={avatarUrl}
                        alt={`${name}'s Avatar`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";
                        }}
                    />
                </div>
            </div>

            <style jsx="true">
                {`
                    .top-search {
                        background-image: url('/icons/ic_search.svg');
                        background-position: 16px center;
                    }
                `}
            </style>

            {/* Mobile Sidebar */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div 
                        className="fixed inset-0 bg-black/50"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                    <div className="fixed left-0 top-0 bottom-0 w-[280px] bg-white">
                        <MobileSidebar 
                            auth={auth} 
                            onClose={() => setIsMobileMenuOpen(false)} 
                        />
                    </div>
                </div>
            )}

            {/* Mobile Sidebar Close Button */}
            {isMobileMenuOpen && (
                <button 
                    className="fixed right-4 top-4 z-[60] lg:hidden text-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    <FontAwesomeIcon icon={faTimes} className="w-6 h-6" />
                </button>
            )}
        </div>
    );
}