import Authenticated from '@/Layouts/Authenticated/Index';
import { Head, useForm } from '@inertiajs/react';
import Label from '@/Components/InputLabel';
import Input from '@/Components/TextInput';
import Button from '@/Components/PrimaryButton';
import { useState } from 'react';

export default function Profile({ auth }) {
    const [notification, setNotification] = useState(null);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const { data, setData, put, errors, processing } = useForm({
        name: auth?.user?.name || '',
        current_password: '',
        new_password: '',
        new_password_confirmation: '',
    });

    // Gunakan data dari auth.activePlan
    const activeSubscription = auth?.user?.userSubscriptions?.find(
        sub => sub.status_payment === 'paid' && new Date(sub.expires_at) > new Date()
    );

    const updateProfile = (e) => {
        e.preventDefault();
        put(route('user.profile.update'), {
            onSuccess: () => {
                setNotification({
                    type: 'success',
                    message: 'Profil berhasil diperbarui!'
                });
                setTimeout(() => setNotification(null), 3000);
                
                // Reset password fields
                setData(data => ({
                    ...data,
                    current_password: '',
                    new_password: '',
                    new_password_confirmation: ''
                }));
            },
            onError: () => {
                setNotification({
                    type: 'error',
                    message: 'Terjadi kesalahan saat memperbarui profil.'
                });
                setTimeout(() => setNotification(null), 3000);
            }
        });
    };

    const renderSubscriptionSection = () => {
        if (!auth?.activePlan?.isPremium) return null;

        return (
            <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">Langganan Aktif</h3>
                
                <div className="space-y-4 mb-6">
                    <div>
                        <p className="text-gray-600">
                            Plan saat ini: <span className="font-semibold text-gray-800">{auth.activePlan.name}</span>
                        </p>
                    </div>
                    
                    <div>
                        <p className="text-gray-600">
                            Berakhir pada: <span className="font-semibold text-gray-800">
                                {new Date(auth.activePlan.expires_at).toLocaleDateString('id-ID', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                })}
                            </span>
                        </p>
                        <p className="text-gray-600">
                            Sisa hari aktif: <span className="font-semibold text-gray-800">
                                {auth.activePlan.remainingActiveDay} hari
                            </span>
                        </p>
                        <p className="text-gray-600">
                            Status: <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Aktif
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <Authenticated auth={auth}>
            <Head title="Profile" />

            {notification && (
                <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
                    notification.type === 'success' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-red-500 text-white'
                }`}>
                    <p className="flex items-center">
                        {notification.type === 'success' ? (
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        )}
                        {notification.message}
                    </p>
                </div>
            )}

            <div className="container mx-auto py-12 px-4 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold mb-8 text-gray-800">Profil Anda</h2>

                    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
                        <form onSubmit={updateProfile} className="space-y-6 md:space-y-8">
                            <div>
                                <Label htmlFor="name" className="text-gray-700">Username</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="mt-2 block w-full rounded-md border-gray-300 bg-white text-gray-900 shadow-sm focus:bg-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200"
                                />
                                {errors.name && (
                                    <div className="text-red-600 text-sm mt-2">{errors.name}</div>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="current_password" className="text-gray-700">Password Saat Ini</Label>
                                <div className="relative">
                                    <Input
                                        id="current_password"
                                        type={showCurrentPassword ? "text" : "password"}
                                        value={data.current_password}
                                        onChange={(e) => setData('current_password', e.target.value)}
                                        className="mt-2 block w-full rounded-md border-gray-300 bg-white text-gray-900 shadow-sm focus:bg-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200"
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                    >
                                        {showCurrentPassword ? (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                {errors.current_password && (
                                    <div className="text-red-600 text-sm mt-2">{errors.current_password}</div>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="new_password" className="text-gray-700">Password Baru</Label>
                                <div className="relative">
                                    <Input
                                        id="new_password"
                                        type={showNewPassword ? "text" : "password"}
                                        value={data.new_password}
                                        onChange={(e) => setData('new_password', e.target.value)}
                                        className="mt-2 block w-full rounded-md border-gray-300 bg-white text-gray-900 shadow-sm focus:bg-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200"
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                    >
                                        {showNewPassword ? (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                {errors.new_password && (
                                    <div className="text-red-600 text-sm mt-2">{errors.new_password}</div>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="new_password_confirmation" className="text-gray-700">Konfirmasi Password Baru</Label>
                                <div className="relative">
                                    <Input
                                        id="new_password_confirmation"
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={data.new_password_confirmation}
                                        onChange={(e) => setData('new_password_confirmation', e.target.value)}
                                        className="mt-2 block w-full rounded-md border-gray-300 bg-white text-gray-900 shadow-sm focus:bg-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200"
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="pt-4 flex justify-center sm:justify-start">
                                <Button type="submit" processing={processing} className="w-full sm:w-auto px-6">
                                    Simpan Perubahan
                                </Button>
                            </div>
                        </form>

                        {renderSubscriptionSection()}
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}