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
		<div className="container ">
			<div className="container p-5 rounded-md border-2 border-double border-yellow-300">
				<h1 className="rounded-md text-5xl pb-3 font-semibold tracing-wide ">
					{post.title}
				</h1>
				<h2 className="text-lg justify-self-end">
					With kneads, {post.username}
				</h2>
			</div>
			<span className="mt-6">{post.createdAt}</span>
			<h3 className="text-justify">{post.content}</h3>
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
