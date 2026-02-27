import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Sparkles, Globe, Briefcase, GraduationCap } from 'lucide-react';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="flex flex-col items-center text-center space-y-8 max-w-3xl mx-auto">
        <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight text-primary">
          Your Career, <span className="text-accent">Simplified</span>.
        </h1>
        <p className="text-xl text-muted-foreground">
          Build a professional online resume and portfolio in minutes. 
          Use AI to polish your profile and showcase your best work.
        </p>
        <div className="flex gap-4">
          <Button size="lg" asChild className="rounded-full px-8">
            <Link href="/profile">Get Started</Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="rounded-full px-8">
            <Link href="/preview">View Sample</Link>
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
        <FeatureCard 
          icon={<Sparkles className="h-6 w-6 text-accent" />}
          title="AI Writing Assistant"
          description="Generate compelling bio and about sections automatically using advanced AI."
        />
        <FeatureCard 
          icon={<Briefcase className="h-6 w-6 text-accent" />}
          title="Project Showcases"
          description="Add your best work with URLs or direct uploads to build trust with employers."
        />
        <FeatureCard 
          icon={<Globe className="h-6 w-6 text-accent" />}
          title="One-Click Publishing"
          description="Get a professional, accessible URL for your portfolio to share with anyone."
        />
        <FeatureCard 
          icon={<GraduationCap className="h-6 w-6 text-accent" />}
          title="Guided Experience"
          description="Strict validation rules ensure your resume looks professional and polished."
        />
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="border-none shadow-md bg-white">
      <CardHeader>
        <div className="mb-4 bg-background p-2 w-fit rounded-lg">{icon}</div>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}