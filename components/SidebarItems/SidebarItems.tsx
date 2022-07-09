import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
  isOpen: boolean
}

const SidebarItems: NextPage<Props> = ({ isOpen }) => {
  const router = useRouter()
  const menuItemsAdmin = [
    {
      href: '/dashboard',
      title: 'Dashboard',
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>,
      sub: []
    },
    {
      href: '/dashboard/divisi',
      title: 'Divisi',
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>,
      sub: []
    },
  ];
  return (
    <nav>
      <ul>
        {menuItemsAdmin.map(({ href, title, icon, sub }, idx) => (
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