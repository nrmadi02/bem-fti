// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../../database/db';
import { hash } from 'bcryptjs'
import { randomUUID } from "crypto";


// eslint-disable-next-line import/no-anonymous-default-export
export default async function (_req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = _req;

  switch (method) {
    case "GET":
      try {
        const dataPengguna = await prisma.pengguna.findMany()
        return res.status(200).json({
          message: "success get pengguna",
          data: dataPengguna,
          status: true,
          code: 200
        });
      } catch (error: any) {
        return res.status(400).json({
          message: "error get pengguna",
          status: false,
          code: 400
        });
      }
    case "POST":
      let nodemailer = require('nodemailer')
      const { name, email, password, periode, role, status, jabatan, foto, divisi_id } = _req.body
      const pw = await hash(password, 12)
      try {
        const existData = await prisma.pengguna.findFirst({
          where: {
            email: email
          }
        })
        if (existData) {
          return res.status(400).json({
            message: "pengguna already exist",
            status: false,
            code: 400
          })
        }
        const result = await prisma.pengguna.create({
          data: {
            id: randomUUID(),
            name: name,
            email: email,
            foto: foto,
            jabatan: jabatan,
            password: pw,
            periode: periode,
            role: role,
            status: status,
            Divisi: { connect: { id: divisi_id } }
          }
        })

        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: 'uniska.fti.bem@gmail.com',
            pass: 'skqypgsokbcwikuk',
          }
        })

        const mailData = {
          from: 'uniska.fti.bem@gmail.com',
          to: email,
          subject: `BEM-FTI UNISKA MAB`,
          text: "Informasi akun",
          html: `
          <html>
            <body>
              <div>Informasi akun anda di website BEM-FTI</div>
              <p>Email : ${email}</p>
              <p>Pass : ${password}</p>
            </body>
          </html>`
        }

        await transporter.sendMail(mailData, function (err: any, info: any) {
          if (err)
            console.log(err)
          else
            console.log(info)
        })

        return res.status(201).json({
          message: "success create pengguna",
          status: true,
          data: result,
          code: 201
        })
      } catch (error: any) {
        return res.status(400).json({
          message: error,
          status: false,
          code: 400
        });
      }
    default:
      return res.status(400).json({ message: "Method are not supported" });
  }
}
