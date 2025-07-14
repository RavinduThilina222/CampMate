import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        // Simulate login logic
        setTimeout(() => {
            setLoading(false)
            if (email === 'ravinduthilina222@gmail.com' && password === '123456') {
                navigate('/')
            } else {
                setError('Invalid email or password')
            }
        }, 1000)
    }

    
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 relative overflow-hidden">
            {/* Camping Tent SVG Background */}
            <div className="absolute inset-0 flex items-end justify-center pointer-events-none select-none">
                <svg width="400" height="220" viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-30">
                    <ellipse cx="200" cy="210" rx="180" ry="20" fill="#2563eb" />
                    <polygon points="200,40 340,210 60,210" fill="#1e40af" />
                    <polygon points="200,60 320,210 200,210" fill="#3b82f6" />
                    <polygon points="200,60 80,210 200,210" fill="#60a5fa" />
                    <rect x="190" y="120" width="20" height="90" fill="#1e293b" rx="5" />
                </svg>
            </div>

            <form
                onSubmit={handleSubmit}
                className="relative z-10 bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 w-full max-w-md flex flex-col gap-6 border border-blue-500/30"
            >
                <div className="flex flex-col items-center mb-2">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <ellipse cx="24" cy="44" rx="20" ry="4" fill="#2563eb" />
                        <polygon points="24,8 40,44 8,44" fill="#1e40af" />
                        <polygon points="24,14 36,44 24,44" fill="#3b82f6" />
                        <polygon points="24,14 12,44 24,44" fill="#60a5fa" />
                        <rect x="22" y="28" width="4" height="16" fill="#1e293b" rx="1" />
                    </svg>
                    <h1 className="text-2xl font-bold text-white mt-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                        CampMate Admin Login
                    </h1>
                </div>
                {error && (
                    <div className="bg-red-500/20 text-red-200 text-sm rounded p-2 text-center">
                        {error}
                    </div>
                )}
                <div className="flex flex-col gap-4">
                    <div className="relative">
                        <EnvelopeIcon className="w-5 h-5 absolute left-3 top-3 text-blue-300" />
                        <input
                            type="email"
                            required
                            placeholder="Email"
                            className="w-full pl-10 pr-4 py-3 rounded-lg bg-blue-900/40 text-white placeholder-blue-200 border border-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            autoComplete="username"
                        />
                    </div>
                    <div className="relative">
                        <LockClosedIcon className="w-5 h-5 absolute left-3 top-3 text-blue-300" />
                        <input
                            type="password"
                            required
                            placeholder="Password"
                            className="w-full pl-10 pr-4 py-3 rounded-lg bg-blue-900/40 text-white placeholder-blue-200 border border-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            autoComplete="current-password"
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="mt-2 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold py-3 rounded-lg shadow-lg transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-60"
                >
                    {loading ? (
                        <svg className="animate-spin h-5 w-5 text-blue-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                        </svg>
                    ) : (
                        <>
                            <LockClosedIcon className="w-5 h-5 text-blue-200" />
                            Login
                        </>
                    )}
                </button>
                <div className="text-center text-blue-200 text-xs mt-2">
                    &copy; {new Date().getFullYear()} CampMate Admin v1.0.0
                </div>
            </form>
        </div>
    )
}

export default Login