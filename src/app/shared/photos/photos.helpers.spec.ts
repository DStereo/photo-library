import { convertPhotosSizes } from './photos.helpers';

import { Photo } from './photos.model';

describe('Photos Helpers', () => {
  describe('convertPhotosSizes', () => {
    it('should convert photos sizes', () => {
      const photos: Photo[] = [
        {
          id: '1',
          author: 'author',
          width: 5000,
          height: 3333,
          url: 'url',
          download_url: 'https://photos.com/id/1/5000/3333',
        },
      ];
      const expectedPhotos: Photo[] = [
        {
          id: '1',
          author: 'author',
          width: 300,
          height: 300,
          url: 'url',
          download_url: 'https://photos.com/id/1/300',
        },
      ];

      const size = 300;

      const convertedPhotos = convertPhotosSizes(photos, size);

      expect(convertedPhotos).toEqual(expectedPhotos);
    });
  });
});
