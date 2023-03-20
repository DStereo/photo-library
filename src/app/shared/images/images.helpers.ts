import { Image } from './images.model';

export function convertImageSizes(image: Image, size: number): Image {
  const { id } = image;
  const [imageUrl] = image.download_url.split('/id');

  return {
    ...image,
    width: size,
    height: size,
    download_url: `${imageUrl}/id/${id}/${size}`,
  };
}

export function convertImagesSizes(images: Image[], size: number): Image[] {
  return images.map((image) => convertImageSizes(image, size));
}
