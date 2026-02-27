"use client";

import { useState, useEffect } from 'react';
import { ResumeData } from '@/lib/types';

const STORAGE_KEY = 'resumekeeper_data';

const DEFAULT_DATA: ResumeData = {
  basics: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    github: '',
    linkedin: '',
    jobTitle: '',
  },
  about: {
    paragraph: '',
    shortBio: '',
  },
  experience: [],
  education: [],
  projects: [],
};

export function useResumeData() {
  const [data, setData] = useState<ResumeData | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setData(JSON.parse(stored));
      } catch (e) {
        setData(DEFAULT_DATA);
      }
    } else {
      setData(DEFAULT_DATA);
    }
  }, []);

  const updateData = (newData: Partial<ResumeData>) => {
    if (!data) return;
    const updated = { ...data, ...newData };
    setData(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return { data, updateData };
}