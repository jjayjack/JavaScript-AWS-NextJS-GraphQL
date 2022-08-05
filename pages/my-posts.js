import { Auth, API } from "aws-amplify";
import Link from "next/link";
import { useEffect, useState } from "react";
import { postsByUsername } from "../src/graphql/queries";
import { DateTime } from "luxon";

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
		<div className="container lowercase rounded border-2 border-quaternary m-10 p-5 bg-quaternary">
			<h1 className="rounded pb-3 text-tertiary text-5xl font-semibold tracking-wide">
				My Posts
			</h1>
			<ul className="flex flex-wrap container rounded bg-tertiary mt-5 p-3 text-primary text-center">
				{posts.map((post, index) => (
					<li key={index} className="rounded-lg pl-2 text-justify p-2 m-3">
						<h2 className="text-xl font-bold">{post.title}</h2>
						<p className="m-2">
							created:{" "}
							{DateTime.fromISO(post.createdAt).toFormat(
								"dd LLL yyyy @ HH:mm ZZZZ"
							)}
						</p>
						<div className="flex container space-x-3 flex-auto">
							<button className="rounded flex-auto bg-tertiary cursor-pointer p-2 border-2 border-secondary hover:bg-secondary hover:text-tertiary hover:font-bold">
								<Link key={index} href={`/edit-post/${post.id}`}>
									edit
								</Link>
							</button>
							<button className="rounded flex-auto bg-tertiary cursor-pointer p-2 border-2 border-secondary hover:bg-secondary hover:text-tertiary hover:font-bold">
								<Link key={index} href={`/posts/${post.id}`}>
									view
								</Link>
							</button>
							<button className="rounded flex-auto bg-tertiary cursor-pointer p-2 border-2 border-danger hover:bg-danger hover:text-tertiary hover:font-bold">
								delete
							</button>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
