import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";

export default function MyPosts() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		fetchPosts();
	}, []);

	async function fetchPosts() {
		const { username } = await Auth.currentAuthenticatedUser();
	}
}
