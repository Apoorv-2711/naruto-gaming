export type anilistTrending = {
  title: {
    english: string;
    userPreferred: string;
    native: string;
  };
  text: string;
  bannerImage: string;
  coverImage: {
    extraLarge: string;
  };
  id: number;
  animeId: number;
  format: string;
  status: string;
  episodes: number;
  description: string;
};

export type gogoPopular = {
  title: string;
  releaseDate: string;
  image: string;
  link: string;
  id: string;
};

export type gogoRecent = {
  title: string;
  releaseDate: string;
  image: string;
  link: string;
  id: string;
};
