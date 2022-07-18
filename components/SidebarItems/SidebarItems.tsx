import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
  isOpen: boolean
  user: any
}

const SidebarItems: NextPage<Props> = ({ isOpen, user }) => {
  const router = useRouter()
  const menuItemsAdmin = [
    {
      href: '/dashboard',
      title: 'Dashboard',
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>,
      sub: ['/profile']
    },
    {
      href: '/dashboard/divisi',
      title: 'Divisi',
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>,
      sub: []
    },
    {
      href: '/dashboard/pengguna',
      title: 'Pengguna',
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>,
      sub: ['/tambah', '/edit', '/detail']
    },
  ];

  const menuItems = [
    {
      href: '/dashboard',
      title: 'Dashboard',
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>,
      sub: ['/profile']
    },
    {
      href: '/dashboard/pengguna',
      title: 'Pengguna',
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>,
      sub: ['/detail']
    },
  ]
  return (
    <nav>
      <ul>
        {user?.role == "admin" && menuItemsAdmin.map(({ href, title, icon, sub }, idx) => (
          <li className='m-2' key={title}>
            <Link href={href}>
              <a
                className={`text-white flex rounded-md ${isOpen ? "p-2" : "p-0 sm:p-2"} transition-all hover:bg-base-300 cursor-pointer `}
              >
                <div className={`flex w-full items-center gap-5 flex-row ${isOpen ? "" : "justify-center"}`}>

                  <p className={`transition-all ${isOpen ? "block" : "hidden"} md:block ${router.asPath === href ||
                    router.asPath.includes(sub[0]) ||
                    router.asPath.includes(sub[1]) ||
                    router.asPath.includes(sub[2]) ? 'text-primary' : 'text-black'}`}>
                    {icon}
                  </p>
                  <p data-aos="fade-left" className={`transition-all ${isOpen ? "block" : "hidden"} ${router.asPath === href ||
                    router.asPath.includes(sub[0]) ||
                    router.asPath.includes(sub[1]) ||
                    router.asPath.includes(sub[2]) ? 'text-primary' : 'text-black'}`}>{title}</p>
                </div>
              </a>
            </Link>
          </li>
        ))}
        {user?.role == "pengguna" && menuItems.map(({ href, title, icon, sub }, idx) => (
          <li className='m-2' key={title}>
            <Link href={href}>
              <a
                className={`text-white flex rounded-md ${isOpen ? "p-2" : "p-0 sm:p-2"} transition-all hover:bg-base-300 cursor-pointer `}
              >
                <div className={`flex w-full items-center gap-5 flex-row ${isOpen ? "" : "justify-center"}`}>

                  <p className={`transition-all ${isOpen ? "block" : "hidden"} md:block ${router.asPath === href || router.asPath.includes(sub[0]) ? 'text-primary' : 'text-black'}`}>
                    {icon}
                  </p>
                  <p data-aos="fade-left" className={`transition-all ${isOpen ? "block" : "hidden"} ${router.asPath === href || router.asPath.includes(sub[0]) ? 'text-primary' : 'text-black'}`}>{title}</p>
                </div>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>

  )
}

export default SidebarItems;