import { NextPage } from "next";
import Head from "next/head";
import FooterDashboard from "../../components/Footer/FooterDashboard";
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
        <div className="flex flex-col">
          <div className="h-screen">
            <p>wkkwkwkkw</p>
          </div>
          <FooterDashboard />
        </div>
      </DashboardLayout>
    </div>
  )
}

export default Dashboard;