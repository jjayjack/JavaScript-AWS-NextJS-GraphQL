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
			<div className="container">
				{posts.map((post, index) => (
					<p
						className="lowercase rounded-lg pl-2 text-justify text-xl text-primary font-bold hover:indent-4 hover:text-tertiary hover:bg-quaternary"
						key={index}
					>
						{post.title}
					</p>
				))}
			</div>
		</div>
	);
}
