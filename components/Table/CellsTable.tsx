import { NextPage } from "next";
import classNames from "classnames"
import { Fragment, useState } from "react";
import { useFloating, shift, autoPlacement } from "@floating-ui/react-dom";
import { Popover, Transition } from '@headlessui/react'

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
                <button onClick={() => {
                  setLoading({
                    type: "delete",
                    status: true
                  })
                  setTimeout(() => {
                    console.log(id + " delete pengguna")
                    setLoading({
                      type: "",
                      status: false
                    })
                  }, 2000)
                }} className={`btn btn-ghost btn-sm !justify-start ${loading.status && loading.type == "delete" ? "loading" : ""}`}>
                  {loading.type == "delete" ? "delete..." : (<span className="flex gap-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="text-red-600" viewBox="0 0 16 16">
                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                    </svg>
                    <p>Delete</p>
                  </span>)}
                </button>
              </div>

            </Popover.Panel>

          </>
        )}
      </Popover>
    </div>
  );
}
