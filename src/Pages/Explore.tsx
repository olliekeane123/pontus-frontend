import { useEffect, useState } from "react"
import Header from "../Components/Header"
import { getAllArtworks } from "../api/getArtworks"
import SearchFilterBar from "../Components/SearchFilterBar"
import ArtworkCard from "../Components/ArtworkCard"
import ArtworkModal from "../Components/ArtworkModal"
import LoadingSkeleton from "../Components/LoadingSkeleton"
import PaginationControls from "../Components/PaginationControls"
import { useCollection } from "../utils/collectionUtils"

const Explore = () => {
    const [artworks, setArtworks] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalArtworks, setTotalArtworks] = useState(0)
    const [error, setError] = useState<string | null>(null)

    const [searchTerm, setSearchTerm] = useState("")
    const [source, setSource] = useState("aic") // Default source remains 'aic'

    const [selectedArtwork, setSelectedArtwork] = useState(null)
    const [showModal, setShowModal] = useState(false)

    const { addToCollection, removeFromCollection, isInCollection } =
        useCollection()

    const loadPage = async (
        page: number,
        currentSearchTerm: string,
        currentSource: string
    ) => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await getAllArtworks(
                currentSource,
                page,
                currentSearchTerm
            )

            let artworksData = []
            let totalArtworksData = 0

            if (Array.isArray(response)) {
                artworksData = response
            } else if (response?.artworks && Array.isArray(response.artworks)) {
                artworksData = response.artworks
                totalArtworksData = response.totalArtworks || 0
            } else if (response?.data && Array.isArray(response.data)) {
                artworksData = response.data
                totalArtworksData =
                    response.totalArtworks || response.total || 0
            }

            setArtworks(artworksData)
            setTotalArtworks(totalArtworksData)
        } catch (error) {
            console.error("Error loading artworks:", error)
            setError("Failed to load artworks. Please try again.")
            setArtworks([])
            setTotalArtworks(0)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        loadPage(1, searchTerm, source)
    }, [])

    const handleSearch = () => {
        setCurrentPage(1)
        loadPage(1, searchTerm, source)
    }

    const handleSourceChange = (newSource: string) => {
        setSource(newSource)
        setCurrentPage(1)
        setSearchTerm("")
        loadPage(1, "", newSource)
    }

    const handleAddToCollection = (artwork: any, e: React.MouseEvent) => {
        e.stopPropagation()
        addToCollection(artwork)
    }

    const handleRemoveFromCollection = (artwork: any, e: React.MouseEvent) => {
        e.stopPropagation()
        removeFromCollection(artwork.id, artwork.source)
    }

    const openModal = (artwork: any) => {
        setSelectedArtwork(artwork)
        setShowModal(true)
        document.body.style.overflow = "hidden"
    }

    const closeModal = () => {
        setSelectedArtwork(null)
        setShowModal(false)
        document.body.style.overflow = "unset"
    }

    const handleNextPage = () => {
        if (!isLoading) {
            const nextPage = currentPage + 1
            setCurrentPage(nextPage)
            loadPage(nextPage, searchTerm, source)
            window.scrollTo({ top: 0, behavior: "smooth" })
        }
    }

    const handlePrevPage = () => {
        if (currentPage > 1 && !isLoading) {
            const prevPage = currentPage - 1
            setCurrentPage(prevPage)
            loadPage(prevPage, searchTerm, source)
            window.scrollTo({ top: 0, behavior: "smooth" })
        }
    }

    return (
        <>
            <Header />
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Explore Artworks</h1>

                <SearchFilterBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    source={source}
                    isLoading={isLoading}
                    onSearch={handleSearch}
                    onSourceChange={handleSourceChange}
                />

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                        {error}
                        <button
                            onClick={() =>
                                loadPage(currentPage, searchTerm, source)
                            }
                            className="ml-4 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                        >
                            Retry
                        </button>
                    </div>
                )}

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[...Array(20)].map((_, index) => (
                            <LoadingSkeleton key={index} />
                        ))}
                    </div>
                ) : artworks.length > 0 ? (
                    <>
                        <div className="mb-6 text-gray-600">
                            Showing {artworks.length} artworks (Page{" "}
                            {currentPage})
                            {totalArtworks > 0 && (
                                <span>
                                    {" "}
                                    • {totalArtworks.toLocaleString()} total
                                    artworks
                                </span>
                            )}
                            {searchTerm && <span> • For "{searchTerm}"</span>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                            {artworks.map((artwork: { id: string }, index) => (
                                <ArtworkCard
                                    key={artwork.id || `artwork-${index}`}
                                    artwork={artwork}
                                    isInCollection={isInCollection(artwork)}
                                    onArtworkClick={openModal}
                                    onAddToCollection={handleAddToCollection}
                                    onRemoveFromCollection={
                                        handleRemoveFromCollection
                                    }
                                />
                            ))}
                        </div>

                        <PaginationControls
                            currentPage={currentPage}
                            isLoading={isLoading}
                            onPrevPage={handlePrevPage}
                            onNextPage={handleNextPage}
                        />
                    </>
                ) : (
                    !isLoading && (
                        <div className="text-center py-16">
                            <p className="text-gray-500 text-lg">
                                No artworks found
                                {searchTerm && <span> for "{searchTerm}"</span>}
                            </p>
                            <button
                                onClick={() => loadPage(1, searchTerm, source)}
                                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                            >
                                Try Again
                            </button>
                        </div>
                    )
                )}

                <ArtworkModal
                    artwork={selectedArtwork}
                    isOpen={showModal}
                    onClose={closeModal}
                    isInCollection={
                        selectedArtwork
                            ? isInCollection(selectedArtwork)
                            : false
                    }
                    onAddToCollection={handleAddToCollection}
                    onRemoveFromCollection={handleRemoveFromCollection}
                />
            </main>
        </>
    )
}

export default Explore
