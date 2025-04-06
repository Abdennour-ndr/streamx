'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert } from '@/components/ui/alert'

const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters')
})

const registerSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
})

type LoginFormData = z.infer<typeof loginSchema>
type RegisterFormData = z.infer<typeof registerSchema>

interface AuthFormProps {
  onSubmit?: (data: LoginFormData | RegisterFormData) => void
}

export function AuthForm({ onSubmit }: AuthFormProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [error, setError] = useState('')

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  })

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  })

  const currentForm = isLogin ? loginForm : registerForm

  const handleSubmit = async (data: LoginFormData | RegisterFormData) => {
    try {
      setError('')
      onSubmit?.(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  return (
    <form 
      data-testid="auth-form"
      onSubmit={currentForm.handleSubmit(handleSubmit)}
      className="space-y-6"
    >
      {error && (
        <Alert variant="destructive">
          {error}
        </Alert>
      )}

      {!isLogin && (
        <div>
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            {...registerForm.register('username')}
          />
          {registerForm.formState.errors.username && (
            <p className="text-sm text-red-500">
              {registerForm.formState.errors.username.message}
            </p>
          )}
        </div>
      )}

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...currentForm.register('email')}
        />
        {currentForm.formState.errors.email && (
          <p className="text-sm text-red-500">
            {currentForm.formState.errors.email.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          {...currentForm.register('password')}
        />
        {currentForm.formState.errors.password && (
          <p className="text-sm text-red-500">
            {currentForm.formState.errors.password.message}
          </p>
        )}
      </div>

      {!isLogin && (
        <div>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            {...registerForm.register('confirmPassword')}
          />
          {registerForm.formState.errors.confirmPassword && (
            <p className="text-sm text-red-500">
              {registerForm.formState.errors.confirmPassword.message}
            </p>
          )}
        </div>
      )}

      <Button type="submit" className="w-full">
        {isLogin ? 'Sign In' : 'Sign Up'}
      </Button>

      <p className="text-center text-sm">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="text-primary hover:underline"
        >
          {isLogin ? 'Create an account' : 'Sign in'}
        </button>
      </p>
    </form>
  )
} 