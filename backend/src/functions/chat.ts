import Groq from "groq-sdk"
import dotenv from "dotenv"
dotenv.config()

const groq = new Groq({ apiKey: `${process.env.Groq_Api_Key}` })

type roles = "user" | "assistant"

interface Message {
    role: roles,
    content: string
}

const Chat = async (messages: Message[], systemPrompt: string) => {
    const chatCompletions = await groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: systemPrompt
            },
            ...messages
        ],
        model: "openai/gpt-oss-20b",
        temperature: 1,
        max_completion_tokens: 8192,
        top_p: 1,
        stream: true,
        reasoning_effort: "high",
        stop: null
    })
    let str = "";
    for await (const chunk of chatCompletions) {

        if (chunk.choices[0]?.delta?.content) {
            str += `${chunk.choices[0]?.delta?.content}`
        }

        // console.log(`${chunk.choices[0]?.delta?.content}`);


    }
    console.log("Final Str : ", str);

    return str
}

export default Chat;