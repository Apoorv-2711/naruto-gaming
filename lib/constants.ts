export const ACCEPT_ENCODING_HEADER = "gzip, deflate, br" as const;
export const USER_AGENT_HEADER =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36" as const;
export const ACCEPT_HEADER =
  "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9" as const;

export const SRC_BASE_URL = "https://hianime.to/";
export const SRC_AJAX_URL = "https://hianime.to/ajax";
export const SRC_HOME_URL = "https://hianime.to/home";
export const SRC_SEARCH_URL = "https://hianime.to/search";

// export const SRC_BASE_URL = `https://${DOMAIN}` as const;
// export const SRC_AJAX_URL = `${SRC_BASE_URL}/ajax` as const;
// export const SRC_HOME_URL = `${SRC_BASE_URL}/home` as const;
// export const SRC_SEARCH_URL = `${SRC_BASE_URL}/search` as const;

// previously zoro.to -> aniwatch.to -> aniwatchtv.to
const DOMAIN = "hianime.to" as const;
export const hoverColors = [
  "rgba(76, 224, 210, 0.2)",
  "rgba(243, 255, 185, 0.2)",
  "rgba(154, 229, 230, 0.2)",
  "rgba(226, 132, 19, 0.2)",
  "rgba(9, 232, 94, 0.2)",
  "rgba(239, 48, 84, 0.2)",
  "rgba(255, 15, 128, 0.2)",
  "rgba(76, 224, 210, 0.2)",
  "rgba(243, 255, 185, 0.2)",
  "rgba(154, 229, 230, 0.2)",
  "rgba(226, 132, 19, 0.2)",
  "rgba(9, 232, 94, 0.2)",
  "rgba(239, 48, 84, 0.2)",
  "rgba(255, 15, 128, 0.2)",
  "rgba(76, 224, 210, 0.2)",
  "rgba(243, 255, 185, 0.2)",
  "rgba(154, 229, 230, 0.2)",
  "rgba(226, 132, 19, 0.2)",
  "rgba(9, 232, 94, 0.2)",
  "rgba(239, 48, 84, 0.2)",
  "rgba(255, 15, 128, 0.2)",
  "rgba(76, 224, 210, 0.2)",
  "rgba(243, 255, 185, 0.2)",
  "rgba(154, 229, 230, 0.2)",
  "rgba(226, 132, 19, 0.2)",
  "rgba(9, 232, 94, 0.2)",
  "rgba(239, 48, 84, 0.2)",
  "rgba(255, 15, 128, 0.2)",
  "rgba(76, 224, 210, 0.2)",
  "rgba(243, 255, 185, 0.2)",
  "rgba(154, 229, 230, 0.2)",
  "rgba(226, 132, 19, 0.2)",
  "rgba(9, 232, 94, 0.2)",
  "rgba(239, 48, 84, 0.2)",
  "rgba(255, 15, 128, 0.2)",
  "rgba(76, 224, 210, 0.2)",
  "rgba(243, 255, 185, 0.2)",
  "rgba(154, 229, 230, 0.2)",
  "rgba(226, 132, 19, 0.2)",
  "rgba(9, 232, 94, 0.2)",
  "rgba(239, 48, 84, 0.2)",
  "rgba(255, 15, 128, 0.2)",
  "rgba(76, 224, 210, 0.2)",
  "rgba(243, 255, 185, 0.2)",
  "rgba(154, 229, 230, 0.2)",
  "rgba(226, 132, 19, 0.2)",
  "rgba(9, 232, 94, 0.2)",
  "rgba(239, 48, 84, 0.2)",
  "rgba(255, 15, 128, 0.2)",
  "rgba(76, 224, 210, 0.2)",
  "rgba(243, 255, 185, 0.2)",
  "rgba(154, 229, 230, 0.2)",
  "rgba(226, 132, 19, 0.2)",
  "rgba(9, 232, 94, 0.2)",
  "rgba(239, 48, 84, 0.2)",
  "rgba(255, 15, 128, 0.2)",
];

export const colors = [
  "4CE0D2",
  "F3FFB9",
  "9ae5e6",
  "e28413",
  "09e85e",
  "ef3054",
  "ff0f80",
];

type SearchPageFilters = {
  GENRES_ID_MAP: Record<string, number>;
  TYPE_ID_MAP: Record<string, number>;
  STATUS_ID_MAP: Record<string, number>;
  RATED_ID_MAP: Record<string, number>;
  SCORE_ID_MAP: Record<string, number>;
  SEASON_ID_MAP: Record<string, number>;
  LANGUAGE_ID_MAP: Record<string, number>;
  SORT_ID_MAP: Record<string, string>;
};

export const SEARCH_PAGE_FILTERS: SearchPageFilters = {
  GENRES_ID_MAP: {
    action: 1,
    adventure: 2,
    cars: 3,
    comedy: 4,
    dementia: 5,
    demons: 6,
    drama: 8,
    ecchi: 9,
    fantasy: 10,
    game: 11,
    harem: 35,
    historical: 13,
    horror: 14,
    isekai: 44,
    josei: 43,
    kids: 15,
    magic: 16,
    "martial-arts": 17,
    mecha: 18,
    military: 38,
    music: 19,
    mystery: 7,
    parody: 20,
    police: 39,
    psychological: 40,
    romance: 22,
    samurai: 21,
    school: 23,
    "sci-fi": 24,
    seinen: 42,
    shoujo: 25,
    "shoujo-ai": 26,
    shounen: 27,
    "shounen-ai": 28,
    "slice-of-life": 36,
    space: 29,
    sports: 30,
    "super-power": 31,
    supernatural: 37,
    thriller: 41,
    vampire: 32,
  },

  TYPE_ID_MAP: {
    all: 0,
    movie: 1,
    tv: 2,
    ova: 3,
    ona: 4,
    special: 5,
    music: 6,
  },

  STATUS_ID_MAP: {
    all: 0,
    "finished-airing": 1,
    "currently-airing": 2,
    "not-yet-aired": 3,
  },

  RATED_ID_MAP: {
    all: 0,
    g: 1,
    pg: 2,
    "pg-13": 3,
    r: 4,
    "r+": 5,
    rx: 6,
  },

  SCORE_ID_MAP: {
    all: 0,
    appalling: 1,
    horrible: 2,
    "very-bad": 3,
    bad: 4,
    average: 5,
    fine: 6,
    good: 7,
    "very-good": 8,
    great: 9,
    masterpiece: 10,
  },

  SEASON_ID_MAP: {
    all: 0,
    spring: 1,
    summer: 2,
    fall: 3,
    winter: 4,
  },

  LANGUAGE_ID_MAP: {
    all: 0,
    sub: 1,
    dub: 2,
    "sub-&-dub": 3,
  },

  SORT_ID_MAP: {
    default: "default",
    "recently-added": "recently_added",
    "recently-updated": "recently_updated",
    score: "score",
    "name-a-z": "name_az",
    "released-date": "released_date",
    "most-watched": "most_watched",
  },
} as const;

export const AZ_LIST_SORT_OPTIONS = {
  all: true,
  other: true,
  "0-9": true,
  a: true,
  b: true,
  c: true,
  d: true,
  e: true,
  f: true,
  g: true,
  h: true,
  i: true,
  j: true,
  k: true,
  l: true,
  m: true,
  n: true,
  o: true,
  p: true,
  q: true,
  r: true,
  s: true,
  t: true,
  u: true,
  v: true,
  w: true,
  x: true,
  y: true,
  z: true,
} as const;
