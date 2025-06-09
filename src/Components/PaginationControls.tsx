interface PaginationControlsProps {
    currentPage: number
    isLoading: boolean
    onPrevPage: () => void
    onNextPage: () => void
}

const PaginationControls = ({ currentPage, isLoading, onPrevPage, onNextPage }: PaginationControlsProps) => {
    return (
        <div className="flex items-center justify-between">
            <button
                onClick={onPrevPage}
                disabled={currentPage <= 1 || isLoading}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                    currentPage > 1 && !isLoading
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
            >
                Previous
            </button>

            <div className="flex items-center space-x-2">
                <span className="text-gray-600 font-medium">
                    Page {currentPage}
                </span>
            </div>

            <button
                onClick={onNextPage}
                disabled={isLoading}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                    !isLoading
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
            >
                Next
            </button>
        </div>
    )
}

export default PaginationControls