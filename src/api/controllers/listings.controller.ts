import { Request, Response } from "express";
import * as listingsService from "../../services/listings.service";
import { ApiResponse } from "../../utils/apiResponse";
import { redisClient } from "../../libs/cache/redisClient";

export const createListing = async (req: Request, res: Response) => {
  try {
    const listing = await listingsService.createListing(req.body);
    return ApiResponse.success(
      res,
      "Listing created successfully",
      { id: listing.id },
      201,
    );
  } catch (error) {
    const err = error as Error;
    return ApiResponse.error(res, "Failed to create listing", 500, err.message);
  }
};

export const getListings = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const listings = await listingsService.getListings(page, limit);
    return ApiResponse.paginate(res, "Listings fetched successfully", listings);
  } catch (error) {
    return ApiResponse.error(res, "Failed to fetch listings", 500, error);
  }
};

export const getListingById = async (req: Request, res: Response) => {
  const cacheKey = `listing:${req.params.id}`;

  try {
    const cached = await redisClient.get(cacheKey);

    if (cached) {
      const listing = JSON.parse(cached);
      return ApiResponse.success(res, "Listing fetched from cache", listing);
    }

    const listing = await listingsService.getListingById(String(req.params.id));

    if (!listing) {
      return ApiResponse.error(res, "Listing not found", 404);
    }

    await redisClient.set(cacheKey, JSON.stringify(listing), "EX", 300);

    return ApiResponse.success(res, "Listing fetched successfully", listing);
  } catch (error) {
    return ApiResponse.error(res, "Failed to fetch listing", 500, error);
  }
};

export const deleteListing = async (req: Request, res: Response) => {
  try {
    await listingsService.deleteListing(String(req.params.id));
    return ApiResponse.success(res, "Listing deleted successfully", 200);
  } catch (error) {
    return ApiResponse.error(res, "Failed to delete listing", 500, error);
  }
};

export const updateListing = async (req: Request, res: Response) => {
  try {
    await listingsService.updateListing(String(req.params.id), req.body);
    return ApiResponse.success(res, "Listing updated successfully", 200);
  } catch (error) {
    return ApiResponse.error(res, "Failed to update listing", 500, error);
  }
};

export const searchListing = async (req: Request, res: Response) => {
  try {
    const query = String(req.query.q || "");
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    if (!query) return ApiResponse.error(res, "Search query is required", 400);

    const data = await listingsService.searchListings(query, page, limit);

    return ApiResponse.success(
      res,
      "Search results fetched successfully",
      data,
    );
  } catch (error) {
    return ApiResponse.error(res, "Failed to search listings", 500, error);
  }
};

export const uploadImage = async (req: Request, res: Response) => {
  try {
    const { imageUrl, listingId } = req.body;

    if (!imageUrl || !listingId)
      return ApiResponse.error(res, "Invalid input", 500);

    await listingsService.uploadListingImage(imageUrl, listingId);

    return ApiResponse.success(res, "Image uploaded successfully", 200);
  } catch (error) {
    return ApiResponse.error(res, "Failed to upload image", 500, error);
  }
};
