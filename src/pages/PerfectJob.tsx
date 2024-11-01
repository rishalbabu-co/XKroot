import { useState, useRef } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { Heart, X, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useJobStore } from '../stores/jobStore';
import { useSavedJobs } from '../hooks/useSavedJobs';
import SwipeableJobCard from '../components/perfect-job/SwipeableJobCard';
import EmptyState from '../components/perfect-job/EmptyState';
import type { Job } from '../types';

export default function PerfectJob() {
  const navigate = useNavigate();
  const { jobs } = useJobStore();
  const { toggleSaveJob } = useSavedJobs();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exitX, setExitX] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const currentJob = jobs[currentIndex];

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 100;
    if (Math.abs(info.offset.x) > threshold) {
      setExitX(info.offset.x);
      if (info.offset.x > 0) {
        handleLike();
      } else {
        handleSkip();
      }
    }
  };

  const handleLike = () => {
    if (currentJob) {
      toggleSaveJob(currentJob.id);
      setExitX(1000);
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
        setExitX(0);
      }, 200);
    }
  };

  const handleSkip = () => {
    setExitX(-1000);
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setExitX(0);
    }, 200);
  };

  if (currentIndex >= jobs.length) {
    return <EmptyState onReset={() => setCurrentIndex(0)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 pt-16">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/jobs')}
            className="flex items-center text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 group"
          >
            <ArrowLeft className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Jobs
          </button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Perfect Job
          </h1>
        </div>

        {/* Card Stack */}
        <div className="relative h-[600px] w-full">
          <AnimatePresence>
            {currentJob && (
              <motion.div
                key={currentIndex}
                ref={cardRef}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, x: 0 }}
                exit={{ x: exitX, opacity: 0 }}
                transition={{ duration: 0.2 }}
                drag="x"
                dragConstraints={{ left: -100, right: 100 }}
                onDragEnd={handleDragEnd}
                className="absolute inset-0"
              >
                <SwipeableJobCard job={currentJob} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-6 mt-8">
          <button
            onClick={handleSkip}
            className="p-4 bg-white dark:bg-dark-800 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
          >
            <X className="h-8 w-8 text-red-500" />
          </button>
          <button
            onClick={handleLike}
            className="p-4 bg-white dark:bg-dark-800 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
          >
            <Heart className="h-8 w-8 text-green-500" />
          </button>
        </div>

        {/* Progress */}
        <div className="mt-8">
          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
            <span>{currentIndex + 1} of {jobs.length}</span>
            <span>{Math.round(((currentIndex + 1) / jobs.length) * 100)}% Complete</span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-dark-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / jobs.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}