import { NextPage } from "next";
import Head from "next/head";
import DashboardLayout from "../../../components/Layout/DashboardLayout";

const Divisi: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>BEM-FTI || Divisi</title>
        <meta name="description" content="Divisi BEM-FTI UNISKA MAB" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardLayout title={"Divisi"}>
        <div>
          <p>wkwkwkk</p>
        </div>
      </DashboardLayout>
    </div>
  )
}

export default Divisi;