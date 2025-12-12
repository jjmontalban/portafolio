import { defineCollection, z } from 'astro:content';

const casosCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    order: z.number(),
    link: z.string().url().optional(),
    desc: z.array(z.string()),
    tech: z.array(z.string()),
    image: z.string().optional(),
    companySector: z.string().optional(),
    problem: z.string().optional(),
    solution: z.string().optional(),
    result: z.string().optional(),
    quote: z
      .object({
        text: z.string(),
        author: z.string()
      })
      .optional(),
    contribution: z.string().optional()
  })
});

const otrosCasosCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    image: z.string(),
    excerpt: z.string(),
    link: z.string().url(),
    order: z.number(),
  }),
});

export const collections = {
  "casos": casosCollection,
  "otros-casos": otrosCasosCollection,
};

