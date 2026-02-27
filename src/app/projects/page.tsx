"use client";

import { useState } from "react";
import { useResumeData } from "@/hooks/use-resume-data";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ProjectForm } from "@/components/projects/ProjectForm";
import { ResumeProject } from "@/lib/types";
import { Plus, Trash2, Edit, ExternalLink, FileText, Briefcase } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectsPage() {
  const { data, updateData } = useResumeData();
  const [editingProject, setEditingProject] = useState<ResumeProject | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (!data) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Skeleton className="h-12 w-1/3 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  const handleSave = (project: ResumeProject) => {
    let updatedProjects;
    if (editingProject) {
      updatedProjects = data.projects.map(p => p.id === project.id ? project : p);
    } else {
      updatedProjects = [...data.projects, project];
    }
    updateData({ projects: updatedProjects });
    setIsDialogOpen(false);
    setEditingProject(null);
  };

  const handleDelete = (id: string) => {
    updateData({ projects: data.projects.filter(p => p.id !== id) });
  };

  const handleEdit = (project: ResumeProject) => {
    setEditingProject(project);
    setIsDialogOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="bg-primary p-2 rounded-lg text-primary-foreground">
            <Briefcase className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold font-headline">Portfolio Projects</h1>
            <p className="text-muted-foreground">Showcase your best work with evidence links or files.</p>
          </div>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) setEditingProject(null);
        }}>
          <DialogTrigger asChild>
            <Button className="rounded-full shadow-lg">
              <Plus className="h-4 w-4 mr-2" /> Add Project
            </Button>
          </DialogTrigger>
          <ProjectForm initialData={editingProject || undefined} onSave={handleSave} />
        </Dialog>
      </div>

      {data.projects.length === 0 ? (
        <Card className="border-dashed py-12 flex flex-col items-center text-center">
          <div className="bg-muted p-4 rounded-full mb-4">
            <Briefcase className="h-8 w-8 text-muted-foreground" />
          </div>
          <CardTitle className="mb-2">No projects added yet</CardTitle>
          <CardDescription className="max-w-sm mb-6">
            Add your first project to showcase your technical skills and practical experience.
          </CardDescription>
          <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
            Start adding projects
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.projects.map((project) => (
            <Card key={project.id} className="group overflow-hidden flex flex-col h-full bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl line-clamp-1">{project.title}</CardTitle>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(project)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(project.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardDescription className="line-clamp-3 min-h-[4.5rem]">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardFooter className="mt-auto border-t bg-muted/20 pt-4 pb-4">
                {project.evidenceType === 'url' ? (
                  <a 
                    href={project.evidenceUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-sm font-medium text-primary hover:underline"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Live Project
                  </a>
                ) : (
                  <div className="flex items-center text-sm font-medium text-accent">
                    <FileText className="h-4 w-4 mr-2" />
                    Attached: {project.fileName}
                  </div>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}