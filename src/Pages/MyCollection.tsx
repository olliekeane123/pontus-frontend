import { useEffect, useState } from "react"
import Header from "../Components/Header"
import ArtworkCard from "../Components/ArtworkCard"
import ArtworkModal from "../Components/ArtworkModal"
import { useCollection } from "../utils/collectionUtils"

const MyCollection = () => {

    const { collection, removeFromCollection } = useCollection()

    const [selectedArtwork, setSelectedArtwork] = useState<any>(null)
    const [showModal, setShowModal] = useState<boolean>(false)

    
    useEffect(() => {
        if (showModal && selectedArtwork) {
            const isStillInCollection = collection.some(
                (item) =>
                    item.id === selectedArtwork.id &&
                    item.source === selectedArtwork.source
            )
            if (!isStillInCollection) {
                closeModal()
            }
        }
    }, [collection, showModal, selectedArtwork])

    const handleRemove = (artwork: any, e: React.MouseEvent) => {
        e.stopPropagation()
        removeFromCollection(artwork.id, artwork.source)
    }


    const handleRemoveFromCollectionAndCloseModal = (
        artwork: any,
        e: React.MouseEvent
    ) => {
        handleRemove(artwork, e) // Perform the removal
        closeModal() // Close the modal after removal
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

    return (
        <>
            <Header />
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">My Collection</h1>

                {collection.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                        {collection.map((artwork, index) => (
                            <ArtworkCard
                                key={artwork.id || `artwork-${index}`}
                                artwork={artwork}
                                onArtworkClick={openModal}
                                onAddToCollection={() => {}} // Not applicable in MyCollection
                                onRemoveFromCollection={handleRemove}
                                isInCollection={true} // Always true for items displayed here
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-lg text-center py-16">
                        Your collection is empty.
                    </p>
                )}

                <ArtworkModal
                    artwork={selectedArtwork}
                    isOpen={showModal}
                    onClose={closeModal}
                    isInCollection={
                        selectedArtwork
                            ? collection.some(
                                  (item) =>
                                      item.id === selectedArtwork.id &&
                                      item.source === selectedArtwork.source
                              )
                            : false
                    }
                    onAddToCollection={() => {}}
                    onRemoveFromCollection={
                        handleRemoveFromCollectionAndCloseModal
                    }
                />
            </main>
        </>
    )
}

export default MyCollection
