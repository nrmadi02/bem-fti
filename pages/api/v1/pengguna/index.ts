// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../../database/db';
import { hash } from 'bcryptjs'
import { randomUUID } from "crypto";


// eslint-disable-next-line import/no-anonymous-default-export
export default async function (_req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = _req;
  let nodemailer = require('nodemailer')
  const {id, name, email, npm, password, periode, role, status, jabatan, foto, divisi_id } = _req.body

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
            npm: npm,
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

        await new Promise((resolve, reject) => {
          // verify connection configuration
          transporter.verify(function (error: any, success: unknown) {
            if (error) {
              console.log(error);
              reject(error);
            } else {
              console.log("Server is ready to take our messages");
              resolve(success);
            }
          });
        });

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

        await new Promise((resolve, reject) => {
          // send mail
          transporter.sendMail(mailData, (err: any, info: unknown) => {
            if (err) {
              console.error(err);
              reject(err);
            } else {
              console.log(info);
              resolve(info);
            }
          });
        });

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
    case "PUT":
      try {
        await prisma.pengguna.update({
          where: {
            id: String(id)
          },
          data: {
            name: name,
            email: email,
            foto: foto,
            jabatan: jabatan,
            periode: periode,
            role: role,
            status: status,
            npm: npm,
            Divisi: { connect: { id: divisi_id } }
          }
        })

        const result = await prisma.pengguna.findFirst({
          where: {
            email: email
          }
        })

        return res.status(200).json({
          message: "success update pengguna",
          status: true,
          data: result,
          code: 200
        })
      } catch (error: any) {
        return res.status(400).json({
          message: error,
          status: false,
          code: 400
        });
      }
      case "DELETE":
        const  id_pengguna  = _req.query["id"]
        try {
          await prisma.pengguna.delete({
            where: {
              id: String(id_pengguna)
            }
          })
          return res.status(200).json({
            message: "success delete pengguna",
            status: true,
            code: 200
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
