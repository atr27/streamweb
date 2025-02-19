import React, { useEffect } from 'react';
import Label from '@/Components/InputLabel';
import Button from '@/Components/PrimaryButton';
import Input from '@/Components/TextInput';
import { Head, Link, useForm, router } from '@inertiajs/react';

export default function Login({ auth }) {
    const { data, setData, post, errors, processing, reset } = useForm({
        email: '',
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    useEffect( () => {
        return () => {
            reset("password");
        };
    }, []);

    return (
        <>
            <Head title="Sign In" />
            <div className="h-screen bg-black text-white overflow-hidden">
                <div className="flex h-screen flex-col lg:flex-row relative">
                    {/* Background image for mobile */}
                    <div className="absolute inset-0 w-full h-full lg:hidden">
                        <img
                            src="/images/signup-image.png"
                            className="h-full w-full object-cover opacity-30"
                            alt="Sign In Cover Mobile"
                        />
                    </div>

                    {/* Left side - Image (desktop only) */}
                    <div className="hidden w-full lg:block lg:w-1/2">
                        <img
                            src="/images/signup-image.png"
                            className="h-full w-full object-cover"
                            alt="Sign In Cover"
                        />
                    </div>

                    {/* Right side - Form */}
                    <div className="flex flex-1 items-center justify-center p-8 lg:px-4 relative z-10">
                        <div className="w-full max-w-[440px]">
                            <h2 className="text-[28px] lg:text-[35px] font-semibold text-white pt-2">
                                StreamWeb
                            </h2>
                            <div className="my-[40px] lg:my-[70px]">
                                <div className="mb-3 text-[22px] lg:text-[26px] font-semibold">
                                    Welcome Back
                                </div>
                                <p className="text-base leading-7 text-[#767676]">
                                    Explore our new movies and get <br />
                                    the better insight for your life
                                </p>
                            </div>
                            <form onSubmit={handleSubmit} className="w-full">
                                {auth?.error && (
                                    <div className="mb-4 text-sm text-red-500">
                                        {auth.error}
                                    </div>
                                )}
                                <div className="flex flex-col gap-6">
                                    <div>
                                        <Label
                                            value="Email Address"
                                            forInput="email"
                                        />
                                        <Input
                                            type="email"
                                            name="email"
                                            placeholder="Email Address"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                        />
                                        {errors.email && (
                                            <div className="mt-1 text-red-500 text-sm">
                                                {errors.email}
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
                                            placeholder="Password"
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                        />
                                        {errors.password && (
                                            <div className="mt-1 text-red-500 text-sm">
                                                {errors.password}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="mt-[30px] flex flex-col gap-4">
                                    <Button
                                        type="submit"
                                        className="w-full"
                                        disabled={processing}
                                    >
                                        <span className="text-base font-semibold">
                                            {processing ? 'Signing in...' : 'Sign In'}
                                        </span>
                                    </Button>
                                    <Link
                                        href={route('register')}
                                        className="w-full text-center"
                                    >
                                        <Button
                                            type="button"
                                            variant="light-outline"
                                            className="w-full"
                                        >
                                            <span className="text-base font-semibold">
                                                Create New Account
                                            </span>
                                        </Button>
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
