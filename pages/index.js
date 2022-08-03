import { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { listPosts } from "../src/graphql/queries";

export default function Home() {
	const [posts, setPosts] = useState([]);

	async function fetchPosts() {
		const postData = await API.graphql({
			query: listPosts
		});
		setPosts(postData.data.listPosts.items);
	}

	return (
		<h1 className="text-3xl font-bold bg-stone-500 underline text-teal-100 decoration-teal-100">
			Hello world!
		</h1>
	);
}
