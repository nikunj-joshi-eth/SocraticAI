import React, { useState, useEffect } from 'react';
import { Trophy, Award, Sparkles, Zap, Target, Stethoscope, Compass } from 'lucide-react';
import { useExam } from '../context/ExamContext';

const TOP_PRIZES = [
  {
    rank: 1,
    badge: '🥇 RANK 1',
    title: 'Gold Champion Badge + Lifetime Pro Access',
    description: 'Lifetime Free SocraticAI Pro Pass + Featured Spotlight Profile + Hall of Fame Digital Certificate ($0 Cost).',
    gradient: 'from-amber-500/20 via-yellow-500/10 to-amber-900/20',
    borderColor: 'border-amber-500/40',
    textColor: 'text-amber-400',
    iconColor: 'text-amber-400'
  },
  {
    rank: 2,
    badge: '🥈 RANK 2',
    title: '1-Year Free Pro Pass + Master Formula PDFs',
    description: '12 Months Free Unlimited Doubt Resolution + Exclusive Formula Cheat Sheets PDF Package ($0 Cost).',
    gradient: 'from-slate-400/20 via-slate-300/10 to-slate-800/20',
    borderColor: 'border-slate-400/40',
    textColor: 'text-slate-300',
    iconColor: 'text-slate-300'
  },
  {
    rank: 3,
    badge: '🥉 RANK 3',
    title: '6-Month Free Pro Pass + Verified Scholar Badge',
    description: '6 Months Free Unlimited Doubt Resolution + Verified Scholar Digital Badge & Certificate ($0 Cost).',
    gradient: 'from-amber-700/20 via-orange-600/10 to-amber-950/20',
    borderColor: 'border-amber-700/40',
    textColor: 'text-amber-600',
    iconColor: 'text-amber-600'
  }
];

const JEE_LEADERBOARD_STUDENTS = [
  { rank: 1, name: 'Aarav Sharma', exam: 'JEE Advanced', college: 'IIT Bombay (CSE)', xp: 4850, streak: 14, accuracy: '94.5%' },
  { rank: 2, name: 'Rohan Gupta', exam: 'JEE Main', college: 'NIT Trichy (CSE)', xp: 3980, streak: 9, accuracy: '89.2%' },
  { rank: 3, name: 'Vikramaditya Verma', exam: 'JEE Advanced', college: 'IIT Delhi (Electrical)', xp: 3120, streak: 6, accuracy: '85.0%' },
  { rank: 4, name: 'Siddharth Nambiar', exam: 'JEE Advanced', college: 'IIT Madras (Mechanical)', xp: 2890, streak: 5, accuracy: '83.4%' },
  { rank: 5, name: 'Kavya Deshmukh', exam: 'JEE Main', college: 'IIIT Hyderabad', xp: 2650, streak: 4, accuracy: '82.1%' },
];

const NEET_LEADERBOARD_STUDENTS = [
  { rank: 1, name: 'Ananya Patel', exam: 'NEET UG', college: 'AIIMS New Delhi', xp: 4920, streak: 16, accuracy: '96.2%' },
  { rank: 2, name: 'Priyanjali Sen', exam: 'NEET UG', college: 'JIPMER Puducherry', xp: 4150, streak: 11, accuracy: '91.5%' },
  { rank: 3, name: 'Devansh Reddy', exam: 'NEET UG', college: 'KGMU Lucknow', xp: 3760, streak: 8, accuracy: '88.7%' },
  { rank: 4, name: 'Meera Krishnan', exam: 'NEET UG', college: 'MMC Chennai', xp: 3320, streak: 7, accuracy: '86.4%' },
  { rank: 5, name: 'Ishaan Choudhury', exam: 'NEET UG', college: 'VMMC New Delhi', xp: 2980, streak: 5, accuracy: '84.1%' },
];

