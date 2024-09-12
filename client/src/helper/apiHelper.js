export const apiHelper = {
    post,
    get,
    delete: deleteRequest,  // Add the delete function
};

// GET Requests
async function get(url) {
    const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    });

    return handleResponse(response);
}

// POST Requests
async function post(url, body) {
    console.log('post URL in APIhelper Posty:', url, 'Body in apiHelper Post:', body);
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include', // Include credentials (cookies)
    });

    return handleResponse(response);
}

// DELETE Requests
async function deleteRequest(url) {
    console.log('Delete URL in apiHelper:', url);
    const response = await fetch(url, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Include credentials (cookies)
    });

    return handleResponse(response);
}

// Handling the Response
async function handleResponse(response) {
    try {
        const data = await response.json();
        console.log('data in response in API helper:', data);
        if (!response.ok) {
            const error = data;
            throw error;
        }
        return data;
    } catch (error) {
        console.error('Error in handleResponse:', error);
        throw error;
    }
}