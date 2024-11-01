import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ArrowLeft } from 'lucide-react';
import PersonalInfo from '../components/profile/PersonalInfo';
import SkillsCard from '../components/profile/SkillsCard';
import LanguagesCard from '../components/profile/LanguagesCard';
import SocialLinksCard from '../components/profile/SocialLinks';
import ExperienceCard from '../components/profile/ExperienceCard';
import EducationCard from '../components/profile/EducationCard';
import BioCard from '../components/profile/BioCard';
import ProfileHeader from '../components/profile/ProfileHeader';
import type { Profile as ProfileType } from '../types';

type EditableFields = {
  [K in keyof Partial<ProfileType>]: string;
};

export default function Profile() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempValues, setTempValues] = useState<EditableFields>({});

  const [profile] = useState<ProfileType>({
    name: 'Alex Thompson',
    title: 'Senior Software Engineer',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    location: 'San Francisco, CA',
    bio: 'Passionate software engineer with expertise in full-stack development. Love building scalable applications and mentoring junior developers.',
    email: currentUser?.email || 'alex@example.com',
    phone: '+1 (555) 123-4567',
    experience: [
      {
        company: 'TechCorp',
        position: 'Senior Software Engineer',
        duration: '2020 - Present',
        description: 'Leading frontend development team, implementing microservices architecture'
      },
      {
        company: 'StartupX',
        position: 'Software Engineer',
        duration: '2018 - 2020',
        description: 'Developed core product features using React and Node.js'
      }
    ],
    education: [
      {
        school: 'University of California, Berkeley',
        degree: 'B.S. Computer Science',
        duration: '2014 - 2018',
        gpa: '3.8'
      }
    ],
    skills: [
      { name: 'React', level: 95 },
      { name: 'Node.js', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'GraphQL', level: 80 },
      { name: 'AWS', level: 75 }
    ],
    languages: [
      { name: 'English', level: 'Native' },
      { name: 'Spanish', level: 'Professional' },
      { name: 'Mandarin', level: 'Conversational' }
    ],
    socialLinks: {
      website: 'https://alexthompson.dev',
      github: 'https://github.com/alexthompson',
      linkedin: 'https://linkedin.com/in/alexthompson'
    }
  });

  const handleEdit = (field: string, value: string) => {
    setEditingField(field);
    setTempValues(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = (field: string) => {
    setEditingField(null);
    // Here you would typically make an API call to update the profile
    console.log('Saving field:', field, 'with value:', tempValues[field]);
  };

  const handleCancel = () => {
    setEditingField(null);
    setTempValues({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-dark-900 dark:to-indigo-950">
      <button
        onClick={() => navigate('/')}
        className="fixed top-20 left-4 md:left-8 flex items-center text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 group z-10"
      >
        <ArrowLeft className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" />
        Back to Jobs
      </button>

      <div className="max-w-6xl mx-auto pt-16 px-4 sm:px-6 lg:px-8">
        <ProfileHeader
          photo={profile.photo}
          name={profile.name}
          isEditing={isEditing}
          onToggleEdit={() => setIsEditing(!isEditing)}
        />

        <div className="mt-24 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-6">
            <PersonalInfo
              profile={profile}
              isEditing={isEditing}
              editingField={editingField}
              tempValues={tempValues}
              onEdit={handleEdit}
              onSave={handleSave}
              onCancel={handleCancel}
            />
            <SkillsCard skills={profile.skills} isEditing={isEditing} />
            <LanguagesCard languages={profile.languages} isEditing={isEditing} />
            <SocialLinksCard socialLinks={profile.socialLinks} isEditing={isEditing} />
          </div>

          <div className="lg:col-span-2 space-y-6">
            <BioCard
              bio={profile.bio}
              isEditing={isEditing}
              editingField={editingField}
              tempValues={tempValues}
              onEdit={handleEdit}
              onSave={handleSave}
              onCancel={handleCancel}
            />
            <ExperienceCard experience={profile.experience} isEditing={isEditing} />
            <EducationCard education={profile.education} isEditing={isEditing} />
          </div>
        </div>
      </div>
    </div>
  );
}