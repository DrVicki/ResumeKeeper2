'use server';
/**
 * @fileOverview A Genkit flow for generating an 'About' paragraph and a short bio based on user input.
 *
 * - generateAboutSection - A function that handles the generation process.
 * - GenerateAboutSectionInput - The input type for the generateAboutSection function.
 * - GenerateAboutSectionOutput - The return type for the generateAboutSection function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAboutSectionInputSchema = z.object({
  professionalKeywords: z
    .array(z.string())
    .optional()
    .describe('A list of professional keywords or skills (e.g., "Software Engineer", "Project Management", "Cloud Computing").'),
  jobExperience: z
    .string()
    .optional()
    .describe('A summary of the user\'s job experience (e.g., "Led a team of 5 engineers, developed scalable microservices using Node.js and AWS.").'),
});
export type GenerateAboutSectionInput = z.infer<typeof GenerateAboutSectionInputSchema>;

const GenerateAboutSectionOutputSchema = z.object({
  aboutParagraph: z
    .string()
    .describe('A compelling \'About\' paragraph, 80-120 words long, summarizing the user\'s professional profile.'),
  shortBio: z
    .string()
    .describe('A concise 1-2 sentence short bio, highlighting key professional attributes.'),
});
export type GenerateAboutSectionOutput = z.infer<typeof GenerateAboutSectionOutputSchema>;

export async function generateAboutSection(input: GenerateAboutSectionInput): Promise<GenerateAboutSectionOutput> {
  return generateAboutSectionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAboutSectionPrompt',
  input: {schema: GenerateAboutSectionInputSchema},
  output: {schema: GenerateAboutSectionOutputSchema},
  prompt: `You are an expert resume writer. Your task is to craft compelling professional summaries for a user.

Based on the provided information, generate two distinct pieces of content:
1. An 'About' paragraph: This should be 80-120 words long, showcasing the user's professional journey, skills, and aspirations.
2. A Short Bio: This should be a concise 1-2 sentence summary, perfect for quick introductions.

Here is the user's input:

{{#if professionalKeywords}}
Professional Keywords: {{#each professionalKeywords}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
{{/if}}
{{#if jobExperience}}
Job Experience: {{{jobExperience}}}
{{/if}}

Generate the 'About' paragraph and 'Short Bio' in the specified JSON format.
`,
});

const generateAboutSectionFlow = ai.defineFlow(
  {
    name: 'generateAboutSectionFlow',
    inputSchema: GenerateAboutSectionInputSchema,
    outputSchema: GenerateAboutSectionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
