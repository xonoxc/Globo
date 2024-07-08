import { createSlice } from "@reduxjs/toolkit"
import { PostProps } from "../types"

interface PostState {
     status: boolean
     postData: PostProps | null
}

const getInitialState = (): PostState => {
     try {
          const localStoragePosts = localStorage.getItem("cachedPosts")
          if (localStoragePosts) {
               const parsedPosts = JSON.parse(localStoragePosts)
               return {
                    status: true,
                    postData: parsedPosts,
               }
          }
     } catch (error) {
          console.error("Error parsing cached posts from localStorage", error)
     }

     return {
          status: false,
          postData: null,
     }
}

const postSlice = createSlice({
     name: "posts",
     initialState: getInitialState(),
     reducers: {
          saveCache: (state: PostState, action) => {
               state.status = true
               state.postData = action.payload
               localStorage.setItem(
                    "cachedPosts",
                    JSON.stringify(action.payload)
               )
          },
          removeCache: (state: PostState) => {
               state.status = false
               state.postData = null
               localStorage.removeItem("cachedPosts")
          },
     },
})

export const { saveCache, removeCache } = postSlice.actions

export default postSlice.reducer
