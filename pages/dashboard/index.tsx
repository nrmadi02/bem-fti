import { NextPage } from "next";
import Head from "next/head";
import DashboardLayout from "../../components/Layout/DashboardLayout";

const Dashboard: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>BEM-FTI || Dashboard</title>
        <meta name="description" content="Dashboard BEM-FTI UNISKA MAB" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardLayout title={"Dashboard"}>
        <div>
          <p>wkwkwkk</p>
        </div>
      </DashboardLayout>
    </div>
  )
}

export default Dashboard;