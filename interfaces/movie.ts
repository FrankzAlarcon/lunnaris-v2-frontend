export interface FileMetadata {
  id: string
  tag: string
  mimetype: string,
  displayName: string,
  url: string
}

export interface Poster {
  id: string;
  name: string;
  image: string;
}

export interface Movie {
  id: string;
  name: string;
  slug: string;
  image: string;
}