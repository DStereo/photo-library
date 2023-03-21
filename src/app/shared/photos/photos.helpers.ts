import { Photo } from './photos.model';

export function convertPhotoSizes(photo: Photo, size: number): Photo {
  const { id } = photo;
  const [photosUrl] = photo.download_url.split('/id');

  return {
    ...photo,
    width: size,
    height: size,
    download_url: `${photosUrl}/id/${id}/${size}`,
  };
}

export function convertPhotosSizes(photos: Photo[], size: number): Photo[] {
  return photos.map((photo) => convertPhotoSizes(photo, size));
}
