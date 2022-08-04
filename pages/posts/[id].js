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
		<div>
			<h1 className="text-5xl mt-4 font-semibold tracing-wide">{post.title}</h1>
		</div>
	);
}
