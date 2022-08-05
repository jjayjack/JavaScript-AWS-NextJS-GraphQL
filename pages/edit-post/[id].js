import { useState, useRef, React } from "react";
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
