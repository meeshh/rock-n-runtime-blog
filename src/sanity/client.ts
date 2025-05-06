import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.PROJECT_ID, // "78zu03c7",
  dataset: "production",
  apiVersion: process.env.API_VERSION, // "2024-01-01",
  useCdn: false,
});
