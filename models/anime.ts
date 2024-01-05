import * as z from "zod";

export const AnimeSchema = z.object({
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

// export type Anime = z.infer<typeof AnimeSchema>;
export interface Anime extends z.TypeOf<typeof AnimeSchema> {}

export const CommonAnimePropsSchema = AnimeSchema.pick({
  id: true,
  name: true,
  poster: true,
});

export type CommonAnimeProps = z.infer<typeof CommonAnimePropsSchema>;

export const Top10AnimeSchema = CommonAnimePropsSchema.extend({
  rank: z.number().nullable(),
  episodes: AnimeSchema.shape.episodes,
});

export interface Top10Anime extends z.TypeOf<typeof Top10AnimeSchema> {}

export const Top10AnimeTimePeriodSchema = z.union([
  z.literal("day"),
  z.literal("week"),
  z.literal("month"),
]);

export type Top10AnimeTimePeriod = z.infer<typeof Top10AnimeTimePeriodSchema>;

export const MostPopularAnimeSchema = AnimeSchema.extend({
  jname: z.string().nullable(),
}).pick({
  id: true,
  name: true,
  poster: true,
  episodes: true,
  type: true,
  jname: true,
});

export interface MostPopularAnime
  extends z.TypeOf<typeof MostPopularAnimeSchema> {}

export const SpotlightAnimeSchema = MostPopularAnimeSchema.extend({
  rank: Top10AnimeSchema.shape.rank,
  description: z.string().nullable(),
});

export interface SpotlightAnime extends z.TypeOf<typeof SpotlightAnimeSchema> {}

export const TrendingAnimeSchema = CommonAnimePropsSchema.extend({
  rank: Top10AnimeSchema.shape.rank,
});

export interface TrendingAnime extends z.TypeOf<typeof TrendingAnimeSchema> {}

export interface LatestEpisodeAnime extends z.TypeOf<typeof AnimeSchema> {}

export interface TopUpcomingAnime extends z.TypeOf<typeof AnimeSchema> {}

export interface TopAiringAnime
  extends z.TypeOf<typeof MostPopularAnimeSchema> {}

export const AnimeGeneralAboutInfoSchema = CommonAnimePropsSchema.extend({
  description: SpotlightAnimeSchema.shape.description,
  stats: z.object({
    quality: z.string().nullable(),
    duration: AnimeSchema.shape.duration,
    episodes: AnimeSchema.shape.episodes,
    rating: AnimeSchema.shape.rating,
    type: AnimeSchema.shape.type,
  }),
});

export interface AnimeGeneralAboutInfo
  extends z.TypeOf<typeof AnimeGeneralAboutInfoSchema> {}

export interface RecommendedAnime extends z.TypeOf<typeof AnimeSchema> {}

export interface RelatedAnime extends z.TypeOf<typeof MostPopularAnimeSchema> {}

export const SeasonSchema = CommonAnimePropsSchema.extend({
  isCurrent: z.boolean(),
  title: z.string().nullable(),
});

export interface Season extends z.TypeOf<typeof SeasonSchema> {}

export const AnimeSearchSuggestionSchema = MostPopularAnimeSchema.omit({
  episodes: true,
  type: true,
}).extend({
  moreInfo: z.string().nullable(),
});

export interface AnimeSearchSuggestion
  extends z.TypeOf<typeof AnimeSearchSuggestionSchema> {}

export const AnimeEpisodeSchema = SeasonSchema.extend({
  episodeId: z.string().nullable(),
  number: z.number(),
  isFiller: z.boolean(),
});

export type AnimeEpisodesss = z.infer<typeof AnimeEpisodeSchema>;
export interface AnimeEpisode extends z.TypeOf<typeof AnimeEpisodeSchema> {}

export const SubEpisodeSchema = z.object({
  serverName: z.string(),
  serverId: z.number().nullable(),
});

export interface SubEpisode extends z.TypeOf<typeof SubEpisodeSchema> {}

export interface DubEpisode extends z.TypeOf<typeof SubEpisodeSchema> {}

export const AnimeCategoriesSchema = z.union([
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

export type AnimeCategories = z.infer<typeof AnimeCategoriesSchema>;

export const AnimeServerSchema = z.union([
  z.literal("vidstreaming"),
  z.literal("megacloud"),
  z.literal("streamsb"),
  z.literal("streamtape"),
  z.literal("vidcloud"),
]);

export type AnimeServer = z.infer<typeof AnimeServerSchema>;

export const Servers = z.enum([
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
