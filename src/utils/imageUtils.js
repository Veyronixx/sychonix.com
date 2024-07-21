import fs from 'fs';
import path from 'path';

export function getImagePath(name) {
  const formats = ['svg', 'jpg', 'jpeg', 'png'];
  for (const format of formats) {
    const imagePath = path.resolve('src/images', `${name}.${format}`);
    if (fs.existsSync(imagePath)) {
      return `/src/images/${name}.${format}`;
    }
  }
  return null; // Or a default image path if desired
}
