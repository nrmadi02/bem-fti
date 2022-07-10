// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../../database/db';
import { divisi } from '@prisma/client';
import bcrypt from 'bcryptjs'
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
      const { name, email, password, periode, role, status, jabatan, foto, divisi_id } = _req.body
      const salt = await bcrypt.genSalt(5)
      const pw = bcrypt.hashSync(password, salt)
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
