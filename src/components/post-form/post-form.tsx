import React, { useCallback } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { postService } from "../../services/conf"
import { Button, Select, Input, RTE } from ".."
import { useNavigate } from "react-router-dom"
import { PostProps, userData } from "../../types"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../store/store.ts"
import { removeCache } from "../../store/postSlice.ts"

interface PostFormProps {
     post?: PostProps
}

const PostForm: React.FC<PostFormProps> = ({ post }) => {
     const navigate = useNavigate()
     const dispatch = useDispatch<AppDispatch>()
     const [loading, setLoading] = React.useState<boolean>(false)

     const { register, handleSubmit, watch, setValue, control, getValues } =
          useForm<PostProps>({
               defaultValues: {
                    title: post?.title || "",
                    userId: post?.userId || "",
                    content: post?.content || "",
                    status: post?.status || "active",
               },
          })

     const userData = JSON.parse(
          localStorage.getItem("userData") as string
     ) as userData

     const submit: SubmitHandler<PostProps> = async (data) => {
          setLoading(true)
          try {
               if (post) {
                    const dbPost = await postService.updatePost(
                         {
                              title: data.title,
                              content: data.content,
                              status: data.status,
                              userId: userData.id,
                              image: data.image as FileList,
                         },
                         String(post.id)
                    )

                    if (dbPost) {
                         dispatch(removeCache())
                         navigate(`/post/${post.id}`)
                    }
               } else {
                    const dbPost = await postService.createPost({
                         title: data.title,
                         status: data.status,
                         content: data.content,
                         userId: userData.id,
                         slug: data.slug,
                         image: data.image,
                    })

                    if (dbPost) {
                         dispatch(removeCache())
                         navigate(`/post/${dbPost.id}`)
                    }
               }
          } catch (error) {
               console.error("error creating post:", error)
          } finally {
               setLoading(false)
          }
     }

     const slugTransform = useCallback((value: string) => {
          if (value && typeof value === "string")
               return value
                    .trim()
                    .toLowerCase()
                    .replace(/[^a-zA-Z\d\s]+/g, "-")
                    .replace(/\s/g, "-")
          return ""
     }, [])

     React.useEffect(() => {
          const subscription = watch((value, { name }) => {
               if (name === "title") {
                    setValue("slug", slugTransform(value.title!), {
                         shouldValidate: true,
                    })
               }
               return () => {
                    subscription.unsubscribe()
               }
          })
     }, [watch, slugTransform, setValue])

     if (loading) {
          return (
               <div className="wrapper flex items-center justify-center">
                    <h2>loading...</h2>
               </div>
          )
     }

     return (
          <form
               onSubmit={handleSubmit(submit)}
               className="flex sm:flex-row sm:flex-wrap flex-col sm:w-auto"
          >
               <div className="w-auto sm:w-2/3 px-2">
                    <Input
                         label="Title :"
                         className="mb-4"
                         placeholder="Your post title"
                         {...register("title", { required: true })}
                    />

                    <Input
                         label="Slug:"
                         placeholder="Slug"
                         className="mb-4"
                         {...register("slug", { required: true })}
                         onInput={(e) => {
                              setValue(
                                   "slug",
                                   slugTransform(e.currentTarget.value),
                                   {
                                        shouldValidate: true,
                                   }
                              )
                         }}
                    />

                    <RTE
                         label="content:"
                         name="content"
                         control={control}
                         defaultValue={getValues("content")}
                    />
               </div>
               <div className="w-auto sm:w-1/3 px-2">
                    <Input
                         label="Featured Image :"
                         type="file"
                         className="mb-4"
                         accept="image/png, image/jpg, image/jpeg, image/gif"
                         {...register("image", { required: !post })}
                    />
                    {post && (
                         <div className="w-full mb-4">
                              <img
                                   src={post.image as string}
                                   alt={post.title}
                                   className="rounded-lg"
                              />
                         </div>
                    )}
                    <Select
                         options={["active", "inactive"]}
                         label="Status"
                         className="mb-4 text-black"
                         {...register("status", { required: true })}
                    />
                    <Button
                         type="submit"
                         bgColor={post ? "bg-green-500" : undefined}
                         className="w-full"
                         textColor="white"
                    >
                         {post ? "Update" : "Submit"}
                    </Button>
               </div>
          </form>
     )
}

export default PostForm
