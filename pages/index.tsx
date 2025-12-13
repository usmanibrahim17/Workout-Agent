'use client';

import Link from 'next/link';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Dumbbell, Zap, Target, TrendingUp } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Dumbbell className="w-6 h-6 text-cyan-400" />
            <span className="text-xl font-bold text-white">WorkoutAI</span>
          </div>
          <div>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="px-6 py-2 text-white hover:text-cyan-400 transition-colors font-medium">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <div className="flex items-center gap-4">
                <Link 
                  href="/product" 
                  className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-lg transition-colors"
                >
                  Go to App
                </Link>
                <UserButton showName={true} />
              </div>
            </SignedIn>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-32 pb-20 text-center">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Your AI Personal <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Fitness Coach</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Get personalized workout plans in seconds. Just tell us about yourself and let AI create the perfect routine tailored to your goals.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-delay">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold rounded-lg transition-all duration-300 text-lg hover:shadow-lg hover:shadow-cyan-500/30">
                Start Free
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link href="/product">
              <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold rounded-lg transition-all duration-300 text-lg hover:shadow-lg hover:shadow-cyan-500/30">
                Generate Workout
              </button>
            </Link>
          </SignedIn>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-20">
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
            <div className="relative bg-slate-900 border border-slate-800 p-8 rounded-lg hover:border-slate-700 transition-all duration-300">
              <Zap className="w-8 h-8 text-cyan-400 mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">AI-Powered</h3>
              <p className="text-gray-400 text-sm">Advanced AI generates personalized plans instantly</p>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
            <div className="relative bg-slate-900 border border-slate-800 p-8 rounded-lg hover:border-slate-700 transition-all duration-300">
              <Target className="w-8 h-8 text-cyan-400 mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Personalized</h3>
              <p className="text-gray-400 text-sm">Plans tailored to your fitness level and goals</p>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
            <div className="relative bg-slate-900 border border-slate-800 p-8 rounded-lg hover:border-slate-700 transition-all duration-300">
              <TrendingUp className="w-8 h-8 text-cyan-400 mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Progressive</h3>
              <p className="text-gray-400 text-sm">Plans that adapt as you progress</p>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
            <div className="relative bg-slate-900 border border-slate-800 p-8 rounded-lg hover:border-slate-700 transition-all duration-300">
              <Dumbbell className="w-8 h-8 text-cyan-400 mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Flexible</h3>
              <p className="text-gray-400 text-sm">Works with any equipment or fitness level</p>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 max-w-4xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">1</div>
              <h3 className="text-lg font-semibold text-white mb-2">Tell Us About You</h3>
              <p className="text-gray-400">Share your age, fitness level, goals, and available time</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">2</div>
              <h3 className="text-lg font-semibold text-white mb-2">AI Creates Plan</h3>
              <p className="text-gray-400">Our AI generates a personalized workout in seconds</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">3</div>
              <h3 className="text-lg font-semibold text-white mb-2">Start Training</h3>
              <p className="text-gray-400">Follow your custom plan and achieve your goals</p>
            </div>
          </div>
        </div>

        {/* Pricing Preview */}
        <div className="max-w-2xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Simple Pricing</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Free Tier */}
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-8">
              <h3 className="text-xl font-bold text-white mb-2">Free</h3>
              <p className="text-gray-400 mb-6">Perfect to get started</p>
              <p className="text-3xl font-bold text-white mb-6">$0<span className="text-lg text-gray-400">/month</span></p>
              <ul className="space-y-3 mb-8 text-gray-300">
                <li className="flex items-center gap-2">✓ 2 workouts per month</li>
                <li className="flex items-center gap-2">✓ Basic personalization</li>
                <li className="flex items-center gap-2">✓ All equipment types</li>
              </ul>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="w-full px-6 py-3 border border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 font-semibold rounded-lg transition-colors">
                    Get Started
                  </button>
                </SignInButton>
              </SignedOut>
            </div>

            {/* Premium Tier */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-cyan-500 rounded-lg p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-cyan-500 text-white px-3 py-1 rounded-full text-sm font-semibold">Popular</div>
              <h3 className="text-xl font-bold text-white mb-2">Premium</h3>
              <p className="text-gray-400 mb-6">For serious fitness enthusiasts</p>
              <p className="text-3xl font-bold text-white mb-6">$9.99<span className="text-lg text-gray-400">/month</span></p>
              <ul className="space-y-3 mb-8 text-gray-300">
                <li className="flex items-center gap-2">✓ Unlimited workouts</li>
                <li className="flex items-center gap-2">✓ Save favorites</li>
                <li className="flex items-center gap-2">✓ Workout history</li>
                <li className="flex items-center gap-2">✓ Progressive overload</li>
              </ul>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 font-semibold rounded-lg transition-colors">
                    Start Premium
                  </button>
                </SignInButton>
              </SignedOut>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInDelay {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
        
        .animate-fade-in-delay {
          animation: fadeInDelay 0.6s ease-out 0.2s both;
        }
      `}</style>
    </main>
  );
}