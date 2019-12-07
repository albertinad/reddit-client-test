import fs from 'fs';
import path from 'path';

const manifestsCache = new Map();

const getManifest = (manifest = 'manifest.json') => {
  if (manifestsCache.has(manifest)) {
    return Promise.resolve(manifestsCache.get(manifest));
  }

  return new Promise((resolve, reject) => {
    fs.readFile(path.join('./build/', manifest), (err, content) => {
      if (err) {
        return reject(err);
      }

      let manifestData: JSON;
      try {
        manifestData = JSON.parse(content as unknown as string);
      } catch (e) {
        return reject(e);
      }
      manifestsCache.set(manifest, manifestData);

      return resolve(manifestData);
    });
  });
};

export {
  getManifest,
};
