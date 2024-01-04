import { z } from "zod";

const AnimeSchema = z.object({
  id: z.string().nullable(),
  name: z.string().nullable(),
  poster: z.string().nullable(),
  duration: z.string().nullable(),
  type: z.string().nullable(),
  rating: z.string().nullable(),
  episodes: z.object({
    sub: z.number().nullable(),
    dub: z.number().nullable(),
  }),
});

type Anime = z.infer<typeof AnimeSchema>;

const CommonAnimePropsSchema = AnimeSchema.pick({
  id: true,
  name: true,
  poster: true,
});

type CommonAnimeProps = z.infer<typeof CommonAnimePropsSchema>;

const Top10AnimeSchema = CommonAnimePropsSchema.extend({
  rank: z.number().nullable(),
  episodes: AnimeSchema.shape.episodes,
});

type Top10Anime = z.infer<typeof Top10AnimeSchema>;

const Top10AnimeTimePeriodSchema = z.union([
  z.literal("day"),
  z.literal("week"),
  z.literal("month"),
]);

type Top10AnimeTimePeriod = z.infer<typeof Top10AnimeTimePeriodSchema>;

const MostPopularAnimeSchema = AnimeSchema.extend({
  jname: z.string().nullable(),
}).pick({
  id: true,
  name: true,
  poster: true,
  episodes: true,
  type: true,
  jname: true,
});

type MostPopularAnime = z.infer<typeof MostPopularAnimeSchema>;

const SpotlightAnimeSchema = MostPopularAnimeSchema.extend({
  rank: Top10AnimeSchema.shape.rank,
  description: z.string().nullable(),
});

type SpotlightAnime = z.infer<typeof SpotlightAnimeSchema>;

const TrendingAnimeSchema = CommonAnimePropsSchema.extend({
  rank: Top10AnimeSchema.shape.rank,
});

type TrendingAnime = z.infer<typeof TrendingAnimeSchema>;

type LatestEpisodeAnime = z.infer<typeof AnimeSchema>;

type TopUpcomingAnime = z.infer<typeof AnimeSchema>;

type TopAiringAnime = z.infer<typeof MostPopularAnimeSchema>;

const AnimeGeneralAboutInfoSchema = CommonAnimePropsSchema.extend({
  description: SpotlightAnimeSchema.shape.description,
  stats: z.object({
    quality: z.string().nullable(),
    duration: AnimeSchema.shape.duration,
    episodes: AnimeSchema.shape.episodes,
    rating: AnimeSchema.shape.rating,
    type: AnimeSchema.shape.type,
  }),
});

type AnimeGeneralAboutInfo = z.infer<typeof AnimeGeneralAboutInfoSchema>;

type RecommendedAnime = z.infer<typeof AnimeSchema>;

type RelatedAnime = z.infer<typeof MostPopularAnimeSchema>;

const SeasonSchema = CommonAnimePropsSchema.extend({
  isCurrent: z.boolean(),
  title: z.string().nullable(),
});

type Season = z.infer<typeof SeasonSchema>;

const AnimeSearchSuggestionSchema = MostPopularAnimeSchema.omit({
  episodes: true,
  type: true,
}).extend({
  moreInfo: z.string().nullable(),
});

type AnimeSearchSuggestion = z.infer<typeof AnimeSearchSuggestionSchema>;

const AnimeEpisodeSchema = SeasonSchema.extend({
  episodeId: z.string().nullable(),
  number: z.number(),
  isFiller: z.boolean(),
});

type AnimeEpisode = z.infer<typeof AnimeEpisodeSchema>;

const SubEpisodeSchema = z.object({
  serverName: z.string(),
  serverId: z.number().nullable(),
});

type SubEpisode = z.infer<typeof SubEpisodeSchema>;

type DubEpisode = z.infer<typeof SubEpisodeSchema>;

const AnimeCategoriesSchema = z.union([
  z.literal("most-favorite"),
  z.literal("most-popular"),
  z.literal("subbed-anime"),
  z.literal("dubbed-anime"),
  z.literal("recently-updated"),
  z.literal("recently-added"),
  z.literal("top-upcoming"),
  z.literal("top-airing"),
  z.literal("movie"),
  z.literal("special"),
  z.literal("ova"),
  z.literal("ona"),
  z.literal("tv"),
  z.literal("completed"),
]);

type AnimeCategories = z.infer<typeof AnimeCategoriesSchema>;

const AnimeServerSchema = z.union([
  z.literal("vidstreaming"),
  z.literal("megacloud"),
  z.literal("streamsb"),
  z.literal("streamtape"),
  z.literal("vidcloud"),
]);

type AnimeServer = z.infer<typeof AnimeServerSchema>;

const ServersSchema = z.enum([
  "vidstreaming",
  "megacloud",
  "streamsb",
  "streamtape",
  "vidcloud",
  "asianload",
  "gogocdn",
  "mixdrop",
  "upcloud",
  "vizcloud",
  "mycloud",
  "filemoon",
]);

type Servers = z.infer<typeof ServersSchema>;

export type {
  Anime,
  CommonAnimeProps,
  Top10Anime,
  Top10AnimeTimePeriod,
  MostPopularAnime,
  SpotlightAnime,
  TrendingAnime,
  LatestEpisodeAnime,
  TopUpcomingAnime,
  TopAiringAnime,
  AnimeGeneralAboutInfo,
  RecommendedAnime,
  RelatedAnime,
  Season,
  AnimeSearchSuggestion,
  AnimeEpisode,
  SubEpisode,
  DubEpisode,
  AnimeCategories,
  AnimeServer,
  Servers,
};
