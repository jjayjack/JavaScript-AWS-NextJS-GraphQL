import { Auth, API } from "aws-amplify";
import Link from "next/link";
import { useEffect, useState } from "react";
import { postsByUsername } from "../src/graphql/queries";

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
		setPosts(postData.data.postsByUsername.items);
	}
	return (
		<div className="container">
			<h1 className="rounded pb-3 text-quaternary text-5xl font-semibold tracking-wide">
				My Posts
			</h1>
			<ul className="container cursor-pointer lowercase text-primary">
				{posts.map((post, index) => (
					<Link key={index} href={`/posts/${post.id}`}>
						<li className="rounded-lg pl-2 text-justify hover:indent-4 hover:text-tertiary hover:bg-quaternary">
							<h2 className="text-xl font-bold">{post.title}</h2>
							<p className="mt-2">written by: {post.username}</p>
						</li>
					</Link>
				))}
			</ul>
		</div>
	);
}
