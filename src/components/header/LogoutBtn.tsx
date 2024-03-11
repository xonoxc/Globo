import { useDispatch } from "react-redux"
import { logout } from "../../store/authSlice"
import authService from "../../appwrite/auth"
import { AppDispatch } from "../../store/store"

const LogoutBtn: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>()

	const logoutHandler = () => {
		authService.logout()
			.then(() => {
				dispatch(logout())
			})
	}

	return (
		<button
			className="inline-block px-6 py-2 duration-200 hover:bg-gray-50 rounded-full"
			onClick={() => logoutHandler()}
		>Logout</button>
	)

}

export default LogoutBtn
