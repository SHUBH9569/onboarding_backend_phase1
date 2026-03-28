import mongoose from "mongoose";

const metadataSchema = new mongoose.Schema({
    bookId : String,
    reviews : [
        {
            user: String,
            comment: String,
            rating: Number
        }
    ],
    avgRating: Number
});

export const Metadata = mongoose.model('Metadata',metadataSchema); 