import { API } from "aws-amplify";
import { useRouter } from "next/router";
import ReactMarkDown from "react-markdown";
import "../../configureAmplify";
import { listPosts, getPost } from "../../src/graphql/queries";

export default function Post({ post }) {
	const router = useRouter();
	if (router.isFallback) {
		return <div>Loading..</div>;
	}

	return (
		<div className="container lowercase rounded border-2 border-quaternary">
			<div className="container p-5 pb-2 bg-quaternary">
				<h1 className="rounded pb-3 text-tertiary text-5xl font-semibold tracking-wide">
					{post.title}
				</h1>
				<h2 className="text-lg text-primary font-light">
					With kneads, {post.username}
				</h2>
			</div>
			<div className="container mt-5 p-3 text-primary">
				<p className="text-center text-lg">{post.content}</p>
				<h3 className="pt-3 text-sm">{post.createdAt} </h3>
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
