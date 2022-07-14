import { NextPage } from "next";
import Head from "next/head";
import DashboardLayout from "../../../components/Layout/DashboardLayout";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { prisma } from '../../../database/db'
import { divisi } from "@prisma/client";
import React from "react";
import { useForm } from "react-hook-form";
import { useSession } from 'next-auth/react';
import FooterDashboard from "../../../components/Footer/FooterDashboard";

type Props = {
  divisis: divisi[]
}

export interface User {
  user: any;
}


const Profile: NextPage<Props> = ({ divisis }) => {
  const { register, setValue, formState: { errors }, handleSubmit, reset } = useForm();
  const { data: session } = useSession()
  const [data, setData] = useState<User | undefined>(undefined)

  useEffect(() => {
    if (session) {
      setData({
        user: session.user
      })
    }
  }, [session])

  return (
    <div className="">
      <Head>
        <title>BEM-FTI || Profile</title>
        <meta name="description" content="Profile BEM-FTI UNISKA MAB" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardLayout title={"Profile"}>
        <div className="flex flex-col pb-5">
          <div className="text-sm breadcrumbs">
            <ul>
              <li><Link href="/dashboard">Home</Link></li>
              <li className="font-extrabold">Profile</li>
            </ul>
          </div>
          <div>
            <div className="flex items-center flex-col md:flex-row md:w-full mt-5 gap-5">
              <div className="flex items-center flex-col rounded-lg shadow-xl bg-gray-50">
                <div className="m-4">
                  <label className="inline-block mr-2 text-gray-500 mb-3">Foto Profile</label>
                  <div className="flex items-center justify-center ">
                    <div
                      className="flex flex-col w-64 items-center h-56 hover:bg-gray-100 hover:border-gray-300">
                      <img className="w-full h-56 rounded-md" src={data?.user.foto ? data.user.foto : "https://placeimg.com/192/192/people"} alt="_blank" />
                    </div>
                  </div>
                </div>
              </div>
              <input {...register("foto")} type="hidden" name="foto" placeholder="nama..." className="input input-bordered input-primary w-full" />
              <div className="flex flex-col w-full gap-3">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Nama</span>
                  </label>
                  <input disabled defaultValue={data?.user.name} type="text" name="name" placeholder="nama..." className={`input input-bordered input-primary w-full disabled:border-5 disabled:border-primary`} />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input disabled defaultValue={data?.user.email} type="text" name="email" placeholder="email..." className={`input input-bordered input-primary w-full disabled:border-5 disabled:border-primary`} />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">NPM</span>
                  </label>
                  <input disabled defaultValue={data?.user.npm} type="text" name="npm" placeholder="npm..." className={`input input-bordered input-primary w-full disabled:border-5 disabled:border-primary`} />
                </div>
              </div>
            </div>
            <div>
              <div className="flex md:mt-3 flex-col w-full gap-3">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Periode</span>
                  </label>
                  <input disabled defaultValue={data?.user.periode} type="text" name="periode" placeholder="periode..." className={`input input-bordered input-primary w-full disabled:border-5 disabled:border-primary`} />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Status</span>
                  </label>
                  <select disabled name="status" className={`select select-primary w-full disabled:border-5 disabled:border-primary`}>
                    <option value={data?.user.status}>{data?.user.status === "aktif" ? "Aktif" : "Tidak Aktif"}</option>
                  </select>
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Role</span>
                  </label>
                  <select disabled name="role" className={`select select-primary w-full disabled:border-5 disabled:border-primary`}>
                    <option value={data?.user.role}>{data?.user.role === "admin" ? "Administrator" : "Pengguna"}</option>
                  </select>
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Jabatan</span>
                  </label>
                  <select disabled value={data?.user.jabatan} name="jabatan" className={`select select-primary w-full disabled:border-5 disabled:border-primary`}>
                    <option value={''}>-- pilih jabatan --</option>
                    <option  defaultValue={'gubernur'}>Gubernur</option>
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
                  <select disabled value={data?.user.divisi_id} name="divisi_id" className={`select select-primary w-full disabled:border-5 disabled:border-primary`}>
                    <option value={''}>-- pilih divisi --</option>
                    {divisis.length !== 0 && divisis.map(item => (
                      <option  key={item?.id} value={item?.id}>{item?.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 text-red-400 font-bold">
            <p>Merubah data profile hanya bisa dilakukan admin BEM-FTI.</p>
          </div>

          <FooterDashboard />
        </div>
      </DashboardLayout>
    </div>
  )
}

export default Profile;

export async function getStaticProps() {
  const divisis = await prisma.divisi.findMany()
  return {
    props: { divisis }
  }
}