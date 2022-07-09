/* eslint-disable @next/next/no-img-element */
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import LogoBem from "../assets/logo/logo-bem.webp"
import LogoKabinet from "../assets/logo/logo-kabinet-min.png"
import FormLogin from "../components/Form/FormLogin";

const Login: NextPage = () => {
  return (
    <>
      <Head>
        <title>BEM-FTI || Login</title>
        <meta name="description" content="Dashboard BEM-FTI UNISKA MAB" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-screen lg:bg-teal-800">
        <div className="h-full flex flex-row w-full">
          <div className="basis-3/5 overflow-hidden lg:inline-flex hidden">
            <div className="bg-teal-800 z-10 -ml-[35rem] -mt-[14rem] w-[69rem] h-[70rem] rounded-full">
              <div className="ml-[32rem] mt-[13rem] h-screen flex flex-col justify-center items-center p-5">
                <div data-aos="fade-right" className="flex justify-center gap-5">
                  <Image width={128} height={128} priority={true} quality={80} src={LogoBem} alt="_logobem" />
                  <Image width={128} height={128} priority={true} quality={50} src={LogoKabinet} alt="_logokabinet" />
                </div>
                <div data-aos="zoom-in" className="flex flex-col items-center justify-center text-white mt-3">
                  <p className="font-extrabold text-5xl ml-28 text-orange-300">Badan Eksekutif Mahasiswa</p>
                  <p className="ml-36 font-black">Fakultas Teknologi Informasi</p>
                  <p className="ml-10 mt-5 text-xl text-gray-200">Universitas Islam kalimantan</p>
                  <p className="ml-10 text-xl text-gray-200">Muhammad Arsyad Al-Banjari</p>
                </div>
              </div>
            </div>
            <div className="bg-teal-900 z-0 -ml-[81rem] -mt-[16rem] w-[84rem] h-[85rem] rounded-full">

            </div>
          </div>
          <div className="basis-full lg:basis-2/5 overflow-auto bg-gradient-to-r from-teal-900 to-teal-700 lg:bg-gradient-to-t lg:from-teal-800 lg:to-teal-800 w-full">
            <div className="flex flex-col sm:flex-row">
              <div className="flex-col flex justify-center items-center sm:h-screen p-5 lg:hidden">
                <div data-aos="fade-right" className="flex justify-center gap-5  lg:hidden">
                  <Image width={70} height={70}  priority={true} quality={40} src={LogoBem} alt="_logobem" />
                  <Image width={70} height={70} priority={true} quality={10} src={LogoKabinet} alt="_logokabinet" />
                </div>
                <div data-aos="zoom-in" className="hidden sm:flex flex-col text-center items-center justify-center lg:hidden text-white mt-3">
                  <p className="font-extrabold text-3xl text-orange-300">Badan Eksekutif Mahasiswa</p>
                  <p className="font-black">Fakultas Teknologi Informasi</p>
                  <p className="mt-5 text-md text-gray-200">Universitas Islam kalimantan</p>
                  <p className="text-md text-gray-200">Muhammad Arsyad Al-Banjari</p>
                </div>
                <div data-aos="zoom-in" className="sm:hidden flex flex-col text-center items-center justify-center mt-5">
                  <p className="font-extrabold text-3xl text-orange-300">Badan Eksekutif Mahasiswa</p>
                  <p className="font-black text-white">Fakultas Teknologi Informasi</p>
                  <p className="mt-5 text-md text-gray-200">Universitas Islam kalimantan</p>
                  <p className="text-md text-gray-200">Muhammad Arsyad Al-Banjari</p>
                </div>
              </div>
              <div className="basis-8/12 p-5 lg:basis-full h-screen flex justify-center items-center">
                <div>
                  <FormLogin />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login;