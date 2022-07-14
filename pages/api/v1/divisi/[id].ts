// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../../database/db';


// eslint-disable-next-line import/no-anonymous-default-export
export default async function (_req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = _req;

  switch (method) {
    case "GET":
      try {
        const { id } = _req.query
        const divisi = await prisma.divisi.findFirst({
          where: {
            id: String(id)
          }
        })
        return res.status(200).json({
          message: "success get divisi",
          data: divisi,
          status: true,
          code: 200
        });
      } catch (error: any) {
        return res.status(400).json({
          message: "error get divisi",
          status: false,
          code: 400
        });
      }
    default:
      return res.status(400).json({ message: "Method are not supported" });
  }
}
