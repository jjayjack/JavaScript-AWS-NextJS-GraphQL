import { useState, useRef, useEffect } from "react";
import { API, Auth } from "aws-amplify";
import { useRouter } from "next/router";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
	ssr: false
});
import { updatePost } from "../src/graphql/mutations";
import { getPost } from "../../src/graphql/queries";
import { v4 as uuid } from "uuid";

function EditPost() {
	const [post, setPost] = useState(null);
	const router = useRouter();
	const { id } = router.query;

	useEffect(() => {
		fetchPost();

		async function fetchPost() {
			if (!id) return;

			const postData = await API.graphql({
				query: getPost,
				variables: { id }
			});
			setPost(postData.data.getPost);
		}
	}, [id]);

	return <div></div>;
}

export default EditPost;
