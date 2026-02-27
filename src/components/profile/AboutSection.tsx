"use client";

import { useState } from "react";
import { ResumeAbout, ResumeData } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Loader2 } from "lucide-react";
import { generateAboutSection } from "@/ai/flows/generate-about-section";
import { useToast } from "@/hooks/use-toast";

interface Props {
  initialData: ResumeAbout;
  experienceSummary: string;
  onSave: (data: ResumeAbout) => void;
}

export function AboutSection({ initialData, experienceSummary, onSave }: Props) {
  const [loading, setLoading] = useState(false);
  const [paragraph, setParagraph] = useState(initialData.paragraph);
  const [shortBio, setShortBio] = useState(initialData.shortBio);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!experienceSummary) {
      toast({
        title: "Information needed",
        description: "Please fill out your work experience first to help the AI generate a better summary.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const result = await generateAboutSection({
        jobExperience: experienceSummary,
        professionalKeywords: [],
      });
      setParagraph(result.aboutParagraph);
      setShortBio(result.shortBio);
      toast({ title: "Generated successfully!" });
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "Something went wrong while generating your profile summary.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-accent/20 bg-accent/5">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle className="text-lg">AI Assistant</CardTitle>
            <p className="text-sm text-muted-foreground">Generate professional summaries based on your experience.</p>
          </div>
          <Button 
            onClick={handleGenerate} 
            disabled={loading}
            className="rounded-full bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Sparkles className="h-4 w-4 mr-2" />}
            Generate
          </Button>
        </CardHeader>
      </Card>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Short Bio (1-2 sentences)</label>
          <Textarea 
            value={shortBio} 
            onChange={(e) => setShortBio(e.target.value)}
            placeholder="A brief introduction for quick reading..."
            className="min-h-[60px]"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Professional Summary (80-120 words)</label>
          <Textarea 
            value={paragraph} 
            onChange={(e) => setParagraph(e.target.value)}
            placeholder="A more detailed professional overview..."
            className="min-h-[150px]"
          />
          <div className="flex justify-between items-center text-xs text-muted-foreground mt-1">
            <span>Word count: {paragraph ? paragraph.split(/\s+/).filter(Boolean).length : 0}</span>
            <span className={paragraph.split(/\s+/).filter(Boolean).length >= 80 && paragraph.split(/\s+/).filter(Boolean).length <= 120 ? "text-green-600" : "text-amber-600"}>
              Optimal: 80-120 words
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={() => onSave({ paragraph, shortBio })}>Save Changes</Button>
      </div>
    </div>
  );
}