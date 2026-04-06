interface FetchOptions {
	baseUrl?: string;
	endpoint: string;
	body?: Record<string, unknown>;
	queryParams?: Record<string, string | number | boolean>;
	method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
	headers?: Record<string, string>;
	retryCount?: number;
	retryDelay?: number;
}

class ApiError extends Error {
	status: number;
	url: string;
	constructor(message: string, status: number, url: string) {
		super(message);
		this.status = status;
		this.url = url;
		this.name = "ApiError";
	}
}


export const apiClient = async <T>(opts: FetchOptions): Promise<T> => {
	const {
		baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://legacy-academy-backend-271490766088.europe-west1.run.app",
		endpoint,
		queryParams,
		body,
		method = "GET",
		headers: customHeaders = {},
		retryCount = 3,
		retryDelay = 1000,
	} = opts;
	const makeRequest = async (attempt: number): Promise<T> => {
		try {
			const url = new URL(endpoint, baseUrl);
			if (!url.protocol || !url.host) {
				throw new Error("Invalid URL");
			}

			if (queryParams) {
				for (const [key, value] of Object.entries(queryParams)) {
					if (value !== undefined && value !== null) {
						url.searchParams.append(key, String(value));
					}
				}
			}

			const response = await fetch(url.toString(), {
				method: method,
				headers: {
					"Content-Type": "application/json",
					...customHeaders,
				},
				body: body ? JSON.stringify(body) : undefined,
			});

			if (!response.ok) {
				throw new ApiError(
					"Something went wrong. Please try again later.",
					response.status,
					url.toString(),
				);
			}

			if (response.status === 204) {
				return undefined as unknown as T;
			}

			const contentType = response.headers.get("content-type");
			if (contentType?.includes("application/json")) {
				return (await response.json()) as T;
			}

			throw new Error("Invalid response format: Expected JSON");
		} catch (error) {
			if (
				attempt <= retryCount &&
				error instanceof ApiError &&
				[500, 502, 503, 504].includes(error.status)
			) {
				await new Promise((resolve) =>
					setTimeout(resolve, retryDelay * attempt),
				);
				return makeRequest(attempt + 1);
			}

			// vibrate to alert the user of an error
			if (typeof window !== "undefined" && "navigator" in window) {
				const navigator = window.navigator as Navigator & {
					vibrate?: (pattern: number | number[]) => boolean;
				};
				if (navigator.vibrate) {
					navigator.vibrate(200);
				}
			}

			throw error instanceof ApiError
				? error
				: new Error("Something went wrong. Please try again later.");
		}
	};

	return makeRequest(1);
};




