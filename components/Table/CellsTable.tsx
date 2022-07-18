import { NextPage } from "next";
import classNames from "classnames"
import { Fragment, useState, useEffect } from 'react';
import { useFloating, shift, autoPlacement } from "@floating-ui/react-dom";
import { Popover, Transition, Dialog } from '@headlessui/react'
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";
import toast from "react-hot-toast";

//@ts-ignore
export const RoleCell: NextPage = ({ value }) => {

  const status = value ? value.toLowerCase() : "unknown";
  return (
    <span
      className={classNames(
        "px-3 py-1 uppercase leading-wide font-bold text-[12px] rounded-full shadow-sm",
        status.startsWith("admin") ? "bg-purple-500 text-white" : null,
        status.startsWith("pengguna") ? "bg-blue-500 text-white" : null
      )}
    >
      {status.startsWith("admin") && "Administrator"}
      {status.startsWith("pengguna") && "Pengguna"}
    </span>
  )
}

//@ts-ignore
export const StatusCell: NextPage = ({ value }) => {
  const status = value ? value.toLowerCase() : "unknown";
  return (
    <span
      className={classNames(
        "px-3 py-1 uppercase leading-wide font-bold text-[12px] rounded-full shadow-sm",
        status.startsWith("aktif") ? "bg-success text-white" : null,
        status.startsWith("tidak_aktif") ? "bg-warning text-white" : null
      )}
    >
      {status.startsWith("aktif") && "Aktif"}
      {status.startsWith("tidak_aktif") && "Tidak Aktif"}
    </span>
  )
}

type Props = {
  name: string,
  email: string,
  foto: string
}
export const DataCell: NextPage<Props> = ({ name, foto, email }) => {
  return (
    <div className="flex flex-row items-center gap-3">
      <div>
        <img className="w-10 h-10 rounded-full max-w-none" src={`${foto ? foto : "https://placeimg.com/192/192/people"}`} />
      </div>
      <div>
        <p className="font-extrabold">{name}</p>
        <p>{email}</p>
      </div>
    </div>
  )
}

export interface User {
  user: any;
}

//@ts-ignore
export const ActionTablePengguna = ({ value }) => {
  const id = value ? value : "unknown";
  const { x, y, reference, floating, strategy } = useFloating({
    placement: "left",
    middleware: [autoPlacement()],
  });
  const [loading, setLoading] = useState({
    type: "",
    status: false
  })
  const [data, setData] = useState<User | undefined>(undefined)
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      setData({
        user: session.user
      })
    }
  }, [session])

  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const handleDeletePengguna = async (id: any) => {
    setLoading({
      ...loading,
      type: "delete",
      status: true
    })
    await axios.delete("/api/v1/pengguna?id="+id, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (res) {
        if (res.status) {
          toast.success(res.data.message)
          setLoading({
            type: "",
            status: false
          })
          closeModal()
          router.reload()
        }
      }
    }).catch((err) => {
      setLoading({
        type: "",
        status: false
      })
      toast.error(err.response.data.message)
      closeModal()
    })
  }

  return (
    <div className="">
      <Popover className="static">
        {/* @ts-ignore */}
        {({ open }) => (
          <>
            <Popover.Button>
              <div ref={reference} className="btn btn-ghost flex flex-col gap-1">
                <div className="w-1 h-1 rounded-full bg-primary"></div>
                <div className="w-1 h-1 rounded-full bg-primary"></div>
                <div className="w-1 h-1 rounded-full bg-primary"></div>
              </div>
            </Popover.Button>
            <Popover.Panel ref={floating} style={{
              position: strategy,
              top: y ?? "",
              left: x ?? "",
            }} className="absolute">
              <div className="mt-1 mr-3 z-50 p-2 flex flex-col shadow bg-base-300 rounded-box w-52">
                {data?.user.role === "admin" && <button onClick={() => {
                  setLoading({
                    type: "edit",
                    status: true
                  })
                  setTimeout(() => {
                    setLoading({
                      type: "",
                      status: false
                    })
                    router.push('/dashboard/pengguna/edit/' + id)
                  }, 2000)
                }} className={`btn btn-ghost btn-sm !justify-start ${loading.status && loading.type == "edit" ? "loading" : ""}`}>
                  {loading.type == "edit" ? "edit..." : (<span className="flex gap-4 items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <p>Edit</p>
                  </span>)}
                </button>
                }

                <button onClick={() => {
                  setLoading({
                    type: "detail",
                    status: true
                  })
                  setTimeout(() => {
                    setLoading({
                      type: "",
                      status: false
                    })
                    router.push('/dashboard/pengguna/detail/' + id)
                  }, 2000)
                }} className={`btn btn-ghost btn-sm !justify-start ${loading.status && loading.type == "detail" ? "loading" : ""}`}>
                  {loading.type == "detail" ? "detail..." : (<span className="flex gap-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                    </svg>
                    <p>Detail</p>
                  </span>)}
                </button>
                {data?.user.role === "admin" && <button onClick={() => {
                  openModal()
                }} className={`btn btn-ghost btn-sm !justify-start ${loading.status && loading.type == "delete" ? "loading" : ""}`}>
                  {loading.type == "delete" ? "delete..." : (<span className="flex gap-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-red-600" viewBox="0 0 16 16">
                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                    </svg>
                    <p>Delete</p>
                  </span>)}
                </button>
                }
              </div>

            </Popover.Panel>

          </>
        )}
      </Popover>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Yakin ingin menghapus pengguna ini ?
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Semua data yang dihapus tidak akan bisa dikembalikan lagi.
                    </p>
                  </div>

                  <div className="mt-4 flex flex-row gap-3">
                    <button
                      type="button"
                      className={`btn inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 ${loading.status && loading.type == "delete" ? "loading" : ""}`}
                      onClick={() => {
                        handleDeletePengguna(id)
                      }}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="btn inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
