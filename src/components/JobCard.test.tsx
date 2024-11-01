import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '../lib/test-utils';
import JobCard from './JobCard';
import type { Job } from '../types';

const mockJob: Job = {
  id: '1',
  title: 'Senior Frontend Developer',
  company: 'TechCorp',
  location: 'San Francisco, CA',
  salary: '$120k - $160k',
  type: 'Full-time',
  description: 'Test description',
  requirements: ['React', 'TypeScript'],
  posted: '2 days ago',
  logo: 'https://example.com/logo.png',
  category: 'Engineering',
  tags: ['Frontend'],
  benefits: ['Health Insurance'],
  isRemote: false,
  experienceLevel: 'Senior',
  applicants: 45
};

describe('JobCard', () => {
  it('renders job details correctly', () => {
    render(<JobCard job={mockJob} />);
    
    expect(screen.getByText(mockJob.title)).toBeInTheDocument();
    expect(screen.getByText(mockJob.company)).toBeInTheDocument();
    expect(screen.getByText(mockJob.location)).toBeInTheDocument();
  });

  it('handles apply button click', () => {
    render(<JobCard job={mockJob} />);
    
    const applyButton = screen.getByText('Apply Now');
    fireEvent.click(applyButton);
    
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});