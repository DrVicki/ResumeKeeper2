"use client";

import { useResumeData } from "@/hooks/use-resume-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin, Globe, Github, Linkedin, ExternalLink, Download, Share2 } from "lucide-react";

export default function PreviewPage() {
  const { data } = useResumeData();

  if (!data) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Skeleton className="h-[800px] w-full" />
      </div>
    );
  }

  const { basics, about, experience, education, projects } = data;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex justify-between items-center mb-6 no-print">
        <h1 className="text-2xl font-bold font-headline">Live Preview</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            alert("Portfolio URL copied to clipboard!");
          }}>
            <Share2 className="h-4 w-4 mr-2" /> Share
          </Button>
          <Button size="sm" onClick={handlePrint}>
            <Download className="h-4 w-4 mr-2" /> PDF
          </Button>
        </div>
      </div>

      <Card className="border-none shadow-xl bg-white overflow-hidden print:shadow-none print:border-none">
        <div className="bg-primary px-8 py-12 text-primary-foreground text-center md:text-left print:bg-primary print:text-white">
          <h2 className="text-4xl font-bold font-headline mb-2">{basics.fullName || "Your Name"}</h2>
          <p className="text-xl text-primary-foreground/90 font-medium mb-6">{basics.jobTitle || "Your Professional Title"}</p>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm opacity-90">
            {basics.email && (
              <span className="flex items-center gap-1">
                <Mail className="h-4 w-4" /> {basics.email}
              </span>
            )}
            {basics.phone && (
              <span className="flex items-center gap-1">
                <Phone className="h-4 w-4" /> {basics.phone}
              </span>
            )}
            {basics.location && (
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" /> {basics.location}
              </span>
            )}
          </div>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4 no-print">
            {basics.website && <a href={basics.website} target="_blank" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"><Globe className="h-4 w-4" /></a>}
            {basics.github && <a href={basics.github} target="_blank" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"><Github className="h-4 w-4" /></a>}
            {basics.linkedin && <a href={basics.linkedin} target="_blank" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"><Linkedin className="h-4 w-4" /></a>}
          </div>
        </div>

        <CardContent className="p-8 md:p-12 space-y-12">
          {/* About Section */}
          <section>
            <h3 className="text-xl font-bold font-headline text-primary border-l-4 border-accent pl-4 mb-4 uppercase tracking-wider">About Me</h3>
            <p className="text-lg font-medium text-foreground mb-4 italic">{about.shortBio}</p>
            <p className="text-muted-foreground leading-relaxed">{about.paragraph}</p>
          </section>

          {/* Work Experience */}
          {experience.length > 0 && (
            <section>
              <h3 className="text-xl font-bold font-headline text-primary border-l-4 border-accent pl-4 mb-6 uppercase tracking-wider">Professional Experience</h3>
              <div className="space-y-8">
                {experience.map((exp) => (
                  <div key={exp.id} className="relative pl-8 before:absolute before:left-0 before:top-2 before:bottom-0 before:w-px before:bg-border">
                    <div className="absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-accent" />
                    <div className="flex flex-col md:flex-row md:justify-between mb-2">
                      <h4 className="text-lg font-bold">{exp.position}</h4>
                      <span className="text-sm font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <p className="text-primary font-medium mb-3">{exp.company}</p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      {exp.responsibilities.map((resp, i) => resp && <li key={i}>{resp}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section>
              <h3 className="text-xl font-bold font-headline text-primary border-l-4 border-accent pl-4 mb-6 uppercase tracking-wider">Key Projects</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {projects.map((project) => (
                  <div key={project.id} className="border rounded-lg p-6 hover:border-accent transition-colors">
                    <h4 className="font-bold text-lg mb-2">{project.title}</h4>
                    <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                    {project.evidenceType === 'url' ? (
                      <a href={project.evidenceUrl} target="_blank" className="text-xs font-bold text-primary flex items-center hover:underline">
                        <ExternalLink className="h-3 w-3 mr-1" /> VIEW PROJECT
                      </a>
                    ) : (
                      <span className="text-xs font-bold text-accent uppercase flex items-center">
                        <Download className="h-3 w-3 mr-1" /> {project.fileName}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section>
              <h3 className="text-xl font-bold font-headline text-primary border-l-4 border-accent pl-4 mb-6 uppercase tracking-wider">Education</h3>
              <div className="space-y-6">
                {education.map((edu) => (
                  <div key={edu.id} className="flex flex-col md:flex-row md:justify-between">
                    <div>
                      <h4 className="font-bold">{edu.degree} in {edu.fieldOfStudy}</h4>
                      <p className="text-muted-foreground">{edu.institution}</p>
                    </div>
                    <span className="text-sm font-medium text-muted-foreground mt-1 md:mt-0">{edu.graduationDate}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </CardContent>
        
        <div className="bg-muted/30 p-8 text-center text-xs text-muted-foreground border-t">
          <p>© {new Date().getFullYear()} {basics.fullName || "User"}. Created with Dr. Vicki's ResumeKeeper.</p>
        </div>
      </Card>
    </div>
  );
}
