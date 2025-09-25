import { draftMode } from "next/headers";
import qs from "qs";
import { StrapiApiResponse, StrapiQueryParams } from "@/types";

/**
 * Fetches data for a specified Strapi content type.
 *
 * @param {string} contentType - The type of content to fetch from Strapi.
 * @param {StrapiQueryParams} params - Query parameters to append to the API request.
 * @param {boolean} spreadData - Whether to spread the data from the response.
 * @return {Promise<T | StrapiApiResponse<T>>} The fetched data.
 */

export function spreadStrapiData<T>(data: Record<string, unknown>): T | null {
  if (data && data.data) {
    if (Array.isArray(data.data) && data.data.length > 0) {
      return data.data[0] as T;
    }
    if (!Array.isArray(data.data)) {
      return data.data as T;
    }
  }
  return null;
}

export default async function fetchContentType<T>(
  contentType: string,
  params: StrapiQueryParams = {},
  spreadData?: boolean,
): Promise<StrapiApiResponse<T> | T | null> {
  const { isEnabled } = await draftMode();

  try {
    const queryParams = { ...params };

    if (isEnabled) {
      queryParams.status = "draft";
    }

    // Escolhe a URL base conforme ambiente (SSR/build ou client-side)
    console.log("STRAPI_INTERNAL_URL:", process.env.STRAPI_INTERNAL_URL);
    console.log("NEXT_PUBLIC_STRAPI_API_URL:", process.env.NEXT_PUBLIC_STRAPI_API_URL);
    const baseUrl =
      typeof window === "undefined"
        ? process.env.STRAPI_INTERNAL_URL
        : process.env.NEXT_PUBLIC_STRAPI_API_URL;
    console.log("Base URL:", baseUrl);
    if (!baseUrl) {
      throw new Error("Missing STRAPI_INTERNAL_URL or NEXT_PUBLIC_STRAPI_API_URL");
    }

    // Construct the full URL for the API request
    const url = new URL(`api/${contentType}`, baseUrl);
    console.log("FetchContentType URL", url.href);

    const queryString = qs.stringify(queryParams, {
      encode: false,
      arrayFormat: "brackets",
    });
    const finalUrl = `${url.href}?${queryString}`;

    const response = await fetch(finalUrl, {
      method: "GET",
      next: { revalidate: 5 }, // Revalida a cada 10 segundos
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch data from Strapi (url=${finalUrl}, status=${response.status})`,
      );
    }

    const jsonData = await response.json();

    if (spreadData) {
      return spreadStrapiData<T>(jsonData);
    }

    console.log("FetchContentType Response", jsonData);
    return jsonData as StrapiApiResponse<T>;
  } catch (error) {
    console.error("FetchContentTypeError", error);
    if (error instanceof Error) {
      console.error("FetchContentTypeError:", error.message, error.stack);
    } else {
      console.error("FetchContentTypeError:", String(error));
    }
    return spreadData ? null : ({} as StrapiApiResponse<T>);
  }
}
