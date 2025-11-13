import { useState } from 'react';
import {
    LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {
    Home, MessageSquare, Trophy, Brain, User, TrendingUp,
    Award,
    Briefcase,
    Building,
    Code
} from 'lucide-react';
import { UserButton } from '@clerk/clerk-react';
type Tabs = "Home" | "Interview" | "Contest" | "AI Insights" | "Profile"

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState<Tabs | string>('Home');

    const lineData = [
        { day: 'Mon', score: 65 },
        { day: 'Tue', score: 72 },
        { day: 'Wed', score: 68 },
        { day: 'Thu', score: 78 },
        { day: 'Fri', score: 85 },
        { day: 'Sat', score: 82 },
        { day: 'Sun', score: 88 }
    ];

    const barData = [
        { category: 'Technical', score: 85 },
        { category: 'Communication', score: 78 },
        { category: 'Problem Solving', score: 92 },
        { category: 'Leadership', score: 70 }
    ];

    const pieData = [
        { name: 'Completed', value: 12 },
        { name: 'In Progress', value: 3 },
        { name: 'Scheduled', value: 5 }
    ];

    const COLORS = ['#10b981', '#f59e0b', '#3b82f6'];

    const navItems = [
        { name: 'Home', icon: Home },
        { name: 'Interview', icon: MessageSquare },
        { name: 'Contest', icon: Trophy },
        { name: 'AI Insights', icon: Brain },
        { name: 'Profile', icon: User }
    ];

    return (
        <div className="min-h-screen bg-transparent text-gray-100 flex min-w-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800/30 backdrop-blur-sm border-r border-gray-700 flex flex-col justify-start p-6 gap-10">
                <div>
                    {/* Nav Buttons */}
                    <nav className="space-y-2">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <button
                                    key={item.name}
                                    onClick={() => setActiveTab(item.name)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === item.name
                                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/20'
                                        : 'text-gray-400 hover:bg-gray-700/50 hover:text-gray-200'
                                        }`}
                                >
                                    <Icon size={20} />
                                    <span className="font-medium">{item.name}</span>
                                </button>
                            );
                        })}
                    </nav>

                    {/* Pie Chart */}
                    <div className="mt-8 bg-gray-800/50 rounded-lg p-4">
                        <h3 className="text-sm font-semibold mb-3 text-gray-300">Interview Status</h3>
                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={40}
                                    outerRadius={70}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}${entry}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1f2937',
                                        border: '1px solid #374151',
                                        borderRadius: '8px'
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="mt-3 space-y-1">
                            {pieData.map((entry, index) => (
                                <div key={entry.name} className="flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                                        <span className="text-gray-400">{entry.name}</span>
                                    </div>
                                    <span className="text-gray-300 font-semibold">{entry.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 👇 Clerk User Button Section */}
                <div className="border-t border-gray-700 pt-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <UserButton afterSignOutUrl="/" />
                        <p className="text-sm text-gray-400">Account</p>
                    </div>
                </div>
            </aside>

            {/* Main Dashboard Content */}
            {
                activeTab == "Home" && (<>
                    <main className="flex-1 p-8">
                        <div className="max-w-7xl mx-auto space-y-6">
                            {/* Header */}
                            <header className="flex items-center justify-between border-b border-gray-700 pb-4">
                                <div>
                                    <p className="text-sm text-gray-400">Welcome Back,</p>
                                    <p className="font-semibold text-lg">Kunal Singh</p>
                                </div>
                                <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-4 py-2 rounded-lg">
                                    <p className="text-xs text-white/80">Streak</p>
                                    <p className="text-xl font-bold">4 days</p>
                                </div>
                            </header>

                            {/* Performance Graphs */}
                            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-semibold">Weekly Performance</h2>
                                    <TrendingUp className="text-green-500" size={24} />
                                </div>
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={lineData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                        <XAxis dataKey="day" stroke="#9ca3af" />
                                        <YAxis stroke="#9ca3af" />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: '#1f2937',
                                                border: '1px solid #374151',
                                                borderRadius: '8px'
                                            }}
                                        />
                                        <Legend />
                                        <Line
                                            type="monotone"
                                            dataKey="score"
                                            stroke="#3b82f6"
                                            strokeWidth={3}
                                            dot={{ fill: '#3b82f6', r: 6 }}
                                            activeDot={{ r: 8 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Skills Bar Chart */}
                            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                                <h2 className="text-xl font-semibold mb-4">Skills Assessment</h2>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={barData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                        <XAxis dataKey="category" stroke="#9ca3af" />
                                        <YAxis stroke="#9ca3af" />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: '#1f2937',
                                                border: '1px solid #374151',
                                                borderRadius: '8px'
                                            }}
                                        />
                                        <Legend />
                                        <Bar dataKey="score" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
                                        <defs>
                                            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#8b5cf6" stopOpacity={1} />
                                                <stop offset="100%" stopColor="#3b82f6" stopOpacity={1} />
                                            </linearGradient>
                                        </defs>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30">
                                    <h3 className="text-sm text-blue-300 mb-2">Total Interviews</h3>
                                    <p className="text-3xl font-bold">20</p>
                                    <p className="text-xs text-gray-400 mt-2">+3 this week</p>
                                </div>
                                <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
                                    <h3 className="text-sm text-purple-300 mb-2">Average Score</h3>
                                    <p className="text-3xl font-bold">78%</p>
                                    <p className="text-xs text-gray-400 mt-2">+5% improvement</p>
                                </div>
                                <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 backdrop-blur-sm rounded-xl p-6 border border-green-500/30">
                                    <h3 className="text-sm text-green-300 mb-2">Success Rate</h3>
                                    <p className="text-3xl font-bold">85%</p>
                                    <p className="text-xs text-gray-400 mt-2">Top 10% of users</p>
                                </div>
                            </div>
                        </div>
                    </main>
                </>)
            }
            {
                activeTab == "Interview" && (<InterviewTab />)
            }
        </div>
    );
};

const InterviewTab = () => {


    const roles = [
        'Frontend Developer',
        'Backend Developer',
        'Full Stack Developer',
        'DevOps Engineer',
        'Data Scientist',
        'Machine Learning Engineer',
        'Mobile Developer',
        'UI/UX Designer',
        'Product Manager',
        'QA Engineer'
    ];

    const experienceLevels = [
        'Fresher (0-1 years)',
        'Junior (1-3 years)',
        'Mid-Level (3-5 years)',
        'Senior (5-8 years)',
        'Lead (8+ years)'
    ];

    const popularTechStacks = [
        'React', 'Angular', 'Vue.js', 'Node.js', 'Python', 'Java',
        'JavaScript', 'TypeScript', 'MongoDB', 'PostgreSQL', 'MySQL',
        'AWS', 'Docker', 'Kubernetes', 'GraphQL', 'REST API',
        'Django', 'Flask', 'Spring Boot', 'Express.js', 'Next.js'
    ];
    return (
        <main className="flex-1 p-8">
            <div className="max-w-4xl mx-auto">
                {/* Page Header */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold mb-2">Setup Your Interview</h2>
                    <p className="text-gray-400">Configure your interview parameters to get started with AI-powered practice</p>
                </div>

                {/* Form Card */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
                    <div className="space-y-6">
                        {/* Role Selection */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold mb-3 text-gray-300">
                                <Briefcase size={18} className="text-blue-400" />
                                Select Role
                            </label>
                            <select className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                                <option value="">Choose a role...</option>
                                {roles.map((role, index) => (
                                    <option key={index} value={role}>{role}</option>
                                ))}
                            </select>
                        </div>

                        {/* Experience Level */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold mb-3 text-gray-300">
                                <Award size={18} className="text-purple-400" />
                                Experience Level
                            </label>
                            <select className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all">
                                <option value="">Select your experience...</option>
                                {experienceLevels.map((level, index) => (
                                    <option key={index} value={level}>{level}</option>
                                ))}
                            </select>
                        </div>

                        {/* Tech Stack */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold mb-3 text-gray-300">
                                <Code size={18} className="text-green-400" />
                                Tech Stack
                            </label>
                            <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-4">
                                <input
                                    type="text"
                                    placeholder="Type or select technologies..."
                                    className="w-full bg-transparent text-gray-100 focus:outline-none mb-3"
                                />
                                <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
                                    {popularTechStacks.map((tech, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            className="px-3 py-1.5 bg-gray-800 hover:bg-blue-600 border border-gray-600 hover:border-blue-500 rounded-full text-xs transition-all"
                                        >
                                            {tech}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">Click on technologies to add them to your stack</p>
                        </div>

                        {/* Organization */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold mb-3 text-gray-300">
                                <Building size={18} className="text-orange-400" />
                                Target Organization (Optional)
                            </label>
                            <input
                                type="text"
                                placeholder="e.g., Google, Microsoft, Startup, etc."
                                className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                            />
                            <p className="text-xs text-gray-500 mt-2">Specify your target company or organization type for tailored questions</p>
                        </div>

                        {/* Additional Notes */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold mb-3 text-gray-300">
                                Additional Notes (Optional)
                            </label>
                            <textarea
                                rows={4}
                                placeholder="Any specific areas you want to focus on..."
                                className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                            ></textarea>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 pt-4">
                            <button
                                type="button"
                                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
                            >
                                Start Interview
                            </button>
                            <button
                                type="button"
                                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-gray-300 font-semibold rounded-lg transition-all"
                            >
                                Save Draft
                            </button>
                        </div>
                    </div>
                </div>

                {/* Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="bg-gradient-to-br from-blue-600/10 to-blue-800/10 backdrop-blur-sm rounded-lg p-4 border border-blue-500/20">
                        <div className="text-2xl mb-2">🎯</div>
                        <h4 className="text-sm font-semibold text-blue-300 mb-1">Personalized</h4>
                        <p className="text-xs text-gray-400">Questions tailored to your profile</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-600/10 to-purple-800/10 backdrop-blur-sm rounded-lg p-4 border border-purple-500/20">
                        <div className="text-2xl mb-2">🤖</div>
                        <h4 className="text-sm font-semibold text-purple-300 mb-1">AI-Powered</h4>
                        <p className="text-xs text-gray-400">Real-time feedback and analysis</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-600/10 to-green-800/10 backdrop-blur-sm rounded-lg p-4 border border-green-500/20">
                        <div className="text-2xl mb-2">📊</div>
                        <h4 className="text-sm font-semibold text-green-300 mb-1">Track Progress</h4>
                        <p className="text-xs text-gray-400">Monitor your improvement over time</p>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Dashboard;
