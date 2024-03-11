import store from "../../../store/store"

const authStatus = store.getState().auth.status

export const NavItems = [
	{
		name: "Home",
		dest: "/",
		active: true
	},
	{
		name: "Login",
		dest: "/login",
		active: !authStatus,
	},
	{
		name: "Signup",
		dest: "/signup",
		active: !authStatus,
	},
	{
		name: "All Posts",
		dest: "/all-posts",
		active: authStatus,
	},
	{
		name: "Add Post",
		dest: "/add-post",
		active: authStatus,
	},
]

