import { Link } from "react-router-dom"
import Header from "../Components/Header"

const Home = () => {
    return (
        <>
            <Header />
            <main className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-4xl font-bold mb-4">
                    Welcome to the Pontus Art Collection
                </h1>
                <p className="text-gray-600 mb-8">
                    Discover and collect stunning artworks from multiple museums
                    around the world.
                </p>
                <Link
                    to="/explore"
                    className="inline-block px-6 py-3 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
                >
                    Start Exploring
                </Link>
            </main>
        </>
    )
}

export default Home
