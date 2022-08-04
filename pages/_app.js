import "../styles/globals.css";
import "../configureAmplify";
import Navbar from "./components/navbar";

function MyApp({ Component, pageProps }) {
	return (
		<div>
			<Navbar />
			<div className="container mt-5 p-3 rounded-md border-2 border-double border-yellow-300">
				<Component {...pageProps} />
			</div>
		</div>
	);
}

export default MyApp;
