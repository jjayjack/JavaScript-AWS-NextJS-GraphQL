import { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { listPosts } from "../src/graphql/queries";
import Link from "next/link";
import Image from "next/image";

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
		<div className="container lowercase rounded border-2 border-quaternary m-10">
			<div className="container p-5 bg-quaternary">
				<h1 className="rounded pb-3 text-tertiary text-5xl font-semibold tracking-wide">
					Posts
				</h1>
				<ul className="container bg-tertiary rounded mt-5 p-3 text-primary">
					{posts.map((post, index) => (
						<Link key={index} href={`/posts/${post.id}`}>
							<div>
								{post.coverImage && (
									<img
										src={post.coverImage}
										alt={post.title}
										width={300}
										height={300}
									/>
								)}
								<li
									className="rounded-lg pl-2 text-justify text-primary hover:indent-4 hover:text-tertiary hover:bg-quaternary"
									key={index}
								>
									<h2 className="text-xl font-bold">{post.title}</h2>
									<p>Written by: {post.username}</p>
								</li>
							</div>
						</Link>
					))}
				</ul>
			</div>
		</div>
	);
}
