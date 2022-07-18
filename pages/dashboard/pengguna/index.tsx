import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import DashboardLayout from "../../../components/Layout/DashboardLayout";
import Link from 'next/link';
import { prisma } from '../../../database/db';
import { divisi, pengguna } from "@prisma/client";
import { useEffect, useMemo, useState } from 'react';
import Table from "../../../components/Table";
import { ActionTablePengguna, DataCell, RoleCell, StatusCell } from "../../../components/Table/CellsTable";
import { useSession } from 'next-auth/react';

type Props = {
  penggunas: pengguna[],
  divisis: divisi[]
}

export interface User {
  user: any;
}

const Pengguna: NextPage<Props> = ({ penggunas, divisis }) => {
  const { data: session } = useSession()
  const [dataUser, setDataUser] = useState<User | undefined>(undefined)

  useEffect(() => {
    if (session) {
      setDataUser({
        user: session.user
      })
    }
  }, [session])

  useEffect(() => {
    console.log("Data pengguna :", penggunas)
  }, [penggunas])

  const getData = (pengguna: pengguna[]) => {
    const data = pengguna
    return [...data]
  };

  const columns = useMemo(
    () => [
      {
        Header: "Data",
        accessor: (d: pengguna) => {
          return (
            <DataCell email={d.email} foto={d.foto} name={d.name} />
          )
        },
      },
      {
        Header: "Periode",
        accessor: "periode"
      },
      {
        Header: "Jabatan",
        accessor: (d: pengguna) => {
          if (d.jabatan === 'gubernur') {
            return "Gubernur"
          } else if (d.jabatan === 'wakil_gubernur') {
            return "Wakil Gubernur"
          } else if (d.jabatan === 'sekretaris_jendral') {
            return "Sekretaris Umum"
          } else if (d.jabatan === 'bendahara') {
            return "Bendahara Umum"
          } else if (d.jabatan === 'koordinator_divisi') {
            return "Koordinator Divisi"
          } else if (d.jabatan === 'sekretaris_divisi') {
            return "Sekretaris Divisi"
          } else if (d.jabatan === 'staff_divisi') {
            return "Staff Divisi"
          }
        },
      },
      {
        Header: "Divisi",
        accessor: (d: pengguna) => {
          return (
            <>
              <p>{divisis.map(item => (
                d.divisi_id == item.id && item.name
              ))}</p>
            </>
          )
        },
      },
      {
        Header: "Role",
        accessor: "role",
        Cell: RoleCell,
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: StatusCell,
      },
      {
        Header: "Action",
        accessor: "id",
        Cell: ActionTablePengguna,
      },
      
      {
        Header: "NPM",
        accessor: "npm",
      },
      {
        Header: "Nama",
        accessor: "name",
      },
    ],
    [divisis]
  );

  const data = useMemo(() => getData(penggunas), [penggunas]);

  return (
    <div className="">
      <Head>
        <title>BEM-FTI || Pengguna</title>
        <meta name="description" content="Pengguna BEM-FTI UNISKA MAB" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardLayout title={"Pengguna"}>
        <div className="flex h-full flex-col">
          <div className="h-full">
            <div className="text-sm breadcrumbs mb-3">
              <ul>
                <li><Link href="/dashboard">Home</Link></li>
                <li className="font-bold">Pengguna</li>
              </ul>
            </div>
            {dataUser?.user.role === "admin" && <div>
              <Link href={'/dashboard/pengguna/tambah'}>
                <div className="btn btn-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  <p className="ml-3">Add</p>
                </div>
              </Link>
            </div>}
            <div className="relative">
              <Table columns={columns} data={data} menus={null} />
            </div>
          </div>
        </div>
      </DashboardLayout>
    </div>
  )
}

export default Pengguna;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const penggunas = await prisma.pengguna.findMany({
    orderBy: {
      name: "asc"
    }
  })
  const divisis = await prisma.divisi.findMany()
  console.log("Data pengguna :", penggunas)
  return {
    props: {
      penggunas: JSON.parse(JSON.stringify(penggunas)),
      divisis: JSON.parse(JSON.stringify(divisis)),
    }
  }
}