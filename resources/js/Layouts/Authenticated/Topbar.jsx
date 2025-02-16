import { useState, useRef } from "react";
import { Link } from '@inertiajs/react';

export default function Topbar({ name }) {
    const [dropdownOpen, setDropdownOpen] = useState(true);
    const dropdownTarget  = useRef();

    const triggerDropdown = () => {
        if (dropdownOpen) {
            dropdownTarget.current.classList.remove('hidden');
        } else {
            dropdownTarget.current.classList.add('hidden');
        }
        setDropdownOpen(!dropdownOpen);
    }

    return (
        <div className="flex items-center justify-between cursor-pointer">
            <input
                type="text"
                className="top-search w-[280px] rounded-full bg-white bg-[length:24px_24px] bg-no-repeat px-5 py-3 pl-12 outline outline-2 outline-gray-2 focus:outline-primary"
                placeholder="Search movie, cast, genre"
            />
            <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-black">
                    Welcome, {name}
                </span>
                <div className="collapsible-dropdown relative flex flex-col gap-2">
                    <div
                        href="#!"
                        className="dropdown-button w-[60px] rounded-full p-[5px] outline outline-2 outline-gray-2"
                        onClick={triggerDropdown}
                    >
                        <img
                            src="/images/avatar.png"
                            className="w-full rounded-full object-cover"
                            alt=""
                        />
                    </div>
                    <div
                        className="absolute right-0 top-[70px] z-[999] flex hidden min-w-[180px] flex-col gap-1 overflow-hidden rounded-2xl bg-white p-1 shadow-md"
                        ref={dropdownTarget}
                    >
                        <a
                            href="#!"
                            className="p-4 transition-all hover:bg-sky-100"
                        >
                            Dashboard
                        </a>
                        <a
                            href="#!"
                            className="p-4 transition-all hover:bg-sky-100"
                        >
                            Settings
                        </a>
                        <Link
                            href={route('logout')}
                            method="post" 
                            as="button"
                            className="p-4 transition-all hover:bg-sky-100 w-full text-left"
                        >
                            Sign Out
                        </Link>
                    </div>
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
        </div>
    );
}