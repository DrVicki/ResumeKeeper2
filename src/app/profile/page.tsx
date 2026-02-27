"use client";

import { useResumeData } from "@/hooks/use-resume-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BasicsForm } from "@/components/profile/BasicsForm";
import { AboutSection } from "@/components/profile/AboutSection";
import { ExperienceForm } from "@/components/profile/ExperienceForm";
import { EducationForm } from "@/components/profile/EducationForm";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { User, FileText, Briefcase, GraduationCap } from "lucide-react";

export default function ProfilePage() {
  const { data, updateData } = useResumeData();

  if (!data) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Skeleton className="h-12 w-1/3 mb-8" />
        <Skeleton className="h-[600px] w-full" />
      </div>
    );
  }

  // Generate experience summary for AI context
  const experienceSummary = data.experience
    .map(exp => `${exp.position} at ${exp.company}. Responsibilities: ${exp.responsibilities.join(", ")}.`)
    .join(" ");

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-primary p-2 rounded-lg text-primary-foreground">
          <User className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold font-headline">Your Profile</h1>
          <p className="text-muted-foreground">Complete your resume details to build a professional portfolio.</p>
        </div>
      </div>

      <Card className="border-none shadow-lg">
        <CardContent className="p-0">
          <Tabs defaultValue="basics" className="w-full">
            <TabsList className="grid w-full grid-cols-4 rounded-none border-b h-14 bg-muted/50">
              <TabsTrigger value="basics" className="data-[state=active]:bg-background data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full">
                <User className="h-4 w-4 mr-2 hidden md:block" /> Basics
              </TabsTrigger>
              <TabsTrigger value="about" className="data-[state=active]:bg-background data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full">
                <FileText className="h-4 w-4 mr-2 hidden md:block" /> About
              </TabsTrigger>
              <TabsTrigger value="experience" className="data-[state=active]:bg-background data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full">
                <Briefcase className="h-4 w-4 mr-2 hidden md:block" /> Experience
              </TabsTrigger>
              <TabsTrigger value="education" className="data-[state=active]:bg-background data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full">
                <GraduationCap className="h-4 w-4 mr-2 hidden md:block" /> Education
              </TabsTrigger>
            </TabsList>
            
            <div className="p-6">
              <TabsContent value="basics">
                <BasicsForm initialData={data.basics} onSave={(basics) => updateData({ basics })} />
              </TabsContent>
              <TabsContent value="about">
                <AboutSection 
                  initialData={data.about} 
                  experienceSummary={experienceSummary}
                  onSave={(about) => updateData({ about })} 
                />
              </TabsContent>
              <TabsContent value="experience">
                <ExperienceForm initialData={data.experience} onSave={(experience) => updateData({ experience })} />
              </TabsContent>
              <TabsContent value="education">
                <EducationForm initialData={data.education} onSave={(education) => updateData({ education })} />
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}