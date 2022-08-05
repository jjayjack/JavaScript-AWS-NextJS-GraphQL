import { withAuthenticator } from "@aws-amplify/ui-react";
import { useState, useRef, React } from "react";
import { API, Auth } from "aws-amplify";
import { useRouter } from "next/router";
import { v4 as uuid } from "uuid";
import { createPost } from "../src/graphql/mutations";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
	ssr: false
});

const initialState = { title: "", content: "" };

function CreatePost() {
	const [post, setPost] = useState(initialState);
	const { title, content } = post;
	const router = useRouter();
	const [image, setImage] = useState(null);

	function onChange(event) {
		setPost(() => ({
			...post,
			[event.target.name]: event.target.value
		}));
	}

	async function createNewPost() {
		if (!title || !content) return;

		const id = uuid();
		post.id = id;

		const { username } = await Auth.currentAuthenticatedUser();
		post.username = username;

		await API.graphql({
			query: createPost,
			variables: { input: post },
			authMode: "AMAZON_COGNITO_USER_POOLS"
		});

		router.push(`/posts/${id}`);
	}
	return (
		<div className="container lowercase rounded border-2 border-quaternary bg-quaternary m-10 p-5">
			<h1 className="rounded  text-3xl font-semibold tracking-wide text-tertiary mt-2">
				Create New Post
			</h1>
			<input
				onChange={onChange}
				name="title"
				placeholder="Title"
				value={post.title}
				className="rounded border-b pb-2 text-lg my-4 focus:outline-none w-full bg-tertiary font-light text-primary placeholder-primary y-2"
			/>
			<SimpleMDE
				className="border-2 border-tertiary bg-tertiary rounded font-primary mb-3"
				value={post.content}
				onChange={(value) => setPost({ ...post, content: value })}
			/>
			<div className="flex flex-col">
				<button
					type="button"
					className="rounded flex-auto mb-4 bg-tertiary cursor-pointer p-2 border-2 border-secondary hover:bg-secondary hover:text-tertiary hover:font-bold"
				>
					add image
				</button>
				<button
					type="button"
					className="rounded flex-auto bg-tertiary cursor-pointer p-2 border-2 border-secondary hover:bg-secondary hover:text-tertiary hover:font-bold"
					onClick={createNewPost}
				>
					create post
				</button>
			</div>
		</div>
	);
}

export default withAuthenticator(CreatePost);
