import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin, Globe, Github, Linkedin, MessageCircle, Download, Award, Star } from 'lucide-react';
import type { Profile } from '../types';

// This would typically come from your API/database
const SAMPLE_PROFILE: Profile = {
  id: '1',
  userId: 'user1',
  name: 'Sarah Chen',
  title: 'Senior Frontend Developer',
  photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
  location: 'San Francisco, CA',
  bio: 'Passionate frontend developer with 6+ years of experience building scalable web applications. Specialized in React and TypeScript.',
  email: 'sarah@example.com',
  phone: '+1 (555) 123-4567',
  experience: [
    {
      id: 'exp1',
      company: 'TechCorp',
      position: 'Senior Frontend Developer',
      duration: '2020 - Present',
      description: 'Leading frontend development team, implementing microservices architecture'
    },
    {
      id: 'exp2',
      company: 'StartupX',
      position: 'Software Engineer',
      duration: '2018 - 2020',
      description: 'Developed core product features using React and Node.js'
    }
  ],
  education: [
    {
      id: 'edu1',
      school: 'University of California, Berkeley',
      degree: 'B.S. Computer Science',
      duration: '2014 - 2018',
      gpa: '3.8'
    }
  ],
  skills: [
    { name: 'React', level: 95 },
    { name: 'TypeScript', level: 90 },
    { name: 'GraphQL', level: 85 },
    { name: 'Node.js', level: 80 },
    { name: 'AWS', level: 75 }
  ],
  languages: [
    { name: 'English', level: 'Native' },
    { name: 'Mandarin', level: 'Fluent' }
  ],
  socialLinks: {
    website: 'https://sarahchen.dev',
    github: 'https://github.com/sarahchen',
    linkedin: 'https://linkedin.com/in/sarahchen'
  }
};

export default function ProfileDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile] = useState<Profile>(SAMPLE_PROFILE);

  const handleStartChat = () => {
    const event = new CustomEvent('startChat', { 
      detail: { 
        recipientId: profile.id,
        recipientName: profile.name,
        recipientPhoto: profile.photo
      } 
    });
    window.dispatchEvent(event);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/recruiter')}
          className="flex items-center text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 mb-8 group"
        >
          <ArrowLeft className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" />
          Back to Candidates
        </button>

        {/* Profile Header */}
        <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
          <div className="px-6 py-4 sm:px-8 sm:py-6">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div className="sm:flex sm:space-x-5">
                <div className="flex-shrink-0">
                  <img
                    src={profile.photo}
                    alt={profile.name}
                    className="mx-auto h-20 w-20 rounded-full border-4 border-white dark:border-dark-800 -mt-16 object-cover"
                  />
                </div>
                <div className="mt-4 sm:mt-0 text-center sm:text-left">
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white sm:flex sm:items-center">
                    {profile.name}
                  </h1>
                  <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                    {profile.title}
                  </p>
                </div>
              </div>
              <div className="mt-5 flex justify-center sm:mt-0">
                <button
                  onClick={handleStartChat}
                  className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Message Candidate
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Contact Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Mail className="h-5 w-5 mr-3" />
                  <a href={`mailto:${profile.email}`} className="hover:text-indigo-600">
                    {profile.email}
                  </a>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Phone className="h-5 w-5 mr-3" />
                  <a href={`tel:${profile.phone}`} className="hover:text-indigo-600">
                    {profile.phone}
                  </a>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <MapPin className="h-5 w-5 mr-3" />
                  {profile.location}
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Skills
              </h2>
              <div className="space-y-4">
                {profile.skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {skill.name}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-dark-700 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Languages
              </h2>
              <div className="space-y-3">
                {profile.languages.map((language, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between text-gray-600 dark:text-gray-400"
                  >
                    <span>{language.name}</span>
                    <span className="text-sm">{language.level}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Social Links
              </h2>
              <div className="space-y-3">
                {profile.socialLinks.website && (
                  <a
                    href={profile.socialLinks.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-600 dark:text-gray-400 hover:text-indigo-600"
                  >
                    <Globe className="h-5 w-5 mr-3" />
                    Portfolio Website
                  </a>
                )}
                {profile.socialLinks.github && (
                  <a
                    href={profile.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-600 dark:text-gray-400 hover:text-indigo-600"
                  >
                    <Github className="h-5 w-5 mr-3" />
                    GitHub Profile
                  </a>
                )}
                {profile.socialLinks.linkedin && (
                  <a
                    href={profile.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-600 dark:text-gray-400 hover:text-indigo-600"
                  >
                    <Linkedin className="h-5 w-5 mr-3" />
                    LinkedIn Profile
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                About
              </h2>
              <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
                {profile.bio}
              </p>
            </div>

            {/* Experience */}
            <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Experience
              </h2>
              <div className="space-y-6">
                {profile.experience.map((exp, index) => (
                  <div key={index} className="relative pl-8 pb-6 last:pb-0">
                    <div className="absolute left-0 top-0 h-full w-px bg-indigo-200 dark:bg-indigo-900"></div>
                    <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-indigo-600"></div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                            {exp.position}
                          </h3>
                          <p className="text-indigo-600 dark:text-indigo-400">{exp.company}</p>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {exp.duration}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Education
              </h2>
              <div className="space-y-6">
                {profile.education.map((edu, index) => (
                  <div key={index} className="relative pl-8">
                    <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-indigo-600"></div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                            {edu.school}
                          </h3>
                          <p className="text-indigo-600 dark:text-indigo-400">{edu.degree}</p>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {edu.duration}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">GPA: {edu.gpa}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}