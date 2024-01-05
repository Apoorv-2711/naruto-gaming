import * as z from "zod";

export const EstimatedScheduleSchema = z.object({
  id: z.string().nullable(),
  time: z.string().nullable(),
  name: z.string().nullable(),
  janme: z.string().nullable(),
});

export type EstimatedSchedule = z.infer<typeof EstimatedScheduleSchema>;

export const ScrapedEstimatedScheduleSchema = z.object({
  schedule: z.array(EstimatedScheduleSchema),
});

export type ScrapedEstimatedSchedule = z.infer<
  typeof ScrapedEstimatedScheduleSchema
>;
