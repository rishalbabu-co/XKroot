import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, DollarSign, Clock, Users, Building2, Briefcase, MessageCircle, ArrowLeft } from 'lucide-react';
import { useJobStore } from '../stores/jobStore';
import SaveJobButton from '../components/SaveJobButton';
import JobApplicationModal from '../components/JobApplicationModal';
import { useState } from 'react';

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { jobs } = useJobStore();
  const [showApplication, setShowApplication] = useState(false);

  const job = jobs.find(j => j.id === id);

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-900 pt-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Job Not Found
          </h1>
          <button
            onClick={() => navigate('/jobs')}
            className="text-indigo-600 hover:text-indigo-500 flex items-center justify-center space-x-2"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Jobs</span>
          </button>
        </div>
      </div>
    );
  }

  const handleStartChat = () => {
    const event = new CustomEvent('startChat', { 
      detail: { 
        recipientId: job.id,
        recipientName: job.company,
        recipientPhoto: job.logo,
        context: `Regarding ${job.title} position`
      } 
    });
    window.dispatchEvent(event);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/jobs')}
          className="flex items-center text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 mb-8 group"
        >
          <ArrowLeft className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" />
          Back to Jobs
        </button>

        {/* Header */}
        <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <img
                src={job.logo}
                alt={`${job.company} logo`}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {job.title}
                </h1>
                <p className="text-lg text-indigo-600 dark:text-indigo-400">{job.company}</p>
              </div>
            </div>
            <SaveJobButton job={job} />
          </div>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <MapPin className="h-5 w-5 mr-2" />
              {job.location}
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <DollarSign className="h-5 w-5 mr-2" />
              {job.salary}
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <Clock className="h-5 w-5 mr-2" />
              {job.posted}
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <Users className="h-5 w-5 mr-2" />
              {job.applicants} applicants
            </div>
          </div>

          <div className="mt-6 flex space-x-4">
            <button
              onClick={() => setShowApplication(true)}
              className="bg-[#00a70c] text-white px-6 py-2 rounded-md hover:bg-[#008a0a] transition-colors duration-200"
            >
              Apply Now
            </button>
            <button
              onClick={handleStartChat}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors duration-200"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Message Recruiter</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Job Description
              </h2>
              <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
                {job.description}
              </p>
            </div>

            <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Requirements
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                {job.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Job Overview
              </h2>
              <div className="space-y-4">
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Building2 className="h-5 w-5 mr-3" />
                  <div>
                    <p className="text-sm font-medium">Experience Level</p>
                    <p>{job.experienceLevel}</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Briefcase className="h-5 w-5 mr-3" />
                  <div>
                    <p className="text-sm font-medium">Job Type</p>
                    <p>{job.type}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Benefits
              </h2>
              <div className="flex flex-wrap gap-2">
                {job.benefits.map((benefit, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm"
                  >
                    {benefit}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <JobApplicationModal
        job={job}
        isOpen={showApplication}
        onClose={() => setShowApplication(false)}
      />
    </div>
  );
}