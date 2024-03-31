import React from "react"
import { Container, Logo, LogoutBtn } from "./../index"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { getNavItems } from "./data/nav-items"
import { SquarePen } from "lucide-react"

const Header: React.FC = () => {
  const authStatus = useSelector((state: RootState) => state.auth.status)
  const navigate = useNavigate()
  const NavItems = getNavItems()

  return (
    <header className="py-3 shadow bg-white">
      <Container>
        <nav className="flex">
          <div className="mr-4">
            <Link to={"/"}>
              <Logo width={"100%"} />
            </Link>
          </div>
          <ul className="flex ml-auto">
            {NavItems.map((item, index) =>
              item.active ? (
                <li key={index}>
                  <button
                    onClick={() => navigate(item.dest)}
                    className={`${item.name === "Login" || item.name === "Signup" ? "bg-black text-white mx-1" : "bg-gray-100"} items-center  justify-center flex mx-1 px-6 py-2 duration-200 hover:bg-blue-100 rounded-full`}
                  >
                    {item.name}{" "}
                    {item.name === "Create" && <SquarePen height={16} />}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header
