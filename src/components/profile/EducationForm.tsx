"use client";

import { useState } from "react";
import { ResumeEducation } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

interface Props {
  initialData: ResumeEducation[];
  onSave: (data: ResumeEducation[]) => void;
}

export function EducationForm({ initialData, onSave }: Props) {
  const [education, setEducation] = useState<ResumeEducation[]>(initialData);

  const addEducation = () => {
    const newEdu: ResumeEducation = {
      id: crypto.randomUUID(),
      institution: "",
      degree: "",
      fieldOfStudy: "",
      graduationDate: "",
    };
    setEducation([...education, newEdu]);
  };

  const removeEducation = (id: string) => {
    setEducation(education.filter(edu => edu.id !== id));
  };

  const updateEducation = (id: string, updates: Partial<ResumeEducation>) => {
    setEducation(education.map(edu => edu.id === id ? { ...edu, ...updates } : edu));
  };

  return (
    <div className="space-y-6">
      {education.map((edu, idx) => (
        <Card key={edu.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-md font-bold">Education #{idx + 1}</CardTitle>
            <Button variant="ghost" size="icon" onClick={() => removeEducation(edu.id)} className="text-destructive">
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase text-muted-foreground">Institution</label>
              <Input value={edu.institution} onChange={(e) => updateEducation(edu.id, { institution: e.target.value })} placeholder="University of Life" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase text-muted-foreground">Degree</label>
                <Input value={edu.degree} onChange={(e) => updateEducation(edu.id, { degree: e.target.value })} placeholder="Bachelor of Science" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase text-muted-foreground">Field of Study</label>
                <Input value={edu.fieldOfStudy} onChange={(e) => updateEducation(edu.id, { fieldOfStudy: e.target.value })} placeholder="Computer Science" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase text-muted-foreground">Graduation Date</label>
              <Input value={edu.graduationDate} onChange={(e) => updateEducation(edu.id, { graduationDate: e.target.value })} placeholder="May 2018" />
            </div>
          </CardContent>
        </Card>
      ))}

      <Button variant="outline" onClick={addEducation} className="w-full border-dashed">
        <Plus className="h-4 w-4 mr-2" /> Add Education
      </Button>

      <div className="flex justify-end">
        <Button onClick={() => onSave(education)}>Save All Changes</Button>
      </div>
    </div>
  );
}