import { readdirSync } from "fs";
import { join } from "path";

interface Post {
  [key: string]: unknown;
}

const postsDirectory = join(process.cwd(), "src/pages/writing");

export const getPostFilenames = (): string[] => {
  const allFiles = readdirSync(postsDirectory);
  const postFiles = allFiles.filter((filename) => filename.endsWith(".mdx"));

  return postFiles;
};

const getPostByFilename = async (
  filename: string,
  fields: string[] = [],
): Promise<Post> => {
  const { metadata } = await import(`../pages/writing/${filename}`);
  // const fullPath = join(postsDirectory, file);

  const slug = filename.replace(/\.mdx?$/, "");
  const items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items["slug"] = slug;
    }

    if (metadata[field]) {
      items[field] = metadata[field];
    }
  });

  return items;
};

export const getAllPosts = async (fields: string[] = []): Promise<Post[]> => {
  const filenames = getPostFilenames();
  let posts = [];

  for (const filename of filenames) {
    const post = await getPostByFilename(filename, fields);
    posts = [...posts, post];
  }

  return posts;
};
