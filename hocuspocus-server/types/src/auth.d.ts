/**
 * This is a fake implementation of authentication.
 *
 * It parses a token (like userid__READ-WRITE) and returns the userId and role.
 */
export declare function FAKE_authInfoFromToken(token: string): "unauthorized" | {
    userId: string;
    role: "COMMENT-ONLY" | "READ-WRITE";
};
