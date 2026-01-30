import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export function createJWT(
    payload: JwtPayload,
    expiresIn: string = "15m"
): string {
    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }

    return jwt.sign(payload, JWT_SECRET, {
        expiresIn,
        algorithm: "HS256",
    });
}
export function checkJWT(token: string): any {
    if (!JWT_SECRET) {

        throw new Error("JWT_SECRET is not defined");
    }
    console.log(typeof token);
    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        // if (typeof decoded === "string") {
        //     throw new Error("Invalid token payload");
        // }

        return decoded;
    } catch (error) {
        console.log(error);
        throw new Error("Invalid or expired token");
    }
}