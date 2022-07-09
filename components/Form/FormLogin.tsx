import { NextPage } from "next";

const FormLogin: NextPage = () => {
  return (
    <>
      <div>
        <p className="ml-3 text-white font-extrabold text-3xl sm:text-5xl">LOGIN</p>
      </div>
      <div className="p-7 rounded-lg shadow-xl mt-3 sm:mt-5 flex flex-col gap-5">
        <div className="form-control">
          <label className="label">
            <span className="label-text text-white">Email</span>
          </label>
          <input type="text" placeholder="email..." className="input input-bordered w-full max-w-xs" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-white">Password</span>
          </label>
          <input type="password" placeholder="password..." className="input input-bordered w-full max-w-xs" />
        </div>
      </div>
      <div className="mt-5">
        <button className="btn bg-orange-300 shadow-lg px-10 transition-all ml-3 hover:px-12 hover:bg-orange-200 text-teal-800 active:bg-orange-300">Login</button>
      </div>
    </>
  )
}

export default FormLogin;