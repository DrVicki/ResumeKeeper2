"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ResumeProject } from "@/lib/types";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Link as LinkIcon, Upload } from "lucide-react";

const projectSchema = z.object({
  title: z.string().min(2, "Title is required"),
  description: z.string().min(10, "Description should be more detailed"),
  evidenceType: z.enum(["url", "upload"]),
  evidenceUrl: z.string().optional(),
  fileName: z.string().optional(),
}).refine(data => {
  if (data.evidenceType === 'url') return !!data.evidenceUrl;
  if (data.evidenceType === 'upload') return !!data.fileName;
  return false;
}, {
  message: "At least one evidence source is required",
  path: ["evidenceUrl"]
});

interface Props {
  initialData?: ResumeProject;
  onSave: (data: ResumeProject) => void;
}

export function ProjectForm({ initialData, onSave }: Props) {
  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      evidenceType: "url",
      evidenceUrl: "",
      fileName: "",
    },
  });

  const evidenceType = form.watch("evidenceType");

  const handleSubmit = (values: z.infer<typeof projectSchema>) => {
    onSave({
      ...values,
      id: initialData?.id || crypto.randomUUID(),
    } as ResumeProject);
  };

  return (
    <DialogContent className="max-w-xl">
      <DialogHeader>
        <DialogTitle>{initialData ? "Edit Project" : "Add New Project"}</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 pt-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Title</FormLabel>
                <FormControl><Input placeholder="Awesome Project Name" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl><Textarea placeholder="What did you build and which technologies did you use?" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="evidenceType"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Evidence Source</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl><RadioGroupItem value="url" /></FormControl>
                      <FormLabel className="font-normal flex items-center">
                        <LinkIcon className="h-4 w-4 mr-2" /> Add by URL
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl><RadioGroupItem value="upload" /></FormControl>
                      <FormLabel className="font-normal flex items-center">
                        <Upload className="h-4 w-4 mr-2" /> Add by Upload
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {evidenceType === "url" ? (
            <FormField
              control={form.control}
              name="evidenceUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link URL</FormLabel>
                  <FormControl><Input placeholder="https://github.com/..." {...field} /></FormControl>
                  <FormDescription>Link to your project repo or demo.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <FormField
              control={form.control}
              name="fileName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>File Selection</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Input 
                        placeholder="Click to browse files..." 
                        readOnly 
                        value={field.value} 
                        onClick={() => {
                          const name = prompt("Enter a filename to simulate upload:");
                          if (name) field.onChange(name);
                        }}
                      />
                      <Button type="button" variant="outline" size="icon" onClick={() => {
                         const name = prompt("Enter a filename to simulate upload:");
                         if (name) field.onChange(name);
                      }}>
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                  </FormControl>
                  <FormDescription>Upload screenshots or documentation (PDF, PNG).</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <div className="flex justify-end gap-2 pt-4">
            <Button type="submit">{initialData ? "Update" : "Create"} Project</Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
}