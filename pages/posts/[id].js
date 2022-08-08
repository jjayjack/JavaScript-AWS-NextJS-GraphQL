import { API, Storage, Auth, Hub } from "aws-amplify";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import ReactMarkDown from "react-markdown";
import "../../configureAmplify";
import { listPosts, getPost } from "../../src/graphql/queries";
import { createComment } from "../../src/graphql/mutations";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
	ssr: false
});

const initialState = { message: "" };

export default function Post({ post }) {
	const [coverImage, setCoverImage] = useState(null);
	const [comment, setComment] = useState(initialState);
	const [showMe, setShowMe] = useState(false);
	const router = useRouter();
	const { message } = comment;

	function toggle() {
		setShowMe(!showMe);
	}

	useEffect(() => {
		updateCoverImage();
	});

	async function updateCoverImage() {
		if (post.coverImage) {
			const imageKey = await Storage.get(post.coverImage);
			setCoverImage(imageKey);
		}
	}

	if (router.isFallback) {
		return <div>Loading..</div>;
	}

	async function createNewComment() {
		if (!message) return;
		const id = uuid();
		comment.id = id;
		try {
			await API.graphql({
				query: createComment,
				variables: { input: comment },
				authMode: "AMAZON_COGNITO_USER_POOLS"
			});
		} catch (error) {
			console.log(error);
		}

		router.push("/my-posts");
	}

	return (
		<div className="container lowercase rounded border-2 border-quaternary">
			{coverImage && (
				<div className="container p-5 pb-2 object-scale-down">
					<img src={coverImage} className="mt-4" />
				</div>
			)}
			<div className="container p-5 pb-2 bg-quaternary">
				<h1 className="rounded pb-3 text-tertiary text-5xl font-semibold tracking-wide">
					{post.title}
				</h1>
				<h2 className="text-lg text-primary font-light">
					With kneads, {post.username}
				</h2>
			</div>
			<div className="container mt-5 p-3 text-primary text-center text-lg">
				<ReactMarkDown>{post.content}</ReactMarkDown>
				<h3 className="pt-3 text-sm">{post.createdAt} </h3>
			</div>
			<div>
				<button
					type="button"
					className="rounded flex-auto bg-tertiary cursor-pointer p-2 border-2 border-secondary hover:bg-secondary hover:text-tertiary hover:font-bold"
					onClick={toggle}
				>
					write a comment
				</button>
				{
					<div style={{ display: showMe ? "block" : "none" }}>
						<SimpleMDE
							value={comment.message}
							onChange={(value) => {
								setComment({ ...comment, message: value, postID: post.id });
							}}
						/>
						<button
							onClick={createNewComment}
							type="button"
							className="rounded flex-auto bg-tertiary cursor-pointer p-2 border-2 border-secondary hover:bg-secondary hover:text-tertiary hover:font-bold"
						>
							save
						</button>
					</div>
				}
			</div>
		</div>
	);
}
export async function getStaticPaths() {
	const postData = await API.graphql({
		query: listPosts
	});
	const paths = postData.data.listPosts.items.map((post) => ({
		params: {
			id: post.id
		}
	}));
	return {
		paths,
		fallback: true
	};
}

export async function getStaticProps({ params }) {
	const { id } = params;
	const postData = await API.graphql({
		query: getPost,
		variables: { id }
	});
	return {
		props: {
			post: postData.data.getPost
		},
		revalidate: 1
	};
}
