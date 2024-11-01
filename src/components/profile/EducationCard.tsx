import { GraduationCap } from 'lucide-react';
import type { Education } from '../../types';

interface EducationCardProps {
  education: Education[];
}

export default function EducationCard({ education }: EducationCardProps) {
  return (
    <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
        <GraduationCap className="h-5 w-5 mr-2 text-indigo-600" />
        Education
      </h3>
      <div className="space-y-6">
        {education.map((edu, index) => (
          <div key={index} className="relative pl-8">
            <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-indigo-600"></div>
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                    {edu.school}
                  </h4>
                  <p className="text-indigo-600 dark:text-indigo-400">{edu.degree}</p>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">{edu.duration}</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300">GPA: {edu.gpa}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}