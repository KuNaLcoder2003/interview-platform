import { useEffect, useState, type FormEvent } from 'react';
import { Plus, X, Upload, Briefcase, Award, User, MapPin } from 'lucide-react';
import { type Skills_Type, type Work_History_Type, type Details_Type } from "@kunaljprsingh/interview-types";

import { useAuth } from '@clerk/clerk-react';

export default function ProfileForm() {
    const [workHistory, setWorkHistory] = useState<Work_History_Type>([]);
    const [skills, setSkills] = useState<Skills_Type>([]);
    const [avatarPreview, setAvatarPreview] = useState<any>(null);
    const { getToken } = useAuth();
    const [token, setToken] = useState("");
    async function set() {
        const t = await getToken() as string
        setToken(t)
        console.log("Token in FORM : ", t)
    }
    useEffect(() => {
        set()
        // console.log("Token in FORM : ", localStorage.getItem("token"))
    }, [])
    const [details, setDetails] = useState<Details_Type>({
        experience: "",
        current_orgainsation: "",
        role: "",
        user_id: "",
        city: "",
        state: "",
        country: "",
        bio: "",
        achivements: "",
        gender: "",
        resume: ""
    });
    const removeSkill = (id: any) => {
        if (skills.length > 1) {
            setSkills(skills.filter(item => item.user_id !== id));
        }
    };

    const handleAvatarChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const t = await getToken() as string
        console.log(t)


        if (!t || t.length == 0) {
            alert("Invalid");
            return
        }
        console.log('TOken in form', token)
        console.log('req reavhed')
        try {

            if (details.current_orgainsation == "" || details.state == "" || details.experience == "") {
                return
            }
            if (workHistory.length == 0 || skills.length == 0) {
                return
            }
            let final_payload = {
                details: details,
                work_history: workHistory,
                skills: skills
            }
            fetch(import.meta.env.VITE_BACKEND_URL + '/api/v1/user/userDetails', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${t}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(final_payload)
            }).then(async (res: Response) => {
                const data = await res.json();
                console.log(data);
            })
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <form onSubmit={(e) => handleSubmit(e)} className="min-h-screen bg-zinc-950 text-zinc-100 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                        Complete Your Profile
                    </h1>
                    <p className="text-zinc-500">Tell us about yourself and your professional journey</p>
                </div>

                <div className="space-y-8">
                    {/* Avatar Upload Section */}
                    <div className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800">
                        <div className="flex items-center gap-6">
                            <div className="relative">
                                <div className="w-24 h-24 rounded-full bg-zinc-800 border-2 border-zinc-700 flex items-center justify-center overflow-hidden">
                                    {avatarPreview ? (
                                        <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                                    ) : (
                                        <User className="w-10 h-10 text-zinc-600" />
                                    )}
                                </div>
                                <label className="absolute bottom-0 right-0 bg-zinc-700 hover:bg-zinc-600 rounded-full p-2 cursor-pointer transition-colors">
                                    <Upload className="w-4 h-4" />
                                    <input type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
                                </label>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-1">Profile Photo</h3>
                                <p className="text-sm text-zinc-500">Upload a professional photo</p>
                            </div>
                        </div>
                    </div>

                    {/* Personal Information */}
                    <div className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800">
                        <div className="flex items-center gap-3 mb-6">
                            <User className="w-5 h-5 text-zinc-400" />
                            <h2 className="text-xl font-semibold">Personal Information</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-2">Gender</label>
                                <select onChange={(e) => {
                                    setDetails({
                                        ...details,
                                        gender: e.target.value
                                    })
                                }} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent transition-all">
                                    <option value="">Select gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                    <option value="prefer-not-to-say">Prefer not to say</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-2">Experience</label>
                                <input required={true} onChange={(e) => {
                                    setDetails({
                                        ...details,
                                        experience: e.target.value
                                    })
                                }} type="text" placeholder="e.g., 5 years" className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent transition-all" />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-zinc-400 mb-2">Bio</label>
                                <textarea onChange={(e) => {
                                    setDetails({
                                        ...details,
                                        bio: e.target.value
                                    })
                                }} rows={4} placeholder="Tell us about yourself..." className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent transition-all resize-none" />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-zinc-400 mb-2">Achievements</label>
                                <textarea onChange={(e) => {
                                    setDetails({
                                        ...details,
                                        achivements: e.target.value
                                    })
                                }} rows={3} placeholder="Share your key achievements..." className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent transition-all resize-none" />
                            </div>
                        </div>
                    </div>

                    {/* Current Position */}
                    <div className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800">
                        <div className="flex items-center gap-3 mb-6">
                            <Briefcase className="w-5 h-5 text-zinc-400" />
                            <h2 className="text-xl font-semibold">Current Position</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-2">Current Organization</label>
                                <input onChange={(e) => {
                                    setDetails({
                                        ...details,
                                        current_orgainsation: e.target.value,
                                    })
                                }} type="text" placeholder="Company name" className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent transition-all" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-2">Role</label>
                                <input onChange={(e) => {
                                    setDetails({
                                        ...details,
                                        role: e.target.value
                                    })
                                }} type="text" placeholder="Your current role" className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent transition-all" />
                            </div>
                        </div>
                    </div>

                    {/* Location */}
                    <div className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800">
                        <div className="flex items-center gap-3 mb-6">
                            <MapPin className="w-5 h-5 text-zinc-400" />
                            <h2 className="text-xl font-semibold">Location</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-2">City</label>
                                <input onChange={(e) => {
                                    setDetails({
                                        ...details,
                                        city: e.target.value
                                    })
                                }} type="text" placeholder="City" className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent transition-all" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-2">State</label>
                                <input onChange={(e) => {
                                    setDetails({
                                        ...details,
                                        state: e.target.value
                                    })
                                }} type="text" placeholder="State" className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent transition-all" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-2">Country</label>
                                <input onChange={(e) => {
                                    setDetails({
                                        ...details,
                                        country: e.target.value
                                    })
                                }} type="text" placeholder="Country" className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent transition-all" />
                            </div>
                        </div>
                    </div>

                    {/* Work History */}
                    <div className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <Briefcase className="w-5 h-5 text-zinc-400" />
                                <h2 className="text-xl font-semibold">Work History</h2>
                            </div>
                            <div
                                onClick={() => {
                                    setWorkHistory([
                                        ...workHistory,
                                        {
                                            user_id: Date.now().toString(),
                                            organisation_name: "",
                                            role: "",
                                            from: "",
                                            to: "",
                                        },
                                    ]);
                                }}
                                className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                                <span className="text-sm">Add</span>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {workHistory.map((item) => (
                                <div
                                    key={item.user_id}
                                    className="relative bg-zinc-800/50 rounded-xl p-6 border border-zinc-700/50"
                                >
                                    {workHistory.length > 1 && (
                                        <div
                                            onClick={() =>
                                                setWorkHistory(workHistory.filter((w) => w.user_id !== item.user_id))
                                            }
                                            className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-300 transition-colors"
                                        >
                                            <X className="w-5 h-5" />
                                        </div>
                                    )}

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-zinc-400 mb-2">
                                                Organization
                                            </label>
                                            <input
                                                value={item.organisation_name}
                                                onChange={(e) => {
                                                    setWorkHistory((prev) =>
                                                        prev.map((work) =>
                                                            work.user_id === item.user_id
                                                                ? { ...work, organisation_name: e.target.value }
                                                                : work
                                                        )
                                                    );
                                                }}
                                                type="text"
                                                placeholder="Company name"
                                                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent transition-all"
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-zinc-400 mb-2">
                                                Role
                                            </label>
                                            <input
                                                value={item.role}
                                                onChange={(e) => {
                                                    setWorkHistory((prev) =>
                                                        prev.map((work) =>
                                                            work.user_id === item.user_id
                                                                ? { ...work, role: e.target.value }
                                                                : work
                                                        )
                                                    );
                                                }}
                                                type="text"
                                                placeholder="Job title"
                                                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent transition-all"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-zinc-400 mb-2">
                                                From
                                            </label>
                                            <input
                                                value={item.from}
                                                onChange={(e) => {
                                                    setWorkHistory((prev) =>
                                                        prev.map((work) =>
                                                            work.user_id === item.user_id
                                                                ? { ...work, from: e.target.value }
                                                                : work
                                                        )
                                                    );
                                                }}
                                                type="date"
                                                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent transition-all"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-zinc-400 mb-2">
                                                To
                                            </label>
                                            <input
                                                value={item.to}
                                                onChange={(e) => {
                                                    setWorkHistory((prev) =>
                                                        prev.map((work) =>
                                                            work.user_id === item.user_id
                                                                ? { ...work, to: e.target.value }
                                                                : work
                                                        )
                                                    );
                                                }}
                                                type="date"
                                                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>


                    {/* Skills */}
                    <div className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <Award className="w-5 h-5 text-zinc-400" />
                                <h2 className="text-xl font-semibold">Skills</h2>
                            </div>
                            <div onClick={() => {
                                setSkills([
                                    ...skills,
                                    {
                                        user_id: Date.now().toString(),
                                        skill_name: ""
                                    }
                                ])
                            }
                            } className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors">
                                <Plus className="w-4 h-4" />
                                <span className="text-sm">Add</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {skills.map((skill) => (
                                <div key={skill.user_id} className="relative">
                                    <input onChange={(e) => {
                                        setSkills(
                                            prev => prev.map(item => {
                                                if (item.user_id == skill.user_id) {
                                                    return {
                                                        user_id: item.user_id,
                                                        skill_name: e.target.value
                                                    }
                                                } else {
                                                    return item
                                                }
                                            })
                                        )
                                    }} type="text" placeholder="Skill name" className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent transition-all" />
                                    {skills.length > 1 && (
                                        <div onClick={() => removeSkill(skill.user_id)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors">
                                            <X className="w-5 h-5" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Resume Upload */}
                    <div className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800">
                        <div className="flex items-center gap-3 mb-6">
                            <Upload className="w-5 h-5 text-zinc-400" />
                            <h2 className="text-xl font-semibold">Resume</h2>
                        </div>

                        {/* <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer hover:bg-zinc-800/50 transition-colors">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Upload className="w-8 h-8 mb-3 text-zinc-500" />
                                <p className="mb-2 text-sm text-zinc-400">
                                    {resumeFile ? resumeFile : <span><span className="font-semibold">Click to upload</span> or drag and drop</span>}
                                </p>
                                <p className="text-xs text-zinc-500">PDF, DOC, DOCX (MAX. 5MB)</p>
                            </div>
                            <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={handleResumeChange} />
                        </label> */}
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end gap-4">
                        <div className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors">
                            Save as Draft
                        </div>
                        <button type="submit" onClick={() => {

                        }} className="px-8 py-3 bg-zinc-100 text-zinc-900 hover:bg-zinc-200 font-medium rounded-lg transition-colors">
                            Complete Profile
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}