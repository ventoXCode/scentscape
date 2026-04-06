"use server";

import { getAuthToken } from "@/lib/medusa/auth-actions";

const BACKEND_URL = process.env.MEDUSA_BACKEND_URL || "http://localhost:9000";

export interface ReviewData {
  id: string;
  product_id: string;
  customer_id: string;
  rating: number;
  title: string | null;
  body: string | null;
  status: string;
  created_at: string;
}

export interface ReviewsResponse {
  reviews: ReviewData[];
  averageRating: number;
  reviewCount: number;
  distribution: Record<number, number>;
}

export async function getProductReviews(productId: string): Promise<ReviewsResponse | null> {
  try {
    const res = await fetch(`${BACKEND_URL}/store/products/${productId}/reviews`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function submitReview(data: {
  product_id: string;
  rating: number;
  title?: string;
  body?: string;
}): Promise<{ success: true; review: ReviewData } | { success: false; error: string }> {
  const token = await getAuthToken();
  if (!token) {
    return { success: false, error: "Please sign in to leave a review." };
  }

  try {
    const res = await fetch(`${BACKEND_URL}/store/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    if (!res.ok) {
      return { success: false, error: json.message || "Failed to submit review." };
    }

    return { success: true, review: json.review };
  } catch {
    return { success: false, error: "Failed to submit review. Please try again." };
  }
}
