import { NextPage } from "next";
import Head from "next/head";
import DashboardLayout from "../../../components/Layout/DashboardLayout";
import Link from 'next/link';

const Pengguna: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>BEM-FTI || Pengguna</title>
        <meta name="description" content="Pengguna BEM-FTI UNISKA MAB" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardLayout title={"Pengguna"}>
        <div className="flex flex-col">
          <div className="text-sm breadcrumbs">
            <ul>
              <li><Link href="/dashboard">Home</Link></li>
              <li className="font-bold">Pengguna</li>
            </ul>
          </div>
          <div className="mt-3">
            <Link href={'/dashboard/pengguna/tambah'}>
              <div className="btn btn-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                <p className="ml-3">Add</p>
              </div>
            </Link>
          </div>
        </div>
      </DashboardLayout>
    </div>
  )
}

export default Pengguna;