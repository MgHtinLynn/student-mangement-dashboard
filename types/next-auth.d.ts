import { DefaultSession } from "next-auth"

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        accessToken?: string | null,
        authId?: string | number | null
        user?: {
            accessToken?: string | null
            role?: string | null
            profile_url?: string | null
        } & DefaultSession["user"]
    }
}

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        /** API Token */
        accessToken: string | null
    }
}