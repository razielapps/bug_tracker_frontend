"use client";

import { Suspense } from "react";
import { saveTokens } from '@/lib/auth';
import { useForm } from "react-hook-form"
import axios from "axios"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { isAuthenticated } from '@/lib/auth';
import Link from 'next/link'

type LoginFormInputs = {
    username: string
    password: string
}

// Content component that uses useSearchParams
function LoginContent() {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<LoginFormInputs>({
        mode: 'onChange'
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        if (isAuthenticated()) {
            router.push('/dashboard');
        }
        
        const registered = searchParams.get('registered')
        if (registered === 'true') {
            setSuccessMessage("Registration successful! Please log in with your credentials.")
            
            const timer = setTimeout(() => {
                setSuccessMessage("")
            }, 5000)
            
            return () => clearTimeout(timer)
        }
    }, [searchParams, router]);

    const onSubmit = async (data: LoginFormInputs) => {
        setLoading(true)
        setError("")

        try {
            const res = await axios.post("http://localhost:8000/api/auth/login/", data)
            const access = res.data.access;
            const refresh = res.data.refresh;
            saveTokens(access, refresh);
            router.push("/dashboard")
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                if (err.response?.status === 401) {
                    setError("Invalid username or password")
                } else if (err.response?.data?.detail) {
                    setError(err.response.data.detail)
                } else if (err.response?.data?.non_field_errors) {
                    setError(err.response.data.non_field_errors[0])
                } else {
                    setError("An error occurred. Please try again.")
                }
            } else {
                setError("An error occurred. Please try again.")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
            {/* Main Content */}
            <div className="w-full max-w-md space-y-8 mt-20">
                <div className="text-center">
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-gradient-primary rounded-lg flex items-center justify-center shadow-md">
                            <span className="text-white text-2xl font-bold">OBT</span>
                        </div>
                    </div>
                    
                    <h1 className="text-2xl font-bold text-foreground">
                        Sign in to OurBugTracker
                    </h1>
                    <p className="mt-2 text-muted-foreground">
                        Enter your credentials to access your dashboard
                    </p>
                </div>

                {/* Success Message */}
                {successMessage && (
                    <div className="github-alert-success animate-fade-in">
                        <div className="flex items-center">
                            <svg className="h-5 w-5 mr-3 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <p className="text-sm font-medium">{successMessage}</p>
                        </div>
                    </div>
                )}

                <div className="github-card border-border shadow-sm">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Username
                            </label>
                            <input
                                {...register("username", { 
                                    required: "Username is required",
                                    minLength: {
                                        value: 3,
                                        message: "Username must be at least 3 characters"
                                    }
                                })}
                                autoComplete="username"
                                className="github-form-input"
                                placeholder="Enter your username"
                                disabled={loading}
                            />
                            {errors.username && (
                                <p className="mt-1 text-sm text-destructive">
                                    {errors.username.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-sm font-medium text-foreground">
                                    Password
                                </label>
                                <Link 
                                    href="/forgot-password" 
                                    className="text-sm text-primary hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <input
                                    {...register("password", { 
                                        required: "Password is required",
                                        minLength: {
                                            value: 8,
                                            message: "Password must be at least 8 characters"
                                        }
                                    })}
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    className="github-form-input pr-10"
                                    placeholder="Enter your password"
                                    disabled={loading}
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    onClick={() => setShowPassword(!showPassword)}
                                    title={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-sm text-destructive">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="github-alert-error">
                                <div className="flex items-center">
                                    <svg className="h-5 w-5 mr-3 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                    <div>
                                        <p className="text-sm font-medium">{error}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading || !isValid}
                            className={`github-btn-primary w-full py-3 font-medium ${
                                !isValid || loading 
                                    ? 'opacity-70 cursor-not-allowed' 
                                    : 'hover:opacity-90'
                            }`}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing in...
                                </span>
                            ) : (
                                "Sign in"
                            )}
                        </button>

                        <div className="relative py-4">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-border"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-3 bg-card text-muted-foreground">
                                    New to OurBugTracker?
                                </span>
                            </div>
                        </div>

                        <div className="text-center">
                            <Link 
                                href="/register" 
                                className="github-btn-outline w-full py-3 font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                            >
                                Create an account
                            </Link>
                        </div>
                    </form>
                </div>

                {/* Footer */}
                <div className="text-center text-sm text-muted-foreground pt-6">
                    <p>
                        By signing in, you agree to our{' '}
                        <Link href="/terms" className="text-primary hover:underline">
                            Terms
                        </Link>
                        {' '}and{' '}
                        <Link href="/privacy" className="text-primary hover:underline">
                            Privacy
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

// Main export with Suspense
export default function LoginPage() {
    return (
        <Suspense 
            fallback={
                <div className="min-h-screen flex items-center justify-center bg-background">
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
                        <p className="text-muted-foreground">Loading login...</p>
                    </div>
                </div>
            }
        >
            <LoginContent />
        </Suspense>
    )
}