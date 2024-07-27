export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CloudinaryResponse {
  secure_url: string;
  public_id: string;
  // Add any other properties you need from the Cloudinary response
}
