export type home = {
  genres: string[];
  latestEpisodeAnimes: [
    {
      id: string;
      name: string;
      poster: string;
      duration: string;
      type: string;
      rating: string;
      episodes: {
        sub: number;
        dub: number;
      };
    }
  ];
  spotlightAnimes: [
    {
      id: string;
      name: string;
      jname: string;
      poster: string;
      description: string;
      rank: number;
      otherInfo: string[];
      episodes: {
        sub: number;
        dub: number;
      };
    }
  ];
  top10Animes: {
    today: [
      {
        episodes: {
          sub: number;
          dub: number;
        };
        id: string;
        name: string;
        poster: string;
        rank: number;
      }
    ];
    month: [
      {
        episodes: {
          sub: number;
          dub: number;
        };
        id: string;
        name: string;
        poster: string;
        rank: number;
      }
    ];
    week: [
      {
        episodes: {
          sub: number;
          dub: number;
        };
        id: string;
        name: string;
        poster: string;
        rank: number;
      }
    ];
  };
  topAiringAnimes: [
    {
      id: string;
      name: string;
      jname: string;
      poster: string;
      otherInfo: string[];
    }
  ];
  topUpcomingAnimes: [
    {
      id: string;
      name: string;
      poster: string;
      duration: string;
      type: string;
      rating: string;
      episodes: {
        sub: number;
        dub: number;
      };
    }
  ];
  trendingAnimes: [
    {
      id: string;
      name: string;
      poster: string;
      rank: number;
    }
  ];
};

export type animeInfo = {
  anime: {
    info: {
      id: string;
      name: string;
      poster: string;
      description: string;
      stats: {
        rating: string;
        quality: string;
        episodes: {
          sub: number;
          dub: number;
        };
        type: string;
        duration: string;
      };
    };
    moreInfo: {
      aired: string;
      genres: string[];
      status: string;
      studios: string;
      duration: string;
    };
  };
  mostPopularAnimes: [
    {
      episodes: {
        sub: number;
        dub: number;
      };
      id: string;
      jname: string;
      name: string;
      poster: string;
      type: string;
    }
  ];
  recommendedAnimes: [
    {
      id: string;
      name: string;
      poster: string;
      duration: string;
      type: string;
      rating: string;
      episodes: {
        sub: number;
        dub: number;
      };
    }
  ];
  relatedAnimes: [
    {
      id: string;
      name: string;
      poster: string;
      duration: string;
      type: string;
      rating: string;
      episodes: {
        sub: number;
        dub: number;
      };
    }
  ];
  seasons: [
    {
      id: string;
      name: string;
      title: string;
      poster: string;
      isCurrent: boolean;
    }
  ];
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
