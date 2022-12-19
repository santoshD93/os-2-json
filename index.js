import { readdir, readFile } from "fs/promises";
import path from "path";

const dir = "./src";

async function parseFile(directory, fileName) {
  const absolutePath = path.join(directory, fileName);
  const fileData = await readFile(absolutePath);

  return JSON.parse(fileData);
}

async function readDirectory(directory) {
  try {
    const fileNames = await readdir(directory);

    const data = await Promise.all(
      fileNames.map(async (fileName) => parseFile(directory, fileName))
    );

    return data;
  } catch (e) {
    console.log(e);
  }
}

readDirectory(dir).then((data) => console.log(data));
