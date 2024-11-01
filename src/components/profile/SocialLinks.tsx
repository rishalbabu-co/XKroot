import { Globe, Github, Linkedin } from 'lucide-react';
import type { SocialLinks } from '../../types';

interface SocialLinksCardProps {
  socialLinks: SocialLinks;
}

export default function SocialLinksCard({ socialLinks }: SocialLinksCardProps) {
  return (
    <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Connect</h3>
      <div className="space-y-3">
        {socialLinks.website && (
          <a
            href={socialLinks.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            <Globe className="h-5 w-5 mr-3" />
            Portfolio Website
          </a>
        )}
        {socialLinks.github && (
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            <Github className="h-5 w-5 mr-3" />
            GitHub Profile
          </a>
        )}
        {socialLinks.linkedin && (
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            <Linkedin className="h-5 w-5 mr-3" />
            LinkedIn Profile
          </a>
        )}
      </div>
    </div>
  );
}