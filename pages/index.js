import { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { listPosts } from "../src/graphql/queries";

export default function Home() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		fetchPosts();
	}, []);

	async function fetchPosts() {
		const postData = await API.graphql({
			query: listPosts
		});
		setPosts(postData.data.listPosts.items);
	}

	return (
		<div>
			<h1 className="rounded-md text-5xl pb-3 font-bold tracing-wide text-primary">
				My Posts
			</h1>
			<ul className="container cursor-pointer">
				{posts.map((post, index) => (
					<li
						className="lowercase rounded-lg pl-2 text-justify text-primary  hover:indent-4 hover:text-tertiary hover:bg-quaternary"
						key={index}
					>
						<h2 className="text-xl font-bold">{post.title}</h2>
						<p>Written by: {post.username}</p>
					</li>
				))}
			</ul>
		</div>
	);
}
