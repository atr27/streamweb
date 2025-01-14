import PropTypes from "prop-types";

PrimaryButton.propTypes = {
    type: PropTypes.oneOf(['submit', 'button', 'reset']),
    className: PropTypes.string,
    variant: PropTypes.oneOf(['primary', 'warning', 'danger', 'light-outline', 'white-outline']),
    processing: PropTypes.bool,
    children: PropTypes.node,
};

export default function PrimaryButton({
    type = 'submit',
    className = '',
    variant = 'primary',
    processing,
    children,
}) {
    return (
        <button
            type={type}
            className={
                `rounded-2xl py-[13px] text-center btn-${variant} w-full ${processing && 'opacity-25'} ${className}`
            }
            disabled={processing}
        >
            {children}
        </button>
    );
}
