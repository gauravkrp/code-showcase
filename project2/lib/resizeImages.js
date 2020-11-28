const fs = require('fs-extra');
const globby = require('globby');
const fspath = require('path');
const sharp = require('sharp');

(async () => {
  const images = await globby([
    'public/assets/images/**/*.jpg',
    'public/assets/images/**/*.jpeg',
    'public/assets/images/**/*.png',
    'public/assets/images/**/*.webp',
    '!public/assets/images/**/*.js',
    '!public/assets/images/**/*.svg',
  ]);

  images.map(async (image, i)=> {
    const imagePath = fspath.join(process.cwd(), image) //absolute path
    const imageOutputNameWithPath = image.split('.');
    const [imageSavePathName, imageExtension] = imageOutputNameWithPath
    await sharp(imagePath)
      .resize({ width: 400 })
      .toBuffer()
      //.toFile(`output${i}-400.jpg`)
      .then(data => {
        fs.writeFileSync(`${imageSavePathName}-mobile.${imageExtension}`, data);
      })
      .catch(err => {
        console.log(err);
      });
  })
})();