"use client"
import { setToken } from '@/lib/auth';
import api from '@/lib/axios';
import { useForm } from "react-hook-form"
import axios from "axios"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { isAuthenticated } from '@/lib/auth';

type LoginFormInputs = {
    username: string
    password: string
}

export default function LoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const router = useRouter()

    useEffect(() => {
        if (isAuthenticated()) {
            router.push('/dashboard');
        }
    }, []);

    const onSubmit = async (data: LoginFormInputs) => {
        setLoading(true)

        try {
            const res = await axios.post("http://localhost:8000/api/auth/login/", data)

            const token = res.data.access;
            setToken(token);

            // localStorage.setItem("access_token", res.data.access)
            // localStorage.setItem("refresh_token", res.data.refresh)

            router.push("/dashboard")
        } catch (err: any) {
            setError("Invalid credentials")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4"
            >
                <h2 className="text-2xl font-bold mb-4">Login</h2>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                        {...register("username", { required: "Username is required" })}
                        className="mt-1 block w-full border rounded-md p-2"
                    />
                    {errors.username && <p className="text-sm text-red-500">{errors.username.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        {...register("password", { required: "Password is required" })}
                        type="password"
                        className="mt-1 block w-full border rounded-md p-2"
                    />
                    {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                </div>

                {error && <p className="text-sm text-red-600">{error}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    )
}
