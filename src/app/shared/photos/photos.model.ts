export interface PhotosConfig {
  apiUrl: string;
  apiDelay: number;
  pageLimit: number;
  listSize: number;
  detailsSize: number;
}

export interface Photo {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}
