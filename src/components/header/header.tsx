import { Container, Logo, LogoutBtn } from ".."
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { NavItems } from "./data/nav-items"

const Header: React.FC = () => {
	const authStatus = useSelector((state: RootState) => state.auth.status)
	const navigate = useNavigate()



	return (
		<header className="py-3 shadow bg-gray-500">
			<Container>
				<nav className="flex">
					<div className="mr-4">
						<Link to={"/"}>
							<Logo width="100%" />
						</Link>
					</div>
					<ul className="flex ml-auto">
						{
							NavItems.map((item, index) => (
								item.active ? (
									<li key={index}>
										<button
											onClick={() => navigate(item.dest)}
											className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
										>{item.name}</button>
									</li>
								) : null
							))
						}
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
