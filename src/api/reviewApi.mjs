import axios from "axios";

const ENDPOINT_URL = "/api/review/"

const reviewApi = {
    async getReviews(bookId) {
        const result = await axios.get(ENDPOINT_URL + bookId);
        return result.data;
    },
    async getReview(reviewId) {
        const result = await axios.get(ENDPOINT_URL + reviewId);
        return result.data;
    },
    async createReview(review) {
        const result = await axios.post(ENDPOINT_URL, review);
        return result.data;
    },
    async updateReview(review) {
        const result = await axios.patch(ENDPOINT_URL + review._id, review);
        return result.data;
    },
    async deleteReview(review) {
        const result = await axios.delete(ENDPOINT_URL + review._id, { withCredentials: true })
        return result.data;
    },
    // toggle likes
    async toggleLikes(reviewId) {
        const result = await axios.get(ENDPOINT_URL + reviewId + "/likes");
        return result.data;
    },
}

export default reviewApi