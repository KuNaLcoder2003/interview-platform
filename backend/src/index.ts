import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
import express from "express";
import bodyParser from "body-parser";
import { Webhook, type WebhookRequiredHeaders } from "svix";
import type { WebhookEvent } from "@clerk/express";
import authMiddleware from "./middlewares/authMidleware.js";
import cors from "cors"
const app = express();


app.use(cors())




const CLERK_WEBHOOK_SECRET = "";


app.post(
    "/api/webhook/clerk",
    bodyParser.raw({ type: "application/json" }),
    async (req, res) => {
        const payload = req.body; // keep raw body, do not JSON.stringify()

        const headers = {
            "svix-id": req.headers["svix-id"] as string,
            "svix-timestamp": req.headers["svix-timestamp"] as string,
            "svix-signature": req.headers["svix-signature"] as string,
        } satisfies WebhookRequiredHeaders;

        const wh = new Webhook(CLERK_WEBHOOK_SECRET);

        let evt: WebhookEvent;
        try {
            // verify raw body (Buffer)
            evt = wh.verify(payload, headers) as WebhookEvent;
        } catch (err: any) {
            console.error("❌ Webhook verification failed:", err.message);
            return res.status(400).json({ error: "Invalid signature" });
        }

        const { type, data } = evt;

        if (type === "user.created" || type === "user.updated") {
            const {
                id,
                email_addresses,
                username,
                first_name,
                last_name,
                image_url,
                password
            } = data as any;

            const new_user = await prisma.users.create({
                data: {
                    email: email_addresses[0]?.email_address,
                    username: username,
                    name: `${first_name} ${last_name}`,
                    password: "",
                    avatar: image_url,
                    clerk_id: id,
                }
            })
            console.log(id);
        }

        res.status(200).json({ received: true });
    }
);

app.get('/', authMiddleware, async (req: any, res: express.Response) => {
    const clerk_id = req.clerk_id;
    try {
        console.log(clerk_id)
        const user = await prisma.users.findFirst({
            where: {
                clerk_id: clerk_id
            }
        })
        if (!user) {
            res.status(404).json({
                message: 'User not found'
            })
            return
        }
        res.status(200).json({
            user
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error: error
        })
    }
})

app.listen(3000, () => {
    console.log(" Server running on http://localhost:3000");
});

export default app;