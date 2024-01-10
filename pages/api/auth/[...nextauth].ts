import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      authorization: { params: { scope: 'notifications' } },
      httpOptions: {
        timeout: 50000,
      },
    }),
  ],
  callbacks: {
    // 调用 getSession 和 useSession 时会触发
    // 文档可查看 https://next-auth.js.org/configuration/callbacks
    async session({ session, user }) {
      if (user.id && session?.user) {
        session.user.userId = user.id;
      }
      return session;
    }
  },
  redirect: 'http://localhost:3000'
};

export default NextAuth(authOptions);
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
