import { NextPage } from "next";
import { useForm } from "react-hook-form";
import { signIn } from 'next-auth/react';
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const FormLogin: NextPage = () => {
  const router = useRouter()
  const { register, setValue, formState: { errors }, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false)
  const [messageErr, setMessageErr] = useState('')
  const [isShow, setIsShow] = useState(false)

  const setSuccessLogin = () => {
    toast.success('sukses login')
    router.replace('/dashboard')
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  const setFailedLogin = (result: any) => {
    toast.error("gagal login: " + result?.error)
    setMessageErr(result?.error)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  const handleLogin = async (data: any) => {
    setLoading(true)
    setMessageErr('')
    const result = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
    });
    if (!result?.error) {
      setSuccessLogin()
    } else {
      setFailedLogin(result)
    }
  }
  return (
    <>
      <div>
        <p className="ml-3 text-white font-extrabold text-3xl sm:text-5xl">LOGIN</p>
      </div>
      <form onSubmit={handleSubmit(handleLogin)} >
        <div className="p-7 pb-5 rounded-lg shadow-xl mt-3 sm:mt-5 flex flex-col gap-5">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white">Email</span>
              {errors!.email && <span className="label-text-alt text-red-500">{'Email invalid'}</span>}
            </label>
            <input {...register('email', {
              required: true,
              pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            })} type="text" placeholder="email..." className={`input input-bordered w-full ${errors!.email && 'input-error'}`} />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white">Password</span>
              {errors!.password && <span className="label-text-alt text-red-500">{'Password invalid'}</span>}
            </label>
            <div className="relative">
              <input {...register('password', {
                required: true,
                minLength: 6,
              })} type={isShow ? "text" : "password"} placeholder="password..." className={`input input-bordered w-full ${errors!.password && 'input-error'}`} />
              <div onClick={() => {
                setIsShow(!isShow)
              }} className="absolute btn btn-ghost right-0 text-gray-500">
                {!isShow && <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>}
                {isShow && <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>}
              </div>
            </div>
          </div>
          {messageErr && <p className="text-red-500">{messageErr}</p>}
        </div>
        <div className="mt-5">
          <button type="submit" className={`btn bg-orange-300 shadow-lg px-10 transition-all ml-3 hover:px-12 hover:bg-orange-200 text-teal-800 active:bg-orange-300 ${loading && 'loading'}`}>{`${loading ? 'loading...' : 'login'}`}</button>
        </div>
      </form>
    </>
  )
}

export default FormLogin;