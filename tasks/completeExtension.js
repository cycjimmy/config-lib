import path from 'path';
import {
  lstatSync, readdirSync, readFile, writeFile,
} from 'fs';

const handleTask = ({
  dir,
  handleData = (data) => data,
}) => Promise.resolve()
  .then(() => new Promise((resolve) => {
    const targetFilesFullPathArray = [];
    const traverseDir = (handleDir) => {
      readdirSync(handleDir).forEach((file) => {
        const fullPath = path.join(handleDir, file);
        if (lstatSync(fullPath).isDirectory()) {
          traverseDir(fullPath);
        } else {
          targetFilesFullPathArray.push(fullPath);
        }
      });
    };

    traverseDir(dir);
    setTimeout(() => resolve(targetFilesFullPathArray), 500);
  }))
  .then((targetFilesFullPathArray) => targetFilesFullPathArray
    .map((fileFullPath) => Promise.resolve()
      .then(() => new Promise((resolve, reject) => {
        readFile(
          fileFullPath,
          'utf8',
          (err, fileData) => {
            if (err) {
              reject(err);
              return;
            }
            resolve(fileData);
          },
        );
      }))
      .then((fileData) => new Promise((resolve) => {
        setTimeout(() => resolve(handleData(fileData)), 100);
      }))
      .then((handledFileData) => new Promise((resolve, reject) => {
        writeFile(
          fileFullPath,
          handledFileData.toString(),
          'utf8',
          (err) => {
            if (err) {
              reject(err);
              return;
            }
            resolve();
          },
        );
      }))));

Promise.resolve()
  .then(() => Promise.all([
    handleTask({
      dir: path.resolve('.release', 'cjs'),
      handleData: (data) => data.replaceAll(
        /require\("(.+)"\)/g,
        ($0, $1) => ($1.search('.cjs') === -1
          ? `require("${$1}.cjs")`
          : $0),
      ),
    }),

    handleTask({
      dir: path.resolve('.release', 'esm'),
      handleData: (data) => data.replaceAll(
        /import\s(.+)\sfrom\s'(.+)'/g,
        ($0, $1, $2) => ($2.search('.js') === -1
          ? `import ${$1} from '${$2}.js'`
          : $0),
      ),
    }),
  ]));
