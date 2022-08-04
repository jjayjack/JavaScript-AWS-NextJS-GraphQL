import "../styles/globals.css";
import "../configureAmplify";
import Navbar from "./components/navbar";

function MyApp({ Component, pageProps }) {
	return (
		<div>
			<Navbar />
			<div className="py-5 px-10 bg-slate-100 container">
				<Component {...pageProps} />
			</div>
		</div>
	);
}

export default MyApp;
