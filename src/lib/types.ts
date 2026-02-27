export interface ResumeBasics {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  github: string;
  linkedin: string;
  jobTitle: string;
}

export interface ResumeAbout {
  paragraph: string;
  shortBio: string;
}

export interface ResumeExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  responsibilities: [string, string, string]; // Exactly 3
}

export interface ResumeEducation {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  graduationDate: string;
}

export interface ResumeProject {
  id: string;
  title: string;
  description: string;
  evidenceType: 'url' | 'upload';
  evidenceUrl?: string;
  fileName?: string;
}

export interface ResumeData {
  basics: ResumeBasics;
  about: ResumeAbout;
  experience: ResumeExperience[];
  education: ResumeEducation[];
  projects: ResumeProject[];
}