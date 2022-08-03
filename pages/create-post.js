import { withAuthenticator } from "@aws-amplify/ui-react";
import { useState, useRef, React } from "react";
import { API } from "aws-amplify";

const initialState = { title: "", content: "" };

function CreatePost() {
	const [post, setPost] = useState(initialState);
	const { title, content } = post;
	const router = useRouter();

	function onChange(event) {
		setPost(() => ({
			...post,
			[event.target.name]: event.target.value
		}));
	}
}

export default CreatePost;
