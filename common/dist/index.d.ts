import * as z from "zod";
export declare const details: z.ZodObject<{
    experience: z.ZodString;
    current_orgainsation: z.ZodString;
    role: z.ZodString;
    user_id: z.ZodString;
    city: z.ZodString;
    state: z.ZodString;
    country: z.ZodString;
    bio: z.ZodString;
    achivements: z.ZodString;
    gender: z.ZodString;
    resume: z.ZodString;
}, z.core.$strip>;
export declare const work_history: z.ZodArray<z.ZodObject<{
    organisation_name: z.ZodString;
    role: z.ZodString;
    from: z.ZodString;
    to: z.ZodString;
    user_id: z.ZodString;
}, z.core.$strip>>;
export declare const skills: z.ZodArray<z.ZodObject<{
    skill_name: z.ZodString;
    user_id: z.ZodString;
}, z.core.$strip>>;
export type Details_Type = z.infer<typeof details>;
export type Work_History_Type = z.infer<typeof work_history>;
export type Skills_Type = z.infer<typeof skills>;
//# sourceMappingURL=index.d.ts.map