interface ArtworkCardProps {
    artwork: any
    isInCollection?: boolean
    onArtworkClick: (artwork: any) => void
    onAddToCollection: (artwork: any, e: React.MouseEvent) => void
    onRemoveFromCollection: (artwork: any, e: React.MouseEvent) => void
}

const ArtworkCard = ({
    artwork,
    isInCollection = false,
    onArtworkClick,
    onAddToCollection,
    onRemoveFromCollection,
}: ArtworkCardProps) => {
    const handleImageError = (
        e: React.SyntheticEvent<HTMLImageElement, Event>
    ) => {
        const img = e.currentTarget
        if (img.src !== `${window.location.origin}/image-not-found.png`) {
            img.src = "/image-not-found.png"
        }
    }

    return (
        <div
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => onArtworkClick(artwork)}
        >
            <div className="aspect-square overflow-hidden bg-gray-100">
                <img
                    src={artwork.imageUrl || "/image-not-found.png"}
                    alt={artwork.title || "Artwork"}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={handleImageError}
                />
            </div>
            <div className="p-4">
                <h3 className="font-semibold text-gray-900 line-clamp-2 mb-1">
                    {artwork.title || "Untitled"}
                </h3>
                {(artwork.artistName || artwork.artist_display) && (
                    <p className="text-sm text-gray-600 line-clamp-1">
                        {artwork.artistName || artwork.artist_display}
                    </p>
                )}
                {(artwork.dateStart ||
                    artwork.date_start ||
                    artwork.date_display) && (
                    <p className="text-xs text-gray-500 mt-1">
                        {artwork.date_display ||
                            (artwork.dateStart === artwork.dateEnd
                                ? artwork.dateStart
                                : `${
                                      artwork.dateStart ||
                                      artwork.date_start ||
                                      "?"
                                  } - ${
                                      artwork.dateEnd || artwork.date_end || "?"
                                  }`)}
                    </p>
                )}

                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        isInCollection
                            ? onRemoveFromCollection(artwork, e)
                            : onAddToCollection(artwork, e)
                    }}
                    className={`mt-3 w-full px-4 py-2 text-white text-sm rounded-lg transition-colors ${
                        isInCollection
                            ? "bg-red-500 hover:bg-red-600"
                            : "bg-accent-green hover:bg-accent-dark-green"
                    }`}
                >
                    {isInCollection
                        ? "Remove from Collection"
                        : "Add to Collection"}
                </button>
            </div>
        </div>
    )
}

export default ArtworkCard
