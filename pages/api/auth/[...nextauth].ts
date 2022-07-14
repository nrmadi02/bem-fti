import { pengguna } from '@prisma/client';
import { compare } from 'bcryptjs';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '../../../database/db';

export default NextAuth({
  session: {
    strategy: 'jwt',
    maxAge: 23 * 60 * 60
  },
  secret: "Ulalaa2202",
  jwt: {
    secret: "Ulalaa2202",
    encode: async ({ token }) => {
      var jwt = require('jsonwebtoken');
      const tokenContents = {
        name: token?.name,
        email: token?.email,
        role: token?.role,
        jabatan: token?.jabatan,
        periode: token?.periode,
        id: token?.id,
        divisi_id: token?.divisi_id,
        foto: token?.foto,
        npm: token?.npm,
        status: token?.status,
        iat: Date.now() / 1000,
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
        sub: token?.id,
      }
      const encodedToken = jwt.sign(tokenContents, "Ulalaa2202", {
        algorithm: "HS256",
      })
      return encodedToken
    },
    decode: async ({ token }) => {
      var jwt = require('jsonwebtoken');
      const decodedToken = jwt.verify(token, "Ulalaa2202", {
        algorithms: "HS256",
      })
      return decodedToken
    },

  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "email", type: "text", },
        password: { label: "password", type: "password" }
      },
      async authorize(credentials, _req) {
        const user = await prisma.pengguna.findFirst({
          where: {
            email: credentials?.email
          }
        })
        if (!user) {
          throw new Error('pengguna tidak ada')
        }

        const pwValid = await compare(credentials!.password, user.password)

        if (!pwValid) {
          throw new Error('password salah')
        }

        return {
          name: user?.name,
          email: user?.email,
          role: user?.role,
          jabatan: user?.jabatan,
          periode: user?.periode,
          id: user?.id,
          divisi_id: user?.divisi_id,
          foto: user?.foto,
          npm: user?.npm,
          status: user?.status
        };
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user, }) {
      if (user) {
        token.role = user.role
        token.jabatan = user?.jabatan
        token.periode = user?.periode
        token.id = user?.id
        token.divisi_id = user?.divisi_id
        token.foto = user?.foto
        token.npm = user?.npm
        token.status = user?.status
      }
      return token
    },
    session: async ({ session, token }) => {
      // session callback is called whenever a session for that particular user is checked
      // in above function we created token.user=user
      session.user = token;
      // you might return this in new version
      return session
    },
  },
  useSecureCookies: process.env.NODE_ENV !== "development" ? true : false,
  cookies: {
    sessionToken: {
      name: `session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true
      }
    },
  }
});