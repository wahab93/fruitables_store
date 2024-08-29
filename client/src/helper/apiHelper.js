export const apiHelper = {
    post,
    get,
}

// get Requests
async function get(url) {
    const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });

    return handleResponse(response);
}

// Post Request
async function post(url, body) {
    console.log('url:' , url , 'Body:' , body )
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });

    return handleResponse(response);
}


// Handling Response
async function handleResponse(response) {
    try {
        const data = await response.json();
        console.log('data in response in API helper:', data)
        if (response.status !== 200) {
            const error = (data);
            throw error;
        }
        return data;
    } catch (error) {
        console.error('Error in handleResponse:', error);
        throw error;
    }
}