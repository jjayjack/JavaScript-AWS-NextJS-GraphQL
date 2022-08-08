import { Auth, API, Storage } from "aws-amplify";
import Link from "next/link";
import { useEffect, useState } from "react";
import { postsByUsername } from "../src/graphql/queries";
import { DateTime } from "luxon";
import { deletePost as deletePostMutation } from "../src/graphql/mutations";

export default function MyPosts() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		fetchPosts();
	}, []);

	async function fetchPosts() {
		const { username } = await Auth.currentAuthenticatedUser();

		const postData = await API.graphql({
			query: postsByUsername,
			variables: { username }
		});
		const { items } = postData.data.postsByUsername;

		const postsWithImages = await Promise.all(
			items.map(async (post) => {
				if (post.coverImage) {
					post.coverImage = await Storage.get(post.coverImage);
				}
				return post;
			})
		);
		setPosts(postsWithImages);
		// setPosts(postData.data.postsByUsername.items);
	}

	async function deletePost(id) {
		await API.graphql({
			query: deletePostMutation,
			variables: { input: { id } },
			authMode: "AMAZON_COGNITO_USER_POOLS"
		});

		fetchPosts();
	}

	return (
		<div className="container lowercase rounded border-2 border-quaternary m-10 p-5 bg-quaternary">
			<h1 className="rounded pb-3 text-tertiary text-5xl font-semibold tracking-wide">
				My Posts
			</h1>
			<ul className="flex flex-wrap md:flex-row container rounded bg-tertiary mt-5 p-3 text-primary text-center justify-around">
				{posts.map((post, index) => (
					<li
						key={index}
						className="flex-row container rounded-lg pl-2 text-justify p-2 m-3"
					>
						{post.coverImage && (
							<div className="flex">
								<div className="flex flex-col basis-1/3 p-5">
									<img
										src={post.coverImage}
										alt={post.title}
										width={100}
										height={100}
										className="ring rounded ring-white flex-1"
									/>
								</div>
								<div className="flex flex-col basis-1/3 ">
									<h2 className="text-xl font-bold flex-1">{post.title}</h2>
									<p className="m-2 flex flex-row">
										created:{" "}
										{DateTime.fromISO(post.createdAt).toFormat(
											"dd LLL yyyy @ HH:mm ZZZZ"
										)}
									</p>
								</div>
								<div className="container space-x-3 flex-col">
									<button className="rounded bg-tertiary cursor-pointer p-2 border-2 border-secondary hover:bg-secondary hover:text-tertiary hover:font-bold">
										<Link href={`/edit-post/${post.id}`}>edit</Link>
									</button>
									<button className="rounded bg-tertiary cursor-pointer p-2 border-2 border-secondary hover:bg-secondary hover:text-tertiary hover:font-bold">
										<Link href={`/posts/${post.id}`}>view</Link>
									</button>
									<button
										className="rounded bg-tertiary cursor-pointer p-2 border-2 border-danger hover:bg-danger hover:text-tertiary hover:font-bold"
										onClick={() => deletePost(post.id)}
									>
										delete
									</button>
								</div>
							</div>
						)}
						<div className="flex flex-col basis-3/4 ">
							<h2 className="text-xl font-bold flex-1">{post.title}</h2>
							<p className="m-2 flex flex-row">
								created:{" "}
								{DateTime.fromISO(post.createdAt).toFormat(
									"dd LLL yyyy @ HH:mm ZZZZ"
								)}
							</p>
						</div>
						<div className="container space-x-3 flex-col ">
							<button className="rounded basis-1/3 bg-tertiary cursor-pointer p-2 border-2 border-secondary hover:bg-secondary hover:text-tertiary hover:font-bold">
								<Link href={`/edit-post/${post.id}`}>edit</Link>
							</button>
							<button className="rounded basis-1/3 bg-tertiary cursor-pointer p-2 border-2 border-secondary hover:bg-secondary hover:text-tertiary hover:font-bold">
								<Link href={`/posts/${post.id}`}>view</Link>
							</button>
							<button
								className="rounded basis-1/3 bg-tertiary cursor-pointer p-2 border-2 border-danger hover:bg-danger hover:text-tertiary hover:font-bold"
								onClick={() => deletePost(post.id)}
							>
								delete
							</button>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
