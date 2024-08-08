import React, { useState } from "react"
import { Avatar, Container, Logo, LogoutBtn } from "./../index"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import defaultProfile from "../../../public/def_pfp.jpg"
import { RootState } from "../../store/store"
import { getNavItems } from "./data/nav-items"
import { SquarePen, Menu, X } from "lucide-react"

const Header: React.FC = () => {
     const [menuOpen, setMenuOpen] = useState(false)
     const auth = useSelector((state: RootState) => state.auth)
     const location = useLocation()
     const navigate = useNavigate()
     const NavItems = getNavItems()

     const toggleMenu = () => setMenuOpen(!menuOpen)
     const closeMenu = () => setMenuOpen(false)

     React.useEffect((): void => {
          setMenuOpen(false)
     }, [navigate])

     return (
          <div>
               <header className="py-3 shadow bg-white">
                    <Container>
                         <nav className="flex items-center justify-between relative z-10">
                              <div className="mr-4">
                                   <Link to={"/"}>
                                        <Logo width={"100%"} />
                                   </Link>
                              </div>
                              <div className="lg:hidden">
                                   <button
                                        onClick={toggleMenu}
                                        className="focus:outline-none"
                                        aria-label="Toggle menu"
                                   >
                                        {menuOpen ? (
                                             <X size={24} />
                                        ) : (
                                             <Menu size={24} />
                                        )}
                                   </button>
                              </div>
                              <ul
                                   className={`${
                                        menuOpen ? "block" : "hidden"
                                   } lg:flex flex-col lg:flex-row items-center lg:ml-auto fixed lg:static inset-x-0 top-0 mt-16 lg:mt-0 bg-white lg:bg-transparent p-4 lg:p-0 shadow-md lg:shadow-none z-10 transition-transform transform lg:translate-y-0 space-y-4 lg:space-y-0 lg:gap-2`}
                              >
                                   {NavItems.map((item, index) =>
                                        item.active ? (
                                             <li
                                                  key={index}
                                                  className="w-full lg:w-auto"
                                             >
                                                  <button
                                                       onClick={() => {
                                                            navigate(item.dest)
                                                            closeMenu()
                                                       }}
                                                       className={`${
                                                            item.name ===
                                                                 "Login" ||
                                                            item.name ===
                                                                 "Signup"
                                                                 ? "bg-black text-white"
                                                                 : "bg-gray-100 text-gray-700"
                                                       } w-full lg:w-auto items-center justify-center flex px-6 py-2 duration-200 hover:bg-blue-100 rounded-full`}
                                                  >
                                                       {item.name}{" "}
                                                       {item.name ===
                                                            "Create" && (
                                                            <SquarePen
                                                                 height={16}
                                                            />
                                                       )}
                                                  </button>
                                             </li>
                                        ) : null
                                   )}
                                   {auth.status && (
                                        <div className="flex items-center justify-center space-x-4">
                                             <div className="w-full lg:w-auto flex gap-2 justify-between">
                                                  {location.pathname !==
                                                       "/u/profile/c" && (
                                                       <Link
                                                            onClick={() =>
                                                                 setMenuOpen(
                                                                      false
                                                                 )
                                                            }
                                                            to={`/u/profile/${auth.userData?.id}`}
                                                       >
                                                            <Avatar
                                                                 imageUrl={
                                                                      auth
                                                                           .userData
                                                                           ?.avatar
                                                                           ? auth
                                                                                  .userData
                                                                                  .avatar
                                                                           : defaultProfile
                                                                 }
                                                            />
                                                       </Link>
                                                  )}
                                                  <LogoutBtn />
                                             </div>
                                        </div>
                                   )}
                              </ul>
                         </nav>
                    </Container>
               </header>
          </div>
     )
}

export default Header
