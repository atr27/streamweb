import { Link } from '@inertiajs/react';

const MenuItem = ({ icon, text, isActive, path, onClick }) => {
    const content = (
        <>
            {typeof icon === 'function' ? icon({isActive}) : icon}
            <span>{text}</span>
        </>
    );

    return onClick ? (
        <button onClick={onClick} className="side-link group flex cursor-pointer items-center gap-[30px] rounded-lg px-6 py-4 transition-all hover:bg-soft-green">
            {content}
        </button>
    ) : (
        <Link href={path} className="side-link group flex cursor-pointer items-center gap-[30px] rounded-lg px-6 py-4 transition-all hover:bg-soft-green">
            {content}
        </Link>
    );
};

export default MenuItem;