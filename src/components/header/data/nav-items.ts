import store from "../../../store/store"

const getNavItems = () => {
  const authStatus = store.getState().auth.status
  return [
    {
      name: "Home",
      dest: "/",
      active: true,
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
}

export { getNavItems }
