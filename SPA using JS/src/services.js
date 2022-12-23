export function fetchLogin(username) {
    return fetch('/api/session', {
        method: 'POST',
        headers: {
            'content-type': 'application/json', // set this header when sending JSON in the body of request
        },
        body: JSON.stringify({ username }),
    })
        // fetch() rejects on network error
        // So we convert that to a formatted error object
        // so our caller can handle all "errors" in a similar way
        .catch(err => Promise.reject({ error: 'network-error' }))
        .then(response => {
            if (!response.ok) {  // response.ok checks the status code from the service
                // This service returns JSON on errors,
                // so we use that as the error object and reject
                return response.json().then(err => Promise.reject(err));
            }
            return response.json(); // happy status code means resolve with data from service
        });
}

export function fetchStatus() {
    return fetch('/api/session', {
        method: 'GET',
    })
        .catch(err => Promise.reject({ error: 'network-error' }))
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => Promise.reject(err));
            }
            return response.json();
        });
}

export function fetchLogout() {
    return fetch('/api/session', {
        method: 'DELETE',
    })
        .catch(err => Promise.reject({ error: 'network-error' }))
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => Promise.reject(err));
            }
            return response.json();
        })
}

export function fetchLoggedInUsers() {
    return fetch('/api/loggedinusers', {
        method: 'GET',
    })
        .catch(err => Promise.reject({ error: 'network-error' }))
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => Promise.reject(err));
            }
            return response.json();
        });
}

export function fetchMessageList(currentTalkingTo) {
    return fetch('/api/messagelist', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({ currentTalkingTo }),
    })
        .catch(err => Promise.reject({ error: 'network-error' }))
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => Promise.reject(err));
            }
            return response.json();
        })
}

export function fetchSendingMessage(message, currentTalkingTo) {
    return fetch('/api/message', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({ message, currentTalkingTo }),
    })
        .catch(err => Promise.reject({ error: 'network-error' }))
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => Promise.reject(err));
            }
            return response.json();
        })
}