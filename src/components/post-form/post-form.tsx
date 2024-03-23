import React, { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Select, Input, RTE } from "..";
import appwriteService from "../../appwrite/conf";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Post, userData } from "../../types";

interface PostFormProps {
	post?: Post
}

const PostForm: React.FC<PostFormProps> = ({ post }) => {
	const navigate = useNavigate();
	const { register, handleSubmit, watch, setValue, control, getValues } =
		useForm<Post>({
			defaultValues: {
				title: post?.title || "",
				userid: post?.userid || "",
				content: post?.content || "",
				status: post?.status || "active",
			},
		});

	const userDataSelector = (state: RootState) => state.auth.userData

	const userData = useSelector((state: RootState) => {
		const user = userDataSelector(state)
		if (user != null) {
			return user as userData
		} else {
			throw new Error("[postFormError] :User data not found!")
		}
	})

	const submit: SubmitHandler<Post> = async (data) => {
		if (post) {
			const file = data.image[0]
				? await appwriteService.uploadFile(data.image[0] as File)
				: null;

			if (file) {
				appwriteService.deleteFile(post.image as string);
			}

			const dbPost = await appwriteService.updatePost(post.$id, {
				...data,
				image: file ? data.$id : undefined,
			});

			if (dbPost) {
				navigate(`/post/${post.$id}`);
			}
		} else {
			const file = data.image[0]
				? await appwriteService.uploadFile(data.image[0] as File)
				: null;

			if (file) {
				const fileId = data.$id;
				const dbPost = await appwriteService.createPost({
					...data,
					image: fileId,
					userid: userData.$id,
				});
				if (dbPost) {
					navigate(`/post/${dbPost.$id}`);
				}
			}
		}
	};

	// NOTE: this word slug is not be confused with something so execptional its just the post id

	const slugTransform = useCallback((value: string) => {
		if (value && typeof value === "string")
			return value
				.trim()
				.toLowerCase()
				.replace(/[^a-zA-Z\d\s]+/g, "-")
				.replace(/\s/g, "-");
		return "";
	}, []);

	React.useEffect(() => {
		const subscription = watch((value, { name }) => {
			if (name === "title") {
				setValue("userid", slugTransform(value.title!), {
					shouldValidate: true,
				});
			}
			return () => {
				subscription.unsubscribe();
			};
		});
	}, [watch, slugTransform, setValue]);

	return (
		<form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
			<div className="w-2/3 px-2">
				<Input
					label="Title :"
					className="mb-4"
					{...register("title", { required: true })}
				/>

				<Input
					label="Slug:"
					placeholder="Slug"
					className="mb-4"
					{...register("userid", { required: true })}
					onInput={(e) => {
						setValue("userid", slugTransform(e.currentTarget.value), {
							shouldValidate: true,
						});
					}}
				/>

				<RTE
					label="content:"
					name="content"
					control={control}
					defaultValue={getValues("content")}
				/>
			</div>
			<div className="w-1/3 px-2">
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
							src={appwriteService.getFilePreview(post.image as string).toString()}
							alt={post.title}
							className="rounded-lg"
						/>
					</div>
				)}
				<Select
					options={["active", "inactive"]}
					label="Status"
					className="mb-4"
					{...register("status", { required: true })}
				/>
				<Button
					type="submit"
					bgColor={post ? "bg-green-500" : undefined}
					className="w-full"
				>
					{post ? "Update" : "Submit"}
				</Button>
			</div>
		</form>
	);
};

export default PostForm;
