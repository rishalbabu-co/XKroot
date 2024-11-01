import { MapPin, Briefcase, GraduationCap, Mail, Calendar, ExternalLink, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import type { Profile } from '../types';

interface CandidateCardProps {
  candidate: Profile;
}

export default function CandidateCard({ candidate }: CandidateCardProps) {
  const latestExperience = candidate.experience[0];
  const latestEducation = candidate.education[0];
  const [showChat, setShowChat] = useState(false);

  const handleStartChat = () => {
    // This will trigger the chat widget to open with this candidate
    const event = new CustomEvent('startChat', { 
      detail: { 
        recipientId: candidate.id,
        recipientName: candidate.name,
        recipientPhoto: candidate.photo
      } 
    });
    window.dispatchEvent(event);
  };

  return (
    <div className="bg-white dark:bg-dark-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
      <div className="p-6">
        <div className="flex items-start space-x-4">
          <img
            src={candidate.photo}
            alt={candidate.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {candidate.name}
                </h3>
                <p className="text-indigo-600 dark:text-indigo-400">
                  {candidate.title}
                </p>
              </div>
              <div className="flex space-x-2">
                {candidate.preferences.jobTypes.map((type, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>

            <p className="mt-2 text-gray-600 dark:text-gray-300 line-clamp-2">
              {candidate.about}
            </p>

            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <MapPin className="h-4 w-4 mr-2" />
                <span className="text-sm">{candidate.location}</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Briefcase className="h-4 w-4 mr-2" />
                <span className="text-sm">{latestExperience?.company}</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <GraduationCap className="h-4 w-4 mr-2" />
                <span className="text-sm">{latestEducation?.degree}</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Calendar className="h-4 w-4 mr-2" />
                <span className="text-sm">Available Now</span>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  >
                    {skill.name}
                    <span className="ml-1 text-blue-600 dark:text-blue-300">
                      • {skill.level}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Preferred salary: ${(candidate.preferences.minSalary / 1000).toFixed(0)}k+
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {candidate.preferences.remotePreference} work
            </span>
          </div>
          <div className="flex space-x-4">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-dark-700 hover:bg-gray-50 dark:hover:bg-dark-600">
              <ExternalLink className="h-4 w-4 mr-2" />
              View Profile
            </button>
            <button
              onClick={handleStartChat}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}