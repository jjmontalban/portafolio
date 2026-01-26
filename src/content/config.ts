import { defineCollection, z } from "astro:content";

// Helper schema for bilingual text fields
const bilingualText = z.union([
  z.string(),
  z.object({
    es: z.string(),
    en: z.string(),
  }),
]);

// Helper schema for bilingual quote
const bilingualQuote = z.union([
  z.object({
    text: z.string(),
    author: z.string(),
  }),
  z.object({
    es: z.object({
      text: z.string(),
      author: z.string(),
    }),
    en: z.object({
      text: z.string(),
      author: z.string(),
    }),
  }),
]);

const casosCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: bilingualText,
    order: z.number(),
    link: z.string().url().optional(),

    image: z.string().optional(),
    intro: bilingualText.optional(),
    "intro-detail": bilingualText.optional(),

    tech: z.array(z.string()).optional(),

    problem: bilingualText.optional(),
    solution: bilingualText.optional(),
    "solution-image": z.string().optional(),
    result: bilingualText.optional(),

    quote: bilingualQuote.optional(),
  }),
});

const otrosCasosCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: bilingualText,
    image: z.string(),
    excerpt: bilingualText,
    link: z.string().url(),
    order: z.number(),
  }),
});

export const collections = {
  casos: casosCollection,
  "otros-casos": otrosCasosCollection,
};
