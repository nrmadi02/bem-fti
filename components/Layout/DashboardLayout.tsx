import { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import LogoBem from "../../assets/logo/logo-bem.webp"
import SidebarItems from "../SidebarItems/SidebarItems";
import axios from "axios";
import Link from "next/link";
import FooterDashboard from "../Footer/FooterDashboard";


type Props = {
  title: String
  children: JSX.Element
}

export interface User {
  user: any;
}

const DashboardLayout: NextPage<Props> = ({ children, title }) => {
  const { data: session } = useSession()
  const [data, setData] = useState<User | undefined>(undefined)
  const [open, setOpen] = useState(true)
  const [divisi, setDivisi] = useState<any>()

  const handleLogOut = async () => {
    await signOut({
      callbackUrl: '/login'
    })
  }

  useEffect(() => {
    if (session) {
      setData({
        user: session.user
      })
    }
  }, [session])

  const fetchDivisiByID = async (id: any) => {
    axios.get('/api/v1/divisi/' + id, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(
      res => {
        if (res.data.status) {
          setDivisi(res.data.data)
        }
      }
    ).catch(
      err => {
        setDivisi('')
      }
    )
  }

  useEffect(() => {
    console.log("Data User :", data)
    data && fetchDivisiByID(data.user.divisi_id)
  }, [data])

  useEffect(() => {
    console.log("Divisi : ", divisi)
  }, [divisi])

  return (
    <div className="flex flex-col md:flex-row relative z-0">
      <div className={`transition-all hidden md:block flex-none fixed bg-base-200 text-primary z-[9999] p-5 h-full ${open ? 'w-24' : 'w-72'}`}>
        <div className="flex flex-col">
          <div className="flex flex-row justify-center items-center">
            <div className={`flex gap-3 justify-center items-center ${!open && "mr-5"}`}>
              <Image data-aos="zoom-in" className="transition-all" width={47} quality={30} height={47} src={LogoBem} alt="_logobem" />
              {!open && (<p data-aos="zoom-in" className="text-3xl font-extrabold">BEM-FTI</p>)}
            </div>
          </div>
          <div className="shadow-lg w-full h-[1px] bg-primary mt-3"></div>
          <div className="">
            <SidebarItems isOpen={!open} user={data?.user} />
          </div>
        </div>
      </div>
      <div className="flex flex-row pb-5 px-5 sticky top-0 bg-base-100 z-[100] text-primary pt-5 justify-center md:hidden">
        <div className="absolute top-5 left-5">
          <label className="btn btn-ghost btn-circle swap swap-rotate">
            <input type="checkbox" checked={!open} onChange={() => setOpen(!open)} />
            <svg className="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" /></svg>
            <svg className="swap-on fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" /></svg>
          </label>
        </div>
        <div data-aos="zoom-in" className="flex gap-3 items-center mr-5">
          <Image className="transition-all" width={43} quality={30} height={43} src={LogoBem} alt="_logobem" />
          <p className="text-2xl font-extrabold">BEM-FTI</p>
        </div>
      </div>
      {!open && (
        <>
          <div data-aos="zoom-in" className="fixed top-5 right-5 text-primary z-[9999] md:hidden">
            <label className="btn btn-ghost btn-circle swap swap-rotate">
              <input type="checkbox" checked={!open} onChange={() => setOpen(!open)} />
              <svg className="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" /></svg>
              <svg className="swap-on fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" /></svg>
            </label>
          </div>
          <div className="fixed transition-all bg-black md:hidden bg-opacity-50 inset-0 flex justify-start items-start z-[999]">
            <div data-aos="fade-right" className="w-72 bg-base-200 h-screen">
              <div className="mt-5">
                <SidebarItems isOpen={!open} user={data?.user} />
              </div>
            </div>
          </div>
        </>
      )}
      <div className={`flex-initial w-full md:overflow-hidden ${open ? 'ml-0 md:ml-24' : 'md:ml-72'}`}>
        <div className="flex h-screen flex-col">
          <div className="w-full p-5 pt-0 pb-0 md:pt-3">
            <div className="text-black z-[99] bg-base-100">
              <div className="navbar justify-end">
                <div className="hidden md:block">
                  <label className="btn btn-ghost btn-circle swap swap-rotate">
                    <input type="checkbox" checked={!open} onChange={() => setOpen(!open)} />
                    <svg className="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" /></svg>
                    <svg className="swap-on fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" /></svg>
                  </label>
                </div>
                <div className="flex-1 hidden md:block">
                  <a className="btn btn-ghost normal-case text-xl ">BEM-FTI</a>
                </div>
                <div className="flex-none gap-2">
                  <div className="hidden md:flex md:flex-col md:items-end">
                    <p className="text-sm font-black">{data?.user.name}</p>
                    <p className="text-[10px]">{divisi?.name}</p>
                  </div>
                  <div className="md:hidden flex flex-col items-start">
                    <p className="text-sm font-black">{data?.user.name}</p>
                    <p className="text-[10px]">{divisi?.name}</p>
                  </div>

                  <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                      <div className="w-10 rounded-full">
                        <img src={`${data?.user && data.user.foto ? data.user.foto : "https://placeimg.com/192/192/people"}`} />
                      </div>
                    </label>
                    <ul tabIndex={0} className="mt-3 p-2 bg-base-200 shadow menu menu-compact dropdown-content rounded-box w-52">
                      <li>
                        <Link href={"/dashboard/profile"}>
                          <a className="justify-between">
                            Profile
                          </a>
                        </Link>
                      </li>
                     {data?.user.role === "admin" &&  <li><a>Settings</a></li>}
                      <li><a onClick={handleLogOut}>Logout</a></li>
                    </ul>
                  </div>

                </div>
              </div>
              <div className="shadow-lg w-full h-[1px] bg-primary"></div>
            </div>
          </div>
          <div className="w-full md:overflow-y-scroll">
            <div className="p-5 pb-44 md:pb-24">
              {children}
            </div>
          </div>
          <div className={`transition-all w-full fixed bottom-0 right-0 ${open ? 'pl-0 md:pl-24' : 'md:pl-72'}`}>
            <FooterDashboard />
          </div>
        </div>

      </div>

    </div>
  )
}

export default DashboardLayout;