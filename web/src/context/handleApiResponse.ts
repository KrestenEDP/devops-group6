export async function handleApiResponse(res: Response, defaultMessage = "Something went wrong.") {
    if (res.ok) return res;

    let errorMessage = defaultMessage;

    if (res.status === 401) {
        errorMessage = "You must be logged in to perform this action.";
    } else if (res.status === 403) {
        errorMessage = "You don’t have permission to perform this action.";
    } else {
        try {
            const data = await res.json();
            if (data?.message) errorMessage = data.message;
        } catch {
            const text = await res.text();
            if (text) errorMessage = text;
        }
    }

    throw new Error(errorMessage);
}