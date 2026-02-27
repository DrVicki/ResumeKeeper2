"use client";

import { useState } from "react";
import { ResumeExperience } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Plus, Trash2, GripVertical } from "lucide-react";

interface Props {
  initialData: ResumeExperience[];
  onSave: (data: ResumeExperience[]) => void;
}

export function ExperienceForm({ initialData, onSave }: Props) {
  const [experiences, setExperiences] = useState<ResumeExperience[]>(initialData);

  const addExperience = () => {
    const newExp: ResumeExperience = {
      id: crypto.randomUUID(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      responsibilities: ["", "", ""],
    };
    setExperiences([...experiences, newExp]);
  };

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  const updateExperience = (id: string, updates: Partial<ResumeExperience>) => {
    setExperiences(experiences.map(exp => exp.id === id ? { ...exp, ...updates } : exp));
  };

  const updateResponsibility = (expId: string, index: number, value: string) => {
    setExperiences(experiences.map(exp => {
      if (exp.id === expId) {
        const newResps = [...exp.responsibilities] as [string, string, string];
        newResps[index] = value;
        return { ...exp, responsibilities: newResps };
      }
      return exp;
    }));
  };

  return (
    <div className="space-y-6">
      {experiences.map((exp, idx) => (
        <Card key={exp.id} className="relative group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-md font-bold">Position #{idx + 1}</CardTitle>
            <Button variant="ghost" size="icon" onClick={() => removeExperience(exp.id)} className="text-destructive">
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase text-muted-foreground">Company</label>
                <Input value={exp.company} onChange={(e) => updateExperience(exp.id, { company: e.target.value })} placeholder="Acme Inc." />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase text-muted-foreground">Title</label>
                <Input value={exp.position} onChange={(e) => updateExperience(exp.id, { position: e.target.value })} placeholder="Lead Developer" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase text-muted-foreground">Start Date</label>
                <Input value={exp.startDate} onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })} placeholder="Jan 2020" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase text-muted-foreground">End Date</label>
                <Input value={exp.endDate} onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })} placeholder="Present" />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-xs font-medium uppercase text-muted-foreground block">Key Responsibilities (Exactly 3 Required)</label>
              {exp.responsibilities.map((resp, rIdx) => (
                <div key={rIdx} className="flex gap-2 items-center">
                  <span className="text-xs font-bold text-muted-foreground w-4">{rIdx + 1}.</span>
                  <Input 
                    value={resp} 
                    onChange={(e) => updateResponsibility(exp.id, rIdx, e.target.value)} 
                    placeholder={`Responsibility ${rIdx + 1}`}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      <Button variant="outline" onClick={addExperience} className="w-full border-dashed">
        <Plus className="h-4 w-4 mr-2" /> Add Work Experience
      </Button>

      <div className="flex justify-end">
        <Button onClick={() => onSave(experiences)}>Save All Changes</Button>
      </div>
    </div>
  );
}