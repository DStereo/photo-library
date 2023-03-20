import { convertImagesSizes } from './images.helpers';

import { Image } from './images.model';

describe('Images Helpers', () => {
  describe('convertImagesSizes', () => {
    it('should convert images sizes', () => {
      const images: Image[] = [
        {
          id: '1',
          author: 'author',
          width: 5000,
          height: 3333,
          url: 'url',
          download_url: 'https://photos.com/id/1/5000/3333',
        },
      ];
      const expectedImages: Image[] = [
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

      const convertedImages = convertImagesSizes(images, size);

      expect(convertedImages).toEqual(expectedImages);
    });
  });
});
