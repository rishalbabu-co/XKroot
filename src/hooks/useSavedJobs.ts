import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export function useSavedJobs() {
  const { currentUser } = useAuth();
  const [savedJobs, setSavedJobs] = useState<string[]>([]);

  // Load saved jobs from localStorage on mount
  useEffect(() => {
    if (currentUser) {
      const saved = localStorage.getItem(`savedJobs_${currentUser.uid}`);
      if (saved) {
        setSavedJobs(JSON.parse(saved));
      }
    }
  }, [currentUser]);

  // Save to localStorage whenever savedJobs changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`savedJobs_${currentUser.uid}`, JSON.stringify(savedJobs));
    }
  }, [savedJobs, currentUser]);

  const toggleSaveJob = (jobId: string) => {
    setSavedJobs(prev => {
      if (prev.includes(jobId)) {
        return prev.filter(id => id !== jobId);
      }
      return [...prev, jobId];
    });
  };

  const isJobSaved = (jobId: string) => savedJobs.includes(jobId);

  return { savedJobs, toggleSaveJob, isJobSaved };
}