import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import { prisma } from '../../database/db';

type Props = {
  jumlah: any,
  tidakAktif: any,
  aktif: any,
  divisi: any,
}

const Dashboard: NextPage<Props> = ({aktif, divisi, jumlah, tidakAktif}) => {
  return (
    <div className="">
      <Head>
        <title>BEM-FTI || Dashboard</title>
        <meta name="description" content="Dashboard BEM-FTI UNISKA MAB" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardLayout title={"Dashboard"}>
        <div className="flex flex-col">
          <div className="text-sm breadcrumbs">
            <ul>
              <li>Home</li>
            </ul>
          </div>
          <div className="container mx-auto pt-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div
                className="flex justify-between items-center flex-row gap-5 p-5 bg-green-100 border-2 border-green-300 rounded-xl"
              >
                <div className="flex flex-col justify-center items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                </div>
                <div className="flex flex-col justify-center">
                  <div>
                    Aktif
                  </div>
                  <div className="font-bold text-2xl">
                    {aktif}
                  </div>
                </div>
              </div>
              <div
                className="flex justify-between items-center flex-row gap-5 p-5 bg-orange-100 border-2 border-orange-300 rounded-xl"
              >
                <div className="flex flex-col justify-center items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                </div>
                <div className="flex flex-col justify-center">
                  <div>
                    Tidak Aktif
                  </div>
                  <div className="font-bold text-2xl">
                    {tidakAktif}
                  </div>
                </div>
              </div>
              <div
                className="flex justify-between items-center flex-row gap-5 p-5 bg-purple-100 border-2 border-purple-300 rounded-xl"
              >
                <div className="flex flex-col justify-center items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                  </svg>
                </div>
                <div className="flex flex-col justify-centerr">
                  <div>
                    Divisi
                  </div>
                  <div className="font-bold text-2xl">
                    {divisi}
                  </div>
                </div>
              </div>
              <div
                className="flex justify-between items-center flex-row gap-5 p-5 bg-blue-100 border-2 border-blue-300 rounded-xl"
              >
                <div className="flex flex-col justify-center items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                </div>
                <div className="flex flex-col justify-center">
                  <div>
                    Total
                  </div>
                  <div className="font-bold text-2xl">
                    {jumlah}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </div>
  )
}

export default Dashboard;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const aktif = await prisma.pengguna.aggregate({
    _count: {
      _all: true
    },
    where: {
      status: 'aktif'
    }
  })

  const tidak_aktif = await prisma.pengguna.aggregate({
    _count: {
      _all: true
    },
    where: {
      status: 'tidak_aktif'
    }
  })

  const divisi = await prisma.divisi.aggregate({
    _count: {
      _all: true
    }
  })

  const jumlah = await prisma.pengguna.aggregate({
    _count: {
      _all: true
    }
  })
  
  return {
    props: {
      aktif: JSON.parse(JSON.stringify(aktif._count._all)),
      tidakAktif: JSON.parse(JSON.stringify(tidak_aktif._count._all)),
      divisi: JSON.parse(JSON.stringify(divisi._count._all)),
      jumlah: JSON.parse(JSON.stringify(jumlah._count._all)),
    }
  }
}