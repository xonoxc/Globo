import { createSlice } from "@reduxjs/toolkit"
import { PostProps } from "../types"

interface PostState {
     status: boolean
     postData: PostProps | null
}

const initialState = {
     status: false,
     postData: null,
}

const postSlice = createSlice({
     name: "posts",
     initialState,
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

const localStoragePosts = localStorage.getItem("cachedPosts")
if (localStoragePosts) {
     const parsedLocalStoragePosts: PostState = JSON.parse(localStoragePosts)
     initialState.status = parsedLocalStoragePosts.status
     initialState.postData = parsedLocalStoragePosts.postData
}

export const { saveCache, removeCache } = postSlice.actions

export default postSlice.reducer
