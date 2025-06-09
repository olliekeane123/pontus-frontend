interface ArtworkModalProps {
    artwork: any
    isOpen: boolean
    isInCollection?: boolean
    onClose: () => void
    onAddToCollection: (artwork: any, e: React.MouseEvent) => void
    onRemoveFromCollection: (artwork: any, e: React.MouseEvent) => void
}

const ArtworkModal = ({
    artwork,
    isOpen,
    isInCollection = false,
    onClose,
    onAddToCollection,
    onRemoveFromCollection,
}: ArtworkModalProps) => {
    const handleImageError = (
        e: React.SyntheticEvent<HTMLImageElement, Event>
    ) => {
        const img = e.currentTarget
        if (img.src !== `${window.location.origin}/image-not-found.png`) {
            img.src = "/image-not-found.png"
        }
    }

    if (!isOpen || !artwork) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row relative">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition-colors"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>

                {/* Image Section */}
                <div className="md:w-1/2 bg-gray-100 flex items-center justify-center p-8">
                    <img
                        src={artwork.imageUrl || "/image-not-found.png"}
                        alt={artwork.title || "Artwork"}
                        className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                        onError={handleImageError}
                    />
                </div>

                {/* Info Section */}
                <div className="md:w-1/2 p-8 overflow-y-auto">
                    <div className="mb-6">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            {artwork.title || "Untitled"}
                        </h2>
                        {(artwork.artistName || artwork.artist_display) && (
                            <p className="text-xl text-gray-600 mb-2">
                                by{" "}
                                {artwork.artistName || artwork.artist_display}
                            </p>
                        )}
                        {(artwork.dateStart ||
                            artwork.date_start ||
                            artwork.date_display) && (
                            <p className="text-lg text-gray-500">
                                {artwork.date_display ||
                                    (artwork.dateStart === artwork.dateEnd
                                        ? artwork.dateStart
                                        : `${
                                              artwork.dateStart ||
                                              artwork.date_start ||
                                              "?"
                                          } - ${
                                              artwork.dateEnd ||
                                              artwork.date_end ||
                                              "?"
                                          }`)}
                            </p>
                        )}
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            Description
                        </h3>
                        <div className="bg-gray-50 p-4 rounded-lg min-h-[120px]">
                            <p className="text-gray-600">
                                {artwork.description ||
                                    "No description available for this artwork."}
                            </p>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            Details
                        </h3>
                        <div className="space-y-2 text-sm">
                            {artwork.medium && (
                                <div className="flex">
                                    <span className="font-medium text-gray-700 w-20">
                                        Medium:
                                    </span>
                                    <span className="text-gray-600">
                                        {artwork.medium}
                                    </span>
                                </div>
                            )}
                            {artwork.dimensions && (
                                <div className="flex">
                                    <span className="font-medium text-gray-700 w-20">
                                        Size:
                                    </span>
                                    <span className="text-gray-600">
                                        {artwork.dimensions}
                                    </span>
                                </div>
                            )}
                            {artwork.source && (
                                <div className="flex">
                                    <span className="font-medium text-gray-700 w-20">
                                        Source:
                                    </span>
                                    <span className="text-gray-600 capitalize">
                                        {artwork.source}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            isInCollection
                                ? onRemoveFromCollection(artwork, e)
                                : onAddToCollection(artwork, e)
                        }}
                        className={`w-full px-6 py-3 font-medium rounded-lg transition-colors ${
                            isInCollection
                                ? "bg-red-500 text-white hover:bg-red-600"
                                : "bg-accent-green text-white hover:bg-accent-dark-green"
                        }`}
                    >
                        {isInCollection
                            ? "Remove from Collection"
                            : "Add to Collection"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ArtworkModal
