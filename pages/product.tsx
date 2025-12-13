'use client';

import { useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { Protect, PricingTable, UserButton } from '@clerk/nextjs';
import { ArrowRight, Loader2 } from 'lucide-react';

function WorkoutGenerator({ testMode = false }: { testMode?: boolean }) {
  const { getToken } = useAuth();
  
  // Form state
  const [step, setStep] = useState(1);
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [sex, setSex] = useState('');
  const [fitnessLevel, setFitnessLevel] = useState('');
  const [goal, setGoal] = useState('');
  const [availableTime, setAvailableTime] = useState('');
  const [equipment, setEquipment] = useState('');
  
  // Streaming state
  const [workout, setWorkout] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleGenerateWorkout() {
    setWorkout('');
    setLoading(true);
    setStep(2);

    const jwt = await getToken();
    if (!jwt) {
      setWorkout('Authentication required');
      setLoading(false);
      return;
    }

    let buffer = '';
    const controller = new AbortController();

    await fetchEventSource('/api', {
      signal: controller.signal,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        age: parseInt(age),
        weight: parseInt(weight),
        sex,
        fitness_level: fitnessLevel,
        goal,
        available_time: parseInt(availableTime),
        equipment,
      }),
      onmessage(ev) {
        buffer += ev.data;
        setWorkout(buffer);
      },
      onclose() {
        setLoading(false);
      },
      onerror(err) {
        console.error('SSE error:', err);
        controller.abort();
        setLoading(false);
      },
    });
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <UserButton showName={true} />
      
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        {/* Step 1: Form */}
        {step === 1 && (
          <div className="animate-fade-in">
            <div className="mb-12 text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                Create Your <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Workout Plan</span>
              </h1>
              <p className="text-gray-400 text-lg">Tell us about yourself and we'll generate a personalized plan</p>
            </div>

            <div className="space-y-6">
              {/* Age & Weight Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">Age</label>
                  <input
                    type="number"
                    required
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    placeholder="25"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">Weight (lbs)</label>
                  <input
                    type="number"
                    required
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    placeholder="170"
                  />
                </div>
              </div>

              {/* Sex */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Sex</label>
                <select
                  required
                  value={sex}
                  onChange={(e) => setSex(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                >
                  <option value="">Select...</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              {/* Fitness Level */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Fitness Level</label>
                <select
                  required
                  value={fitnessLevel}
                  onChange={(e) => setFitnessLevel(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                >
                  <option value="">Select...</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              {/* Goal */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Fitness Goal</label>
                <select
                  required
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                >
                  <option value="">Select...</option>
                  <option value="Muscle Gain">Muscle Gain</option>
                  <option value="Weight Loss">Weight Loss</option>
                  <option value="Cardio">Cardio</option>
                  <option value="Flexibility">Flexibility</option>
                </select>
              </div>

              {/* Available Time */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Available Time (minutes)</label>
                <select
                  required
                  value={availableTime}
                  onChange={(e) => setAvailableTime(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                >
                  <option value="">Select...</option>
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">60 minutes</option>
                </select>
              </div>

              {/* Equipment */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Equipment</label>
                <select
                  required
                  value={equipment}
                  onChange={(e) => setEquipment(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                >
                  <option value="">Select...</option>
                  <option value="Home">Home (bodyweight)</option>
                  <option value="Gym">Gym (full equipment)</option>
                  <option value="Minimal">Minimal (dumbbells only)</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleGenerateWorkout}
                disabled={!age || !weight || !sex || !fitnessLevel || !goal || !availableTime || !equipment}
                className="w-full mt-8 px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group hover:shadow-lg hover:shadow-cyan-500/20 disabled:cursor-not-allowed"
              >
                Generate My Workout
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Workout Display */}
        {step === 2 && (
          <div className="animate-fade-in">
            <div className="mb-8">
              <button
                onClick={() => setStep(1)}
                className="text-gray-400 hover:text-white transition-colors text-sm mb-6"
              >
                ← Back to Form
              </button>
              <h2 className="text-4xl font-bold text-white mb-2">Your Personalized Workout</h2>
              <p className="text-gray-400">AI-powered plan tailored to your needs</p>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="w-12 h-12 text-cyan-400 animate-spin" />
                <p className="text-gray-300 text-lg">Generating your workout...</p>
              </div>
            ) : (
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-8">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm, remarkBreaks]}
                  components={{
                    h3: ({node, ...props}) => <h3 className="text-xl font-bold text-cyan-400 mt-6 mb-4" {...props} />,
                    strong: ({node, ...props}) => <strong className="text-white font-semibold" {...props} />,
                    p: ({node, ...props}) => <p className="text-gray-300 mb-3" {...props} />,
                    li: ({node, ...props}) => <li className="text-gray-300 ml-6 mb-2" {...props} />,
                  }}
                >
                  {workout}
                </ReactMarkdown>
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}

export default function Product() {
  const [testMode, setTestMode] = useState(false);

  return (
    <main className="min-h-screen bg-slate-950">
      <Protect
        plan="premium_subscription"
        fallback={
          <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
            <div className="max-w-2xl w-full">
              <h1 className="text-5xl font-bold text-white text-center mb-4">
                Upgrade to <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Premium</span>
              </h1>
              <p className="text-gray-400 text-center text-lg mb-12">
                Get unlimited personalized workout plans
              </p>
              <PricingTable />
              <div className="text-center mt-8">
                <button
                  onClick={() => setTestMode(true)}
                  className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 text-sm rounded-lg transition-colors"
                >
                  Test Premium (Demo)
                </button>
              </div>
            </div>
          </div>
        }
      >
        <WorkoutGenerator testMode={testMode} />
      </Protect>
    </main>
  );
}