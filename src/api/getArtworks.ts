import axios from "axios";

axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.timeout = 30000;

const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

export const getAllArtworks = async (source: string, page: number, searchTerm: string) => {
    try {
        const encodedSearchTerm = encodeURIComponent(searchTerm);

        if (!backendBaseUrl) {
            throw new Error("Backend base URL is not defined");
        }
        const url = `${backendBaseUrl}/api/artworks/${source}`;

        const params = new URLSearchParams();
        params.append('page', page.toString());

        if (searchTerm) {
            params.append('q', encodedSearchTerm);
        }

        const fullUrl = `${url}?${params.toString()}`;

        const response = await axios.get(fullUrl);

        if (response.data) {
            return response.data;
        } else {
            throw new Error("No artworks found");
        }
    } catch (error: any) {
        console.error("Error fetching artworks:", error.response?.data || error.message);
        throw error;
    }
};
