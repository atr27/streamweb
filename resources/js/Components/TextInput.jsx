import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import PropTypes from 'prop-types';

const Input = forwardRef(({ 
    type = 'text',
    name,
    value,
    defaultValue,
    className,
    variant = 'primary',
    autoComplete,
    required,
    isFocused,
    onChange,
    placeholder,
    isError,
    ...props
}, ref) => {
    const localRef = useRef();

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus()
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            name={name}
            value={value}
            defaultValue={defaultValue}
            className={
                `rounded-2xl bg-form-bg py-[13px] px-7 w-full ${isError && 'input-error'} input-${variant} ${className}`
            }
            ref={localRef}
            autoComplete={autoComplete}
            required={required}
            onChange={onChange}
            placeholder={placeholder}
        />
    );
});

Input.propTypes = {
    type: PropTypes.oneOf(['text','email','password','number','file']),
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    className: PropTypes.string,
    variant: PropTypes.oneOf(['primary','error','primary-outline']),
    placeholder: PropTypes.string,
    autoComplete: PropTypes.string,
    required: PropTypes.bool,
    isFocused: PropTypes.bool,
    onChange: PropTypes.func,
    isError: PropTypes.bool
};

export default Input;
