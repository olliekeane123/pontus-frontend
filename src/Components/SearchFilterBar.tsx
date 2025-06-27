import React from "react";

interface SearchFilterBarProps {
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    source: string;
    isLoading: boolean;
    onSearch: () => void;
    onSourceChange: (source: string) => void;
}

const SearchFilterBar = ({
    searchTerm,
    setSearchTerm,
    source,
    isLoading,
    onSearch,
    onSourceChange,
}: SearchFilterBarProps) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-end">
                {/* Search Input */}
                <div className="flex-1">
                    <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                        Search
                    </label>
                    <div className="flex">
                        <input
                            id="search"
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && onSearch()}
                            placeholder="Search artworks, artists, titles..."
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            disabled={isLoading}
                        />
                        <button
                            onClick={onSearch}
                            disabled={isLoading}
                            className="px-6 py-2 bg-accent-green text-white rounded-r-lg hover:bg-accent-dark-green disabled:bg-gray-400 transition-colors"
                        >
                            Search
                        </button>
                    </div>
                </div>

                {/* Source Select */}
                <div className="min-w-[150px]">
                    <label htmlFor="source" className="block text-sm font-medium text-gray-700 mb-2">
                        Source
                    </label>
                    <select
                        id="source"
                        value={source}
                        onChange={(e) => onSourceChange(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-green focus:borderaccent-green"
                        disabled={isLoading}
                    >
                        <option value="aic">Art Institute of Chicago</option>
                        <option value="cleveland">Cleveland Museum</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default SearchFilterBar;