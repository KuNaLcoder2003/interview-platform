import express from "express"
import jwt from "jsonwebtoken"

function authMiddleware(req: any, res: express.Response, next: express.NextFunction) {
    try {
        const authToken = req.headers.authorization;
        console.log(authToken);
        if (!authToken || !authToken.startsWith('Bearer ')) {
            res.status(401).json({
                message: 'Unauthorized'
            })
            return
        }
        const token = authToken.split('Bearer ')[1] as string;
        if (!token) {
            res.status(401).json({
                message: 'Unauthorized'
            })
            return
        }
        const permittedOrigins = ['http://localhost:5173']
        // https://alive-jackal-82.clerk.accounts.dev/.well-known/jwks.json




        const publicKey = ``

        const verified = jwt.verify(token,
            publicKey
            , {
                algorithms: ["RS256"]
            })
        if (verified) {
            console.log(verified)
            req.clerk_id = verified.sub;
            next();
        } else {
            res.status(401).json({
                message: 'Unauthorized'
            })
            return
        }
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error: error
        })
        return
    }
}

export default authMiddleware;

// pk_test_YWxpdmUtamFja2FsLTgyLmNsZXJrLmFjY291bnRzLmRldiQ

