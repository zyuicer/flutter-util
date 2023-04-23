import fs, { existsSync } from "node:fs";
import { resolve } from "node:path";
import { cwd } from "node:process";

export function createFolderProcess(dirName) {
  const path = resolve(cwd(), `./${dirName}`);
  const dep = path.split("/");
  let mutPath = "/";
  dep.forEach((filename) => {
    if (filename) {
      mutPath += `${filename}/`;
      const isExist = existsSync(mutPath);
      !isExist && createFolder(mutPath);
    }
  });
}

function createFolder(path) {
  const _path = resolve(cwd(), path);
  fs.mkdirSync(_path);
}

export function createFile(path, detail) {
  fs.writeFileSync(path, detail);
}
