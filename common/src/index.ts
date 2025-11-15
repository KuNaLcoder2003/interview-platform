import * as z from "zod";

export const details = z.object({
    experience: z.string(),
    current_orgainsation: z.string(),
    role: z.string(),
    user_id: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    bio: z.string(),
    achivements: z.string(),
    gender: z.string(),
    resume: z.string(),
})

export const work_history = z.array(z.object({
    organisation_name: z.string(),
    role: z.string(),
    from: z.string(),
    to: z.string(),
    user_id: z.string(),
}))

export const skills = z.array(z.object({
    skill_name: z.string(),
    user_id: z.string()
}))

export const chat = z.array(
    z.object({
        role: z.string(),
        message: z.string()
    })
)

export type Details_Type = z.infer<typeof details>
export type Work_History_Type = z.infer<typeof work_history>
export type Skills_Type = z.infer<typeof skills>
export type Chat_Type = z.infer<typeof chat> 
