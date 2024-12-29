import Label from '@/Components/InputLabel';
import Button from '@/Components/PrimaryButton';
import Input from '@/Components/TextInput';
import { Head, Link } from '@inertiajs/react';

export default function Login() {
    return (
        <>
            <Head title="Sign In" />
            <div className="max-w-screen mx-auto min-h-screen bg-black px-3 text-white md:px-10">
                <div className="fixed top-[-50px] hidden lg:block">
                    <img
                        src="/images/signup-image.png"
                        className="hidden laptopLg:block laptopLg:max-w-[450px] laptopXl:max-w-[640px]"
                        alt=""
                    />
                </div>
                <div className="flex py-24 laptopLg:ml-[680px] laptopXl:ml-[870px]">
                    <div>
                        <h2 className="text-[35px] font-semibold text-white">
                            StreamWeb
                        </h2>
                        <div className="my-[70px]">
                            <div className="mb-3 text-[26px] font-semibold">
                                Welcome Back
                            </div>
                            <p className="text-base leading-7 text-[#767676]">
                                Explore our new movies and get <br />
                                the better insight for your life
                            </p>
                        </div>
                        <form className="w-[370px]">
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
                                    />
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
                                    />
                                </div>
                            </div>
                            <div className="mt-[30px] grid space-y-[14px]">
                                <Link href={route('auth.dashboard')}>
                                    <Button type="button">
                                        <span className="text-base font-semibold">
                                            Start Watching
                                        </span>
                                    </Button>
                                </Link>
                                <Link href={route('auth.sign-up')}>
                                    <Button
                                        type="button"
                                        variant="light-outline"
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
        </>
    );
}
