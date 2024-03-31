import store from "../../../store/store"

const getNavItems = () => {
  const authStatus = store.getState().auth.status
  return [
    {
      name: "Create",
      dest: "/add-post",
      active: authStatus,
    },
    {
      name: "Home",
      dest: "/",
      active: true,
    },
    {
      name: "pricing",
      dest: "/pricing",
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
      name: "Posts",
      dest: "/all-posts",
      active: authStatus,
    },
  ]
}

export { getNavItems }
