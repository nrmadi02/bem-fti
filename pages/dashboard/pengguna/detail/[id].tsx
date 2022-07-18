import { divisi, pengguna } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import DashboardLayout from "../../../../components/Layout/DashboardLayout";
import { prisma } from '../../../../database/db';

type Props = {
  divisis: divisi[]
  pengguna: pengguna
}

const DetailPengguna: NextPage<Props> = ({ divisis, pengguna }) => {
  return (
    <>
      <Head>
        <title>BEM-FTI || Detail Pengguna</title>
        <meta name="description" content="Detail Pengguna BEM-FTI UNISKA MAB" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardLayout title={"Detail Pengguna"}>
        <div className="flex flex-col">
          <div className="text-sm breadcrumbs">
            <ul>
              <li><Link href="/dashboard">Home</Link></li>
              <li><Link href="/dashboard/pengguna">Pengguna</Link></li>
              <li className="font-bold">Detail Pengguna</li>
            </ul>
          </div>
          <div className="flex flex-col mt-3">
            <div className="flex justify-center items-center">
              <div className="h-72 flex items-center justify-center">
                <img className="hover:shadow-lg hover:scale-105 transition-all hover:border-primary-focus hover:-translate-y-2 h-4/5 md:h-72 md:w-72 rounded-full border-2 border-primary" src={`${pengguna && pengguna.foto ? pengguna.foto : "https://placeimg.com/192/192/people"}`} />
              </div>
            </div>
            <div className="flex-col flex">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Nama</span>
                </label>
                <input disabled defaultValue={pengguna.name} type="text" name="name" placeholder="nama..." className={`input input-bordered input-primary w-full disabled:border-5 disabled:border-primary`} />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input disabled defaultValue={pengguna.email} type="text" name="email" placeholder="email..." className={`input input-bordered input-primary w-full disabled:border-5 disabled:border-primary`} />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">NPM</span>
                </label>
                <input disabled defaultValue={String(pengguna.npm)} type="text" name="npm" placeholder="npm..." className={`input input-bordered input-primary w-full disabled:border-5 disabled:border-primary`} />
              </div>
              <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Periode</span>
                  </label>
                  <input disabled defaultValue={pengguna.periode} type="text" name="periode" placeholder="periode..." className={`input input-bordered input-primary w-full disabled:border-5 disabled:border-primary`} />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Status</span>
                  </label>
                  <select disabled name="status" className={`select select-primary w-full disabled:border-5 disabled:border-primary`}>
                    <option value={pengguna.status}>{pengguna.status === "aktif" ? "Aktif" : "Tidak Aktif"}</option>
                  </select>
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Role</span>
                  </label>
                  <select disabled name="role" className={`select select-primary w-full disabled:border-5 disabled:border-primary`}>
                    <option value={pengguna.role}>{pengguna.role === "admin" ? "Administrator" : "Pengguna"}</option>
                  </select>
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Jabatan</span>
                  </label>
                  <select disabled value={pengguna.jabatan} name="jabatan" className={`select select-primary w-full disabled:border-5 disabled:border-primary`}>
                    <option value={''}>-- pilih jabatan --</option>
                    <option  value={'gubernur'}>Gubernur</option>
                    <option  value={'wakil_gubernur'}>Wakil Gubernur</option>
                    <option  value={'sekretaris_jendral'}>Sekretaris Jendral</option>
                    <option  value={'bendahara'}>Bendahara</option>
                    <option  value={'koordinator_divisi'}>Koordinator Divisi</option>
                    <option  value={'sekretaris_divisi'}>Sekretaris Divisi</option>
                    <option  value={'staff_divisi'}>Staff Divisi</option>
                  </select>
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Divisi</span>
                  </label>
                  <select disabled value={pengguna.divisi_id} name="divisi_id" className={`select select-primary w-full disabled:border-5 disabled:border-primary`}>
                    <option value={''}>-- pilih divisi --</option>
                    {divisis.length !== 0 && divisis.map(item => (
                      <option  key={item?.id} value={item?.id}>{item?.name}</option>
                    ))}
                  </select>
                </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  )
}

export default DetailPengguna;


export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id
  const pengguna = await prisma.pengguna.findFirst({
    where: {
      id: String(id)
    }
  })
  const divisis = await prisma.divisi.findMany()
  console.log("Data pengguna :", pengguna)
  return {
    props: {
      pengguna: JSON.parse(JSON.stringify(pengguna)),
      divisis: divisis
    }
  }
}