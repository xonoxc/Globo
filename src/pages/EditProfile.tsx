import { useNavigate, useParams } from "react-router-dom"
import { useCallback } from "react"
import { useForm } from "react-hook-form"
import DefaultCoverImage from "/cover_image.png"
import ProfileFallback from "/def_pfp.jpg"
import { Button } from "../components"
import { useProfile } from "../hooks/useProfile"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import Fallback from "../pages/Fallback"
import { UpdateUserProps } from "../types/user"
import { authService } from "../services/auth"

export default function ProfileEdit() {
     const { userId } = useParams<{ userId: string }>()
     const navigate = useNavigate()
     const { profile, loading, setLoading, fetchUserProfile } = useProfile(
          userId as string
     )
     const { register, handleSubmit, setValue, watch } = useForm<
          Partial<UpdateUserProps>
     >({
          defaultValues: {
               name: profile?.name || "",
               email: profile?.email || "",
               bio: profile?.preferences.bio || "",
               coverImage: undefined,
               profile: undefined,
          },
     })

     const handleFileChange = useCallback(
          (e: React.ChangeEvent<HTMLInputElement>) => {
               const name = e.target.name as keyof UpdateUserProps
               const file = e.target.files?.[0]
               setValue(name, file)
          },
          [setValue]
     )

     const onSubmit = useCallback(
          async (data: Partial<UpdateUserProps>) => {
               try {
                    setLoading(true)
                    const response = await authService.editUserProfile({
                         ...data,
                         name: data.name as string,
                         email: data.email as string,
                         bio: data.bio as string,
                         profile: data.profile as File,
                         coverImage: data.coverImage as File,
                    })

                    if (Array.isArray(response) && response.length === 2) {
                         await fetchUserProfile(userId as string)
                         navigate(`/u/profile/${profile?.id}`)
                    }
               } catch (error) {
                    console.error(`Error while updating profile:`, error)
               } finally {
                    setLoading(false)
               }
          },
          [navigate, profile?.id, setLoading]
     )

     if (!userId) return <Fallback />

     return (
          <form
               onSubmit={handleSubmit(onSubmit)}
               className="max-w-4xl mx-auto p-6"
          >
               <h1 className="text-2xl font-bold text-gray-800 mb-6">
                    Edit Profile
               </h1>

               <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                         Cover Image
                    </label>
                    {loading ? (
                         <Skeleton className="w-full h-[150px] rounded-lg" />
                    ) : (
                         <>
                              <input
                                   type="file"
                                   accept="image/*"
                                   {...register("coverImage")}
                                   onChange={handleFileChange}
                                   className="mt-1 block w-full text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-gray-200 file:text-gray-700 hover:file:bg-gray-300"
                              />
                              <img
                                   src={
                                        watch("coverImage")
                                             ? URL.createObjectURL(
                                                    watch("coverImage") as Blob
                                               )
                                             : profile?.coverImage ||
                                               DefaultCoverImage
                                   }
                                   alt="Cover"
                                   className="w-full h-[150px] object-cover mt-2 rounded-lg border border-gray-300"
                              />
                         </>
                    )}
               </div>

               <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                         Avatar
                    </label>
                    {loading ? (
                         <Skeleton className="w-20 h-20 rounded-full" />
                    ) : (
                         <>
                              <input
                                   type="file"
                                   accept="image/*"
                                   {...register("profile")}
                                   onChange={handleFileChange}
                                   className="mt-1 block w-full text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-gray-200 file:text-gray-700 hover:file:bg-gray-300"
                              />
                              <img
                                   src={
                                        watch("profile")
                                             ? URL.createObjectURL(
                                                    watch("profile") as Blob
                                               )
                                             : profile?.avatar ||
                                               ProfileFallback
                                   }
                                   alt="Avatar"
                                   className="w-20 h-20 rounded-full mt-2 object-cover border border-gray-300"
                              />
                         </>
                    )}
               </div>

               <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                         Name
                    </label>
                    {loading ? (
                         <Skeleton className="w-full h-8 rounded-lg" />
                    ) : (
                         <input
                              type="text"
                              {...register("name")}
                              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-900"
                         />
                    )}
               </div>

               <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                         Email
                    </label>
                    {loading ? (
                         <Skeleton className="w-full h-8 rounded-lg" />
                    ) : (
                         <input
                              type="email"
                              {...register("email")}
                              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-900"
                         />
                    )}
               </div>

               <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                         Bio
                    </label>
                    {loading ? (
                         <Skeleton className="w-full h-20 rounded-lg" />
                    ) : (
                         <textarea
                              {...register("bio")}
                              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-900"
                         />
                    )}
               </div>

               <div className="flex justify-end gap-4">
                    <Button
                         textColor="white"
                         onClick={() => navigate(`/u/profile/${profile?.id}`)}
                    >
                         Cancel
                    </Button>
                    <Button textColor="white" type="submit">
                         Save
                    </Button>
               </div>
          </form>
     )
}
