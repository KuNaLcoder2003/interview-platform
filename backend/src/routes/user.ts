import express from "express"
import authMiddleware from "../middlewares/authMidleware.js";
const userRouter = express.Router();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
import { details, skills, work_history, type Details_Type, type Skills_Type, type Work_History_Type } from "@kunaljprsingh/interview-types";
import { it } from "node:test";


interface UserDeatils {
    details: Details_Type,
    work_history: Work_History_Type,
    skills: Skills_Type
}
userRouter.post('/userDetails', authMiddleware, async (req: any, res: express.Response) => {
    try {
        const clerk_id = req.clerk_id;
        const user = await prisma.users.findFirst({
            where: {
                clerk_id: clerk_id
            }
        })
        if (!user) {
            res.status(404).json({
                message: 'User not found',
                valid: false
            })
            return;
        }

        const body = req.body as UserDeatils
        console.log(body);
        const created = await prisma.$transaction(async (tx) => {

            const details = await tx.details.create({
                data: {
                    current_orgainsation: body.details.current_orgainsation,
                    experience: body.details.experience,
                    role: body.details.role,
                    user_id: user.id,
                    gender: body.details.gender,
                    city: body.details.city,
                    state: body.details.state,
                    country: body.details.country,
                    avatar: "",
                    resume: body.details.resume,
                    bio: body.details.bio,
                    achivements: body.details.achivements
                }
            })
            const [workHistoryResults, skillResults] = await Promise.all([
                uploadWorkHistory(body.work_history, user.id, prisma),
                uploadSkills(body.skills, user.id, prisma),
            ]);
            return {
                details,
                workHistoryResults,
                skillResults
            };
        })
        if (!created) {
            res.status(403).json({
                message: "Unable to add details",
                valid: false
            })
            return
        }
        await prisma.users.update({
            where: {
                id: user.id
            },
            data: {
                deatils_filled: true
            }
        })
        res.status(201).json({
            message: "All user details saved successfully",
            valid: true,
            data: created
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Something went wrong',
            error: error
        })
    }
})

userRouter.get('/check', authMiddleware, async (req: any, res: express.Response) => {
    console.log('req reached');
    try {
        const clerk_id = req.clerk_id
        const user = await prisma.users.findFirst({
            where: {
                clerk_id: clerk_id
            }
        })
        if (!user) {
            res.status(404).json({
                message: 'User not found',
                valid: false
            })
            return;
        }

        res.status(200).json({
            filled: user.deatils_filled
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong'
        })
    }
})

export async function uploadWorkHistory(
    workHistory: Work_History_Type,
    userId: string,
    tx: any
) {
    const results = await Promise.allSettled(
        workHistory.map((item) =>
            tx.work_history.create({
                data: {
                    user_id: userId,
                    organisation_name: item.organisation_name,
                    role: item.role,
                    from: new Date(item.from).toISOString(),
                    to: new Date(item.to).toISOString(),
                },
            })
        )
    );

    const successes = results
        .filter((r) => r.status === "fulfilled")
        .map((r) => r.value);
    const errors = results
        .filter((r) => r.status === "rejected")
        .map((r) => r.reason);

    if (errors.length > 0) {
        console.error("❌ Work history errors:", errors);
        console.error("🧩 Problematic records:", workHistory);
        throw new Error("Work history insertion failed");
    }

    return { successes, errors };
}

async function uploadSkills(
    skills: Skills_Type,
    userId: string,
    tx: any
) {
    const results = await Promise.allSettled(
        skills.map((item) =>
            tx.skills.create({
                data: {
                    ...item,
                    user_id: userId,
                },
            })
        )
    );

    const hit = results.filter((r) => r.status === "fulfilled").map((r) => r.value);
    const miss = results.filter((r) => r.status === "rejected").map((r) => r.reason);

    if (miss.length > 0) {
        throw new Error("Skills insertion failed");
    }

    return { hit, miss };
}


export default userRouter;