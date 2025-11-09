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




        const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuq9kGjpzfKARHR9gbzWL
XDWhtWo6CEanQU4PKKiOS2bbIIZIbyGKEkBb0iopC6jK48ecFXELPQyXx4LbKmIn
g+ECSRWEkodHFN+VapoazRZ4R3QbAVrLK83V5H3iFFsakvVafztgA/DKX9xqxPRR
PMMtZimCjSbzakOyoUBVJ6wrpJM02jBEcEPedg74BqWBNvLQviNkaB5oUpV/cTV7
b3AaJ+8dg8ChfDPSHDje4H/QDpnhHku4B1ESusRaTAyP+de3aCKwMWhZS9OJ8iCC
uiW8vfPJjVQTNxquh0mUT6j7SLc123S9hvjvfYgHalbb2wp+4c+tdZu1WkKdpTb8
YwIDAQAB
-----END PUBLIC KEY-----
`

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

