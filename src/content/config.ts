import { defineCollection, z } from "astro:content";

const casosCollection = defineCollection({
  type:"content",
  schema:z.object({
    title:z.string(),
    order:z.number(),
    link:z.string().url().optional(),

    image:z.string().optional(),
    intro:z.array(z.string()).optional(),

    tech:z.array(z.string()).optional(),

    problem:z.string().optional(),
    solution:z.string().optional(),
    result:z.string().optional(),

    quote:z.object({
      text:z.string(),
      author:z.string(),
    }).optional(),
  }),
});

const otrosCasosCollection = defineCollection({
  type:"content",
  schema:z.object({
    title:z.string(),
    image:z.string(),
    excerpt:z.string(),
    link:z.string().url(),
    order:z.number(),
  }),
});

export const collections={
  casos:casosCollection,
  "otros-casos":otrosCasosCollection,
};
