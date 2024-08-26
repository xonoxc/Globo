import { UpdateUserProps } from "../types/user"
import { useCallback, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../store/store.ts"
import { useProfile } from "../hooks/useProfile"
import { removeCache } from "../store/postSlice.ts"
import { useNavigate } from "react-router-dom"
import Skeleton from "react-loading-skeleton"
import DefaultCoverImage from "/cover_image.png"
import ProfileFallback from "/def_pfp.jpg"
import { Button } from "../components"
import { authService } from "../services/auth"

interface ProfileFormProps {
     userId: string
}

const ProfileForm = ({ userId }: ProfileFormProps) => {
     const navigate = useNavigate()
     const dispatch = useDispatch<AppDispatch>()
     const [error, setError] = useState<string>("")
     const { profile, loading, setLoading, fetchUserProfile } =
          useProfile(userId)
     const { register, handleSubmit, setValue } = useForm<
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

     const [coverImagePreview, setCoverImagePreview] = useState<string>(
          profile?.coverImage || DefaultCoverImage
     )
     const [avatarPreview, setAvatarPreview] = useState<string>(
          profile?.avatar || ProfileFallback
     )
     const [coverImageFile, setCoverImageFile] = useState<File | null>(null)
     const [profileFile, setProfileFile] = useState<File | null>(null)

     const handleFileChange = useCallback(
          (e: React.ChangeEvent<HTMLInputElement>) => {
               setError("")
               const { name, files } = e.target
               const file = files?.[0]

               if (file) {
                    const previewUrl = URL.createObjectURL(file)

                    if (name === "coverImage") {
                         setCoverImageFile(file)
                         setCoverImagePreview(previewUrl)
                         setValue(name as keyof UpdateUserProps, file)
                    } else if (name === "profile") {
                         setProfileFile(file)
                         setAvatarPreview(previewUrl)
                         setValue(name as keyof UpdateUserProps, file)
                    }
               }
          },
          [setValue]
     )

     const onSubmit = useCallback(
          async (data: Partial<UpdateUserProps>) => {
               if (
                    coverImageFile &&
                    profileFile &&
                    coverImageFile.name === profileFile.name
               ) {
                    setError("Profile and cover image cannot be the same.")
                    return
               }
               try {
                    setLoading(true)
                    const response = await authService.editUserProfile({
                         ...data,
                         name: data.name as string,
                         email: data.email as string,
                         bio: data.bio as string,
                         profile: profileFile as File,
                         coverImage: coverImageFile as File,
                    })

                    if (Array.isArray(response) && response.length === 2) {
                         await fetchUserProfile(userId)
                         dispatch(removeCache())
                         navigate(`/u/profile/${profile?.id}`)
                    }
               } catch (error) {
                    console.error(`Error while updating profile:`, error)
               } finally {
                    setLoading(false)
               }
          },
          [
			   dispatch,
               navigate,
               profile?.id,
               setLoading,
               profileFile,
               coverImageFile,
               fetchUserProfile,
               userId,
          ]
     )

     return (
          <form
               onSubmit={handleSubmit(onSubmit)}
               className="max-w-4xl mx-auto p-6"
          >
               <h1 className="text-2xl font-bold text-gray-800 mb-6">
                    Edit Profile
               </h1>
               {error && <span className="text-red-400 py-4">{error}</span>}

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
                                   src={coverImagePreview}
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
                                   src={avatarPreview}
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
                    <Button
                         textColor="white"
                         type="submit"
                         disabled={error ? true : false}
                    >
                         Save
                    </Button>
               </div>
          </form>
     )
}

export default ProfileForm
