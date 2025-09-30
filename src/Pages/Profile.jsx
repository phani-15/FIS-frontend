    import React, { useEffect, useState } from "react";

    export default function ProfilePage() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    // Dummy JSON data
    const dummyData = {
        profile: {
        name: "Dr. P.Aruna Kumari",
        role: "Professor @ JNTUGV",
        avatar: "https://jntugvcev.edu.in/wp-content/uploads/2020/08/6.-P-Aruna-Kumari-JNTUK-UCEV.jpg   ",
        },
        message:
        "I believe in empowering students through interactive learning and real-world problem solving.",
        personalInfo: {
        email: "ananya.sharma@university.edu",
        phone: "+91 9876543210",
        location: "Delhi, India",
        joinedDate: "Aug 2015",
        },
        education: [
        {
            degree: "Ph.D. in Computer Science",
            institution: "IIT Delhi",
            year: "2014",
        },
        {
            degree: "M.Tech in Computer Engineering",
            institution: "NIT Trichy",
            year: "2009",
        },
        {
            degree: "B.Tech in Information Technology",
            institution: "Delhi University",
            year: "2007",
        },
        ],
        professionalExperience: [
        {
            role: "Associate Professor",
            institution: "ABC University",
            years: "2018 - Present",
        },
        {
            role: "Assistant Professor",
            institution: "XYZ College",
            years: "2014 - 2018",
        },
        ],
        adminServiceThis: [
        "Head of Department, Computer Science (2021 - Present)",
        "Member, Curriculum Development Committee",
        ],
        adminServiceOther: [
        "Reviewer, International Journal of AI Research",
        "Advisor, National Education Policy Taskforce",
        ],
        researchInterests: [
        "Artificial Intelligence & Machine Learning",
        "Natural Language Processing",
        "Educational Technology",
        "Big Data Analytics",
        ],
    };

    // Simulate API call
    useEffect(() => {
        setTimeout(() => {
        setProfile(dummyData);
        setLoading(false);
        }, 1000);
    }, []);

    if (loading) {
        return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex flex-col items-center p-6">
        {/* Profile Card */}
        <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-6xl w-full flex justify-around">
            {/* Header */}
            <div className="flex flex-col items-center mt-[15%]">
            <img
                src={profile.profile.avatar}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-blue-400 shadow-md"
            />
            <h1 className="mt-4 text-2xl font-bold text-gray-800">
                {profile.profile.name}
            </h1>
            <p className="text-gray-500">{profile.profile.role}</p>
            </div>
            <div >
            {/* Message */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg shadow-inner">
            <h2 className="text-lg font-semibold text-gray-700">Message</h2>
            <p className="mt-2 text-gray-600 italic">"{profile.message}"</p>
            </div>

            {/* Personal Info */}
            <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-700">
                Personal Information
            </h2>
            <div className="mt-3 space-y-2 text-gray-600">
                <p>
                <span className="font-medium">Email:</span>{" "}
                {profile.personalInfo.email}
                </p>
                <p>
                <span className="font-medium">Phone:</span>{" "}
                {profile.personalInfo.phone}
                </p>
                <p>
                <span className="font-medium">Location:</span>{" "}
                {profile.personalInfo.location}
                </p>
                <p>
                <span className="font-medium">Joined:</span>{" "}
                {profile.personalInfo.joinedDate}
                </p>
            </div>
            </div>

            {/* Education */}
            <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-700">
                Educational Qualifications
            </h2>
            <ul className="mt-3 space-y-2 text-gray-600">
                {profile.education.map((edu, idx) => (
                <li key={idx} className="border-b pb-2">
                    <p className="font-medium">{edu.degree}</p>
                    <p>
                    {edu.institution} – {edu.year}
                    </p>
                </li>
                ))}
            </ul>
            </div>

            {/* Professional Experience */}
            <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-700">
                Professional (Research/Teaching) Experience
            </h2>
            <ul className="mt-3 space-y-2 text-gray-600">
                {profile.professionalExperience.map((exp, idx) => (
                <li key={idx} className="border-b pb-2">
                    <p className="font-medium">{exp.role}</p>
                    <p>
                    {exp.institution} – {exp.years}
                    </p>
                </li>
                ))}
            </ul>
            </div>

            {/* Administrative Service (This Institution) */}
            <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-700">
                Administrative Service in this Institution
            </h2>
            <ul className="mt-3 list-disc list-inside text-gray-600">
                {profile.adminServiceThis.map((service, idx) => (
                <li key={idx}>{service}</li>
                ))}
            </ul>
            </div>

            {/* Administrative Service (Other Institutions) */}
            <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-700">
                Administrative Service to Other Institutions
            </h2>
            <ul className="mt-3 list-disc list-inside text-gray-600">
                {profile.adminServiceOther.map((service, idx) => (
                <li key={idx}>{service}</li>
                ))}
            </ul>
            </div>

            {/* Research Interests */}
            <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-700">
                Research Interests
            </h2>
            <ul className="mt-3 list-disc list-inside text-gray-600">
                {profile.researchInterests.map((interest, idx) => (
                <li key={idx}>{interest}</li>
                ))}
            </ul>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex justify-center space-x-4">
            <button className="px-4 py-2 rounded-lg bg-blue-500 text-white shadow hover:bg-blue-600 transition">
                Edit Profile
            </button>
            <button className="px-4 py-2 rounded-lg bg-red-500 text-white shadow hover:bg-red-600 transition">
                Logout
            </button>
            </div>
            </div>
        </div>
        </div>
    );
    }
