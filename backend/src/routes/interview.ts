import express from "express"
import authMiddleware from "../middlewares/authMidleware.js";
import { PrismaClient } from "@prisma/client";
import Chat from "../functions/chat.js";
const prisma = new PrismaClient();
import { ElevenLabsClient, play } from '@elevenlabs/elevenlabs-js';
import { Readable } from "readable-stream";
const interViewRouter = express.Router();
type roles = "user" | "assistant"
interface Message {
    role: roles,
    content: string
}



interViewRouter.post('/', authMiddleware, async (req: any, res: express.Response) => {
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
            return
        }
        const body = req.body;
        console.log(body)
        const interview = await prisma.interviews.create({
            data: {
                completed: false,
                user_id: user.id,
                description: body.desc,
                started_at: new Date(),
                ended_at: new Date(),
                role: body.role,
                tech_stack: body.tech_stack,
                experience: body.experience
            }
        });
        if (!interview) {
            res.status(405).json({
                message: "Error creating interview",
                valid: false
            })
            return;
        }
        res.status(200).json({
            message: "Interview Created",
            valid: true,
            interview_id: interview.id
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Something went wrong',
            error: error
        })
    }
})
interViewRouter.post('/start/:id', async (req: any, res: express.Response) => {
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
            return
        }
        const interview = await prisma.interviews.findFirst({
            where: {
                id: req.params.id
            }
        })
        if (!interview) {
            res.status(405).json({
                message: "Invalid interview"
            })
            return
        }
        const body = req.body.deails as Message[]
        const INTERVIEW_INIT_SYSTEM_PROMPT = `Role: ${interview.role}
            Experience Level: ${interview.experience}
            Organization: 
            Tech Stack: ${interview.tech_stack}
            Your Role (AI):
            You are an experienced technical interviewer at TechNova Solutions.
            Your job is to conduct a realistic technical interview to assess the candidate’s:
            Understanding of the MERN stack (frontend + backend integration)
            Knowledge of TypeScript, RESTful APIs, and Prisma ORM
            Ability to reason about system design, scalability, and database schema decisions
            Familiarity with DevOps basics (Docker, AWS deployment)
            Problem-solving, debugging, and communication skills
            Interview Format:
            Start by introducing yourself and describing the role.
            Ask progressive technical questions — from fundamentals to scenario-based problems.
            Include at least one coding question, one system design question, and one conceptual question about database relationships or API architecture.
            After each response, ask relevant follow-ups.
            Maintain a professional, encouraging tone — as in a real interview.
            Ask one question at a time 
            Goal:
            Assess whether the candidate can build, optimize, and maintain production-grade web applications using the given tech stack, with clean code and proper design principles.
        `;

        const response = await Chat(body, INTERVIEW_INIT_SYSTEM_PROMPT)

        if (!response || response.length == 0) {
            res.status(403).json({
                message: "Error proceeding in interview",
                valid: false
            })
            return
        }
        const elevenlabs = new ElevenLabsClient({
            apiKey: `${process.env.ELEVEN_LABS_KEY}`,
        });
        const audio = await elevenlabs.textToSpeech.convert(
            `${process.env.VOICE_ID}`,
            {
                text: response,
                modelId: "eleven_multilingual_v2",
                outputFormat: "mp3_44100_128",
            }
        );
        const reader = audio.getReader();
        const chunks: Uint8Array[] = [];

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            chunks.push(value);
        }

        const audioBuffer = Buffer.concat(chunks);
        const base64Audio = audioBuffer.toString("base64");


        return res.status(200).json({
            ai_response: response,
            audio_base64: base64Audio,
            valid: true
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Something went wrong',
            error: error
        })
    }
})

export default interViewRouter;