export default function LeaderboardSection() {
  const { targetExam } = useExam();
  const [activeLeaderboardTab, setActiveLeaderboardTab] = useState('JEE');

  // Sync leaderboard tab with active target exam
  useEffect(() => {
    if (targetExam.includes('NEET')) {
      setActiveLeaderboardTab('NEET');
    } else {
      setActiveLeaderboardTab('JEE');
    }
  }, [targetExam]);

  const activeStudents = activeLeaderboardTab === 'NEET' ? NEET_LEADERBOARD_STUDENTS : JEE_LEADERBOARD_STUDENTS;

  return (
    <section id="leaderboard" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
          <Trophy className="w-4 h-4 text-amber-400" />
          <span>All-India Gamified Leaderboard</span>
        </div>
        
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight mb-4">
          Earn XP, Conquer Doubts & Win <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">Digital Legendary Rewards</span>
        </h2>
        
        <p className="text-slate-400 text-base sm:text-lg">
          Solve doubts daily, build streak multipliers, and climb your dedicated exam leaderboard. Top rankers unlock free Lifetime Pro passes, digital badges, and formula guides ($0 cost)!
        </p>
      </div>

      {/* Top 3 Legendary Prizes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 relative z-10">
        {TOP_PRIZES.map((prize) => (
          <div
            key={prize.rank}
            className={`relative p-6 rounded-2xl bg-gradient-to-b ${prize.gradient} border ${prize.borderColor} backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] shadow-2xl flex flex-col justify-between`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-black/40 border ${prize.borderColor} ${prize.textColor}`}>
                  {prize.badge}
                </span>
                <Trophy className={`w-7 h-7 ${prize.iconColor}`} />
              </div>

              <h3 className="text-xl font-bold text-slate-100 mb-2">
                {prize.title}
              </h3>
              
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                {prize.description}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Digital Perk
              </span>
              <span className="text-amber-400 font-semibold">100% Free / Instant Unlock</span>
            </div>
          </div>
        ))}
      </div>

      {/* Dedicated Exam Leaderboard Switcher & Table */}
      <div className="relative z-10 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
        
        {/* Switcher Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <Award className="w-6 h-6 text-brand-cyan" />
            <h3 className="text-lg sm:text-xl font-bold text-slate-100">
              {activeLeaderboardTab === 'JEE' ? '⚡ All-India JEE Leaderboard (Main & Advanced)' : '🩺 All-India NEET UG Leaderboard'}
            </h3>
          </div>

          {/* Exam Leaderboard Toggle Buttons */}
          <div className="flex items-center gap-2 bg-[#050508] p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveLeaderboardTab('JEE')}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                activeLeaderboardTab === 'JEE'
                  ? 'bg-brand-violet text-white shadow-glow-violet'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>JEE Aspirants</span>
            </button>

            <button
              onClick={() => setActiveLeaderboardTab('NEET')}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                activeLeaderboardTab === 'NEET'
                  ? 'bg-emerald-600 text-white shadow-glow-emerald'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Stethoscope className="w-3.5 h-3.5" />
              <span>NEET Aspirants</span>
            </button>
          </div>
        </div>

        {/* Dynamic Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="text-xs uppercase bg-slate-800/50 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Target Exam</th>
                <th className="py-3 px-4">Dream College</th>
                <th className="py-3 px-4">Streak</th>
                <th className="py-3 px-4 text-right">Total XP Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {activeStudents.map((student) => (
                <tr key={student.rank} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-4 px-4 font-bold">
                    {student.rank === 1 && <span className="text-amber-400">🥇 #1</span>}
                    {student.rank === 2 && <span className="text-slate-300">🥈 #2</span>}
                    {student.rank === 3 && <span className="text-amber-600">🥉 #3</span>}
                    {student.rank > 3 && <span className="text-slate-500">#{student.rank}</span>}
                  </td>
                  <td className="py-4 px-4 font-semibold text-slate-100">
                    {student.name}
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-medium border ${
                      activeLeaderboardTab === 'NEET'
                        ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400'
                        : 'bg-brand-violet/20 border-brand-violet/30 text-brand-violet-light'
                    }`}>
                      {student.exam}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-400 flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-brand-cyan" />
                    {student.college}
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1 text-amber-400 font-semibold text-xs bg-amber-500/10 px-2 py-0.5 rounded-full">
                      <Zap className="w-3 h-3 fill-amber-400" /> {student.streak} Days
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right font-mono font-bold text-amber-400">
                    {student.xp.toLocaleString()} XP
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
