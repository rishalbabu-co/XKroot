import { Briefcase } from 'lucide-react';
import type { Experience } from '../../types';

interface ExperienceCardProps {
  experience: Experience[];
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
        <Briefcase className="h-5 w-5 mr-2 text-indigo-600" />
        Professional Experience
      </h3>
      <div className="space-y-6">
        {experience.map((exp, index) => (
          <div key={index} className="relative pl-8 pb-6 last:pb-0">
            <div className="absolute left-0 top-0 h-full w-px bg-indigo-200 dark:bg-indigo-900"></div>
            <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-indigo-600"></div>
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                    {exp.position}
                  </h4>
                  <p className="text-indigo-600 dark:text-indigo-400">{exp.company}</p>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">{exp.duration}</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{exp.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}