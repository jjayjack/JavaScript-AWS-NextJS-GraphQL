import "../styles/globals.css";
import "../configureAmplify";
import Navbar from "./components/navbar";

function MyApp({ Component, pageProps }) {
	return (
		<div className="bg-tertiary">
			<Navbar />
			<div className="container p-5 flex">
				<Component {...pageProps} />
			</div>
		</div>
	);
}

export default MyApp;
