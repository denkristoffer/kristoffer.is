import { readdirSync } from "node:fs";

import { postsDirectory } from "./next/index.mjs";

interface Post {
  [key: string]: unknown;
}

export const getPostFilenames = (): string[] => {
  const allFiles = readdirSync(postsDirectory);
  const postFiles = allFiles.filter((filename) => filename.endsWith(".mdx"));

  return postFiles;
};

interface FileContent {
  metadata: {
    [key: string]: string;
  };
}

const getPostByFilename = async (
  filename: string,
  fields: string[] = [],
): Promise<Post> => {
  const { metadata } = (await import(
    `../pages/writing/${filename}`
  )) as FileContent;

  const slug = filename.replace(/\.mdx?$/, "");
  const items = {};

  // Throw a useful error when required metadata is missing
  const requiredFields = ["date", "excerpt", "title"];
  for (const field of requiredFields) {
    if (!Object.keys(metadata).includes(field)) {
      throw new Error(`${filename} is missing metadata: ${field}`);
    }
  }

  // Ensure only the minimal needed data is exposed
  for (const field of fields) {
    if (field === "slug") {
      items["slug"] = slug;
    }

    if (metadata[field]) {
      items[field] = metadata[field];
    }
  }

  return items;
};

export const getAllPosts = async (fields: string[] = []): Promise<Post[]> => {
  const filenames = getPostFilenames();
  let posts: Post[] = [];

  for (const filename of filenames) {
    const post = await getPostByFilename(filename, fields);
    posts = [...posts, post];
  }

  return posts;
};
