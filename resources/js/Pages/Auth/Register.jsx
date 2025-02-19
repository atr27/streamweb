import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import Label from '../../Components/InputLabel';
import Button from '../../Components/PrimaryButton';
import Input from '../../Components/TextInput';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [validationErrors, setValidationErrors] = useState({});
    const [emailError, setEmailError] = useState('');

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const validateForm = () => {
        const newErrors = {};

        // Validate name
        if (!data.name) {
            newErrors.name = 'Full name is required';
        } else if (data.name.length < 3) {
            newErrors.name = 'Full name must be at least 3 characters';
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!data.email) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(data.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Validate password
        if (!data.password) {
            newErrors.password = 'Password is required';
        } else if (data.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        // Validate password confirmation
        if (!data.password_confirmation) {
            newErrors.password_confirmation =
                'Password confirmation is required';
        } else if (data.password !== data.password_confirmation) {
            newErrors.password_confirmation = 'Passwords do not match';
        }

        setValidationErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onHandleChange = (event) => {
        const { name, value } = event.target;
        setData(name, value);

        // Clear validation errors
        setValidationErrors((prev) => ({
            ...prev,
            [name]: '',
        }));

        if (name === 'email') {
            setEmailError('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            post(route('register'), {
                onSuccess: () => {
                    // Akan di-redirect otomatis ke dashboard
                    console.log('Registrasi berhasil');
                },
                onError: (errors) => {
                    const newValidationErrors = {};

                    if (errors.error) {
                        // Menangani error umum dari server
                        setEmailError(errors.error);
                    }

                    // Menangani error validasi
                    Object.keys(errors).forEach((key) => {
                        newValidationErrors[key] = errors[key];
                    });

                    setValidationErrors(newValidationErrors);
                    if (errors.email) {
                        setEmailError(errors.email);
                    }

                    // Reset password fields
                    setData((data) => ({
                        ...data,
                        password: '',
                        password_confirmation: '',
                    }));
                },
            });
        }
    };

    return (
        <>
            <Head title="Sign Up" />
            <div className="min-h-screen bg-black px-3 py-8 text-white md:px-10">
                <div className="fixed top-[-50px] hidden lg:block">
                    <img
                        src="/images/signup-image.png"
                        className="hidden laptopLg:block laptopLg:max-w-[450px] laptopXl:max-w-[640px]"
                        alt=""
                    />
                </div>
                <div className="mx-auto flex min-h-screen items-center justify-center laptopLg:justify-end laptopLg:pr-20">
                    <div className="w-full max-w-[370px]">
                        <h2 className="text-[26px] font-semibold text-white md:text-[35px]">
                            StreamWeb
                        </h2>
                        <div className="my-[30px] md:my-[70px]">
                            <div className="mb-3 text-[20px] font-semibold md:text-[26px]">
                                Sign Up
                            </div>
                            <p className="text-base leading-7 text-[#767676]">
                                Explore our new movies and get <br />
                                the better insight for your life
                            </p>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-6">
                                <div>
                                    <Label value="Full Name" forInput="name" />
                                    <Input
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        onChange={onHandleChange}
                                        placeholder="Your Full Name..."
                                    />
                                    {(errors.name || validationErrors.name) && (
                                        <div className="mt-1 text-sm text-red-500">
                                            {errors.name ||
                                                validationErrors.name}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <Label
                                        value="Email Address"
                                        forInput="email"
                                    />
                                    <Input
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        onChange={onHandleChange}
                                        placeholder="Your Email Address..."
                                        className={
                                            errors.email ||
                                            validationErrors.email
                                                ? 'input-error'
                                                : ''
                                        }
                                    />
                                    {(errors.email ||
                                        validationErrors.email) && (
                                        <div className="mt-1 text-sm text-red-500">
                                            {errors.email ||
                                                validationErrors.email}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <Label
                                        value="Password"
                                        forInput="password"
                                    />
                                    <Input
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        onChange={onHandleChange}
                                        placeholder="Your Password..."
                                    />
                                    {(errors.password ||
                                        validationErrors.password) && (
                                        <div className="mt-1 text-sm text-red-500">
                                            {errors.password ||
                                                validationErrors.password}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <Label
                                        value="Password Confirmation"
                                        forInput="password_confirmation"
                                    />
                                    <Input
                                        type="password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        onChange={onHandleChange}
                                        placeholder="Confirm Your Password..."
                                    />
                                    {(errors.password_confirmation ||
                                        validationErrors.password_confirmation) && (
                                        <div className="mt-1 text-sm text-red-500">
                                            {errors.password_confirmation ||
                                                validationErrors.password_confirmation}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="mt-[30px] grid space-y-[14px]">
                                <Button
                                    type="submit"
                                    variant="primary"
                                    processing={processing}
                                >
                                    <span className="text-base font-semibold">
                                        {processing
                                            ? 'Signing up...'
                                            : 'Sign Up'}
                                    </span>
                                </Button>

                                <Link href={route('auth.sign-in')}>
                                    <Button variant="light-outline">
                                        <span className="text-base font-semibold">
                                            Sign In To My Account
                                        </span>
                                    </Button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
