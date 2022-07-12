import { NextPage } from "next";
import Head from "next/head";
import DashboardLayout from "../../../../components/Layout/DashboardLayout";
import Link from 'next/link';
import { ChangeEvent, useState, useEffect } from 'react';
import Image from "next/image";
import { prisma } from '../../../../database/db'
import { divisi } from "@prisma/client";
import axios from "axios";
import toast from "react-hot-toast";
import React from "react";
import { useForm } from "react-hook-form";

type Props = {
  divisis: divisi[]
}


const TambahPengguna: NextPage<Props> = ({ divisis }) => {
  const { register, setValue, formState: { errors }, handleSubmit, reset } = useForm();

  const [file, setFile] = useState('');
  const [img, setImg] = useState('')
  const [image, setImage] = useState('')
  const [loadingImg, setLoadingImg] = useState(false)
  const [loading, setLoading] = useState(false)


  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    setImage('')
    let reader = new FileReader();
    e.target.files![0] && setFile(URL.createObjectURL(e.target.files![0]))
    if (e.target.files![0]) {
      reader.readAsDataURL(e.target.files![0])
      reader.onload = (a: any) => {
        var base64result = a.target.result.split(',')[1];
        a.target.result && setImg(base64result)
      }
    }
  }

  const handleUploadImage = () => {
    setImage('')
    setLoadingImg(true)
    let body = new FormData()
    body.set('key', 'c388dc6114a4f0e94b523305f5604009')
    body.append('image', img)
    axios.post('https://api.imgbb.com/1/upload?key=c388dc6114a4f0e94b523305f5604009', body)
      .then(
        (res: any) => {
          setImage(res.data.data.display_url)
          setImg('')
          setLoadingImg(false)
          toast.success("Success upload image")
          setValue("foto", res.data.data.display_url)
        }
      ).catch(
        (err: any) => {
          setImage('')
          setImg('')
          setLoadingImg(false)
          toast.error("Error upload image")
          setValue("foto", "")
        }
      )
  }

  const handleAddData = async (data: any) => {
    setLoading(true)
    await axios.post("/api/v1/pengguna", data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      console.log(res)
      if (res) {
        if (res.status) {
          setLoading(false)
          toast.success(res.data.message)
          reset()
          setImage('')
          setImg('')
          setFile('')
        }
      }
    }).catch((err) => {
      console.log(err)
      setLoading(false)
      toast.error(err.response.data.message)
    })
  }

  return (
    <div className="">
      <Head>
        <title>BEM-FTI || Tambah Pengguna</title>
        <meta name="description" content="Tambah Pengguna BEM-FTI UNISKA MAB" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardLayout title={"Tambah Pengguna"}>
        <div className="flex flex-col pb-5">
          <div className="text-sm breadcrumbs">
            <ul>
              <li><Link href="/dashboard">Home</Link></li>
              <li><Link href="/dashboard/pengguna">Pengguna</Link></li>
              <li className="font-bold">Tambah Pengguna</li>
            </ul>
          </div>
          <form onSubmit={handleSubmit(handleAddData)}>
            <div className="flex flex-col md:flex-row md:w-full mt-5 gap-5">
              <div className="flex flex-col rounded-lg shadow-xl bg-gray-50">
                <div className="m-4">
                  <label className="inline-block mr-2 text-gray-500">Upload Foto Profile</label>
                  <div className="mb-2 badge">jpg, jpeg, png, etc..</div>
                  <div className="flex items-center justify-center ">
                    <label
                      className="flex flex-col w-full justify-center h-56 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                      {!file && <div className="flex flex-col items-center justify-center pt-7">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                          fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                          Attach a file</p>
                      </div>}
                      {file && <Image width={100} height={1000} quality={50} src={file} alt="_blank" />}
                      <input accept='image/*' type="file" onChange={(e) => {
                        handleChangeFile(e)
                      }} className="opacity-0" />
                    </label>
                  </div>
                </div>
                {image && <div className="ml-2 text-success font-semibold">
                  <p>Sukses Upload</p>
                </div>}
                <div className="flex justify-center p-2 mb-2">
                  <button type="button" disabled={!img} onClick={handleUploadImage} className={`w-full px-4 py-2 btn btn-primary rounded shadow-xl ${loadingImg && 'loading'}`}>Upload</button>
                </div>
              </div>
              <input {...register("foto")} type="hidden" name="foto" placeholder="nama..." className="input input-bordered input-primary w-full" />
              <div className="flex flex-col w-full gap-3">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Nama</span>
                    {errors!.name && <span className="label-text-alt text-red-400">{'Nama wajib ada'}</span>}
                  </label>
                  <input {...register("name", { required: true })} type="text" name="name" placeholder="nama..." className={`input input-bordered input-primary w-full ${errors!.name && 'input-error'}`} />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Email</span>
                    {errors!.email && <span className="label-text-alt text-red-400">{'Email invalid'}</span>}
                  </label>
                  <input {...register("email", {
                    required: true,
                    pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                  })} type="text" name="email" placeholder="email..." className={`input input-bordered input-primary w-full ${errors!.email && 'input-error'}`} />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Password</span>
                    {errors!.password && <span className="label-text-alt text-red-400">{'Password invalid'}</span>}
                  </label>
                  <input {...register("password", {
                    required: true,
                    minLength: 6,
                  })} type="text" name="password" placeholder="password..." className={`input input-bordered input-primary w-full ${errors!.password && 'input-error'}`} />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Periode</span>
                    {errors!.periode && <span className="label-text-alt text-red-400">{'Periode wajib ada'}</span>}
                  </label>
                  <input {...register("periode", {
                    required: true
                  })} type="text" name="periode" placeholder="periode..." className={`input input-bordered input-primary w-full ${errors!.periode && 'input-error'}`} />
                </div>
              </div>
            </div>
            <div>
              <div className="flex md:mt-3 flex-col w-full gap-3">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">NPM</span>
                    {errors!.npm && <span className="label-text-alt text-red-400">{'NPM wajib ada'}</span>}
                  </label>
                  <input {...register("npm", {
                    required: true
                  })} type="text" name="npm" placeholder="npm..." className={`input input-bordered input-primary w-full ${errors!.npm && 'input-error'}`} />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Status</span>
                    {errors!.status && <span className="label-text-alt text-red-400">{'Status wajib dipilih'}</span>}
                  </label>
                  <select {...register("status", {
                    required: true,
                    minLength: 1
                  })} name="status" className={`select select-primary w-full ${errors!.status && 'select-error'}`}>
                    <option value={''}>-- pilih status --</option>
                    <option value={'aktif'}>Aktif</option>
                    <option value={'tidak_aktif'}>Tidak Aktif</option>
                  </select>
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Role</span>
                    {errors!.role && <span className="label-text-alt text-red-400">{'Role wajib dipilih'}</span>}
                  </label>
                  <select {...register("role", {
                    required: true,
                    minLength: 1
                  })} name="role" className={`select select-primary w-full ${errors!.role && 'select-error'}`}>
                    <option value={''}>-- pilih role --</option>
                    <option value={'admin'}>Administrator</option>
                    <option value={'pengguna'}>Pengguna</option>
                  </select>
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Jabatan</span>
                    {errors!.jabatan && <span className="label-text-alt text-red-400">{'Jabatan wajib dipilih'}</span>}
                  </label>
                  <select {...register("jabatan", {
                    required: true,
                    minLength: 1
                  })} name="jabatan" className={`select select-primary w-full ${errors!.jabatan && 'select-error'}`}>
                    <option value={''}>-- pilih jabatan --</option>
                    <option value={'gubernur'}>Gubernur</option>
                    <option value={'wakil_gubernur'}>Wakil Gubernur</option>
                    <option value={'sekretaris_jendral'}>Sekretaris Jendral</option>
                    <option value={'bendahara'}>Bendahara</option>
                    <option value={'koordinator_divisi'}>Koordinator Divisi</option>
                    <option value={'sekretaris_divisi'}>Sekretaris Divisi</option>
                    <option value={'staff_divisi'}>Staff Divisi</option>
                  </select>
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Divisi</span>
                    {errors!.divisi_id && <span className="label-text-alt text-red-400">{'Divisi wajib dipilih'}</span>}
                  </label>
                  <select {...register("divisi_id", {
                    required: true,
                    minLength: 1
                  })} name="divisi_id" className={`select select-primary w-full ${errors!.divisi_id && 'select-error'}`}>
                    <option value={''}>-- pilih divisi --</option>
                    {divisis.length !== 0 && divisis.map(item => (
                      <option key={item?.id} value={item?.id}>{item?.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-5">
              <button type="submit" className={`btn btn-primary px-10 ${loading && 'loading'}`}>{loading ? "loading..." : "+ Tambah"}</button>
            </div>
          </form>
        </div>

      </DashboardLayout>
    </div>
  )
}

export default TambahPengguna;

export async function getStaticProps() {
  const divisis = await prisma.divisi.findMany()
  return {
    props: { divisis }
  }
}