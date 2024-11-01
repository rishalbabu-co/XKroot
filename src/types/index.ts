export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  description: string;
  requirements: string[];
  posted: string;
  logo: string;
}

export interface Profile {
  id: string;
  name: string;
  title: string;
  location: string;
  about: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  avatar: string;
}

export interface Experience {
  id: string;
  company: string;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  graduationYear: string;
}

export interface Application {
  id: string;
  jobId: string;
  status: 'pending' | 'reviewed' | 'interviewed' | 'offered' | 'rejected';
  appliedDate: string;
}