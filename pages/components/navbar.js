import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Auth, Hub } from "aws-amplify";

import "../../configureAmplify";

const Navbar = () => {
	const [signedUser, setSignedUser] = useState(false);
	useEffect(() => {
		authListener();
	}, []);

	async function authListener() {
		Hub.listen("auth", (data) => {
			switch (data.payload.event) {
				case "signIn":
					return setSignedUser(true);
				case "signOut":
					return setSignedUser(false);
			}
		});
		try {
			await Auth.currentAuthenticatedUser();
			setSignedUser(true);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<nav className="flex justify-center bg-secondary p-3 space-x-4">
			{[
				["Home", "/"],
				["Create Post", "/create-post"],
				["Profile", "/profile"]
			].map(([title, url], index) => (
				<Link key={index} href={url}>
					<a className="rounded-lg px-3 py-2 text-primary font-medium hover:bg-hover hover:text-tertiary">
						{title}
					</a>
				</Link>
			))}
			{signedUser && (
				<Link href="/my-posts">
					<a className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate hover:text-slate-900">
						My Posts
					</a>
				</Link>
			)}
		</nav>
	);
};

export default Navbar;
