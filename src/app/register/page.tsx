"use client"
import { registerUser, isAuthenticated } from '@/lib/auth';
import { useForm } from "react-hook-form"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from 'next/link'

type RegisterFormInputs = {
  username: string
  email: string
  name: string
  password: string
  password2: string
  role: 'developer' | 'reporter'
  bio?: string
}

export default function RegisterPage() {
  const { 
    register, 
    handleSubmit, 
    watch,
    formState: { errors, isValid } 
  } = useForm<RegisterFormInputs>({
    defaultValues: {
      role: 'developer' // Default value for role
    },
    mode: 'onChange'
  })
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const router = useRouter()
  
  // Watch password for confirmation validation
  const password = watch("password")

  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/dashboard');
    }
  }, [router])

  const onSubmit = async (data: RegisterFormInputs) => {
    setLoading(true)
    setError("")
    setSuccess(false)

    // Transform the data for backend
    const userData = {
      username: data.username.trim(),
      email: data.email.trim(),
      first_name: data.name.trim(),
      password: data.password,
      password2: data.password2,
      role: data.role,
      bio: data.bio || ""
    }

    const result = await registerUser(userData)
    
    if (result.success) {
      setSuccess(true)
      // Redirect to dashboard after successful registration
      if (result.data?.access) {
        router.push("/dashboard")
      } else {
        // If no token returned, redirect to login
        setTimeout(() => {
          router.push("/login?registered=true")
        }, 2000)
      }
    } else {
      setError(result.error || "Registration failed")
    }
    
    setLoading(false)
  }

  // Username validation pattern
  const usernamePattern = /^[a-zA-Z0-9_]+$/;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">
            Create your account
          </h1>
          <p className="mt-2 text-muted-foreground">
            Join OurBugTracker to start tracking and managing bugs
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="github-alert-success animate-fade-in">
            <div className="flex items-center">
              <svg className="h-5 w-5 mr-3 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="text-sm font-medium">Registration successful! Redirecting...</p>
            </div>
          </div>
        )}

        <div className="github-card border-border shadow-card">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email address *
              </label>
              <input
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                type="email"
                autoComplete="email"
                className="github-form-input"
                placeholder="you@example.com"
                disabled={loading}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Username *
              </label>
              <input
                {...register("username", { 
                  required: "Username is required",
                  minLength: {
                    value: 3,
                    message: "Username must be at least 3 characters"
                  },
                  maxLength: {
                    value: 30,
                    message: "Username must be less than 30 characters"
                  },
                  pattern: {
                    value: usernamePattern,
                    message: "Only letters, numbers, and underscores allowed"
                  }
                })}
                autoComplete="username"
                className="github-form-input"
                placeholder="Choose a username"
                disabled={loading}
              />
              {errors.username && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.username.message}
                </p>
              )}
              <p className="mt-1 text-xs text-muted-foreground">
                3-30 characters, letters, numbers, and underscores only
              </p>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Full Name *
              </label>
              <input
                {...register("name", { 
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters"
                  },
                  maxLength: {
                    value: 50,
                    message: "Name must be less than 50 characters"
                  }
                })}
                autoComplete="given-name"
                className="github-form-input"
                placeholder="Your full name"
                disabled={loading}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Password *
              </label>
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
                  autoComplete="new-password"
                  className="github-form-input pr-10"
                  placeholder="Create a strong password"
                  disabled={loading}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.password.message}
                </p>
              )}
              <p className="mt-1 text-xs text-muted-foreground">
                Must be at least 8 characters long
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Confirm Password *
              </label>
              <div className="relative">
                <input
                  {...register("password2", { 
                    required: "Please confirm your password",
                    validate: value => 
                      value === password || "Passwords do not match"
                  })}
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  className="github-form-input pr-10"
                  placeholder="Confirm your password"
                  disabled={loading}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground hover:text-foreground"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password2 && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.password2.message}
                </p>
              )}
            </div>

            {/* Role Selection - Simple Dropdown */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Role *
              </label>
              <select
                {...register("role", { required: "Please select a role" })}
                className="github-form-input"
                disabled={loading}
              >
                <option value="developer">Developer</option>
                <option value="reporter">Reporter</option>
              </select>
              {errors.role && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.role.message}
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
                  ? 'opacity-70' 
                  : 'hover:opacity-90'
              }`}
              style={{ cursor: loading || !isValid ? 'not-allowed' : 'pointer' }}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </span>
              ) : (
                "Create account"
              )}
            </button>

            <div className="text-center text-sm text-muted-foreground pt-2">
              Already have an account?{' '}
              <Link 
                href="/login" 
                className="font-medium text-primary hover:underline"
              >
                Sign in
              </Link>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground pt-6 border-t border-border/30">
          <p>
            By creating an account, you agree to our{' '}
            <Link href="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>
            {' '}and{' '}
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}