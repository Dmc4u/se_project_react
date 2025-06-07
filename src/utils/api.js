import { baseUrl } from './constants.js';


// Function to check server response
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

// General request function
function request(url, options) {
  return fetch(url, options)
    .then(checkResponse)
    .catch((err) => {
      console.error(`Request failed: ${err}`);
      throw err;
    });
}

// GET: Fetch all clothing items
function getItems() {
  return request(`${baseUrl}/items`);
}

// POST: Add a new clothing item
function addItem(newItem) {
  return request(`${baseUrl}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`, // Add Bearer token
    },
    body: JSON.stringify(newItem),
  });
}

// DELETE: Remove a clothing item 
function deleteItem(id) {
  return request(`${baseUrl}/items/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt')}`, // Add Bearer token
    },
  });
}

// PATCH: Update user profile
function updateUser({ name, avatar }) {
  return request(`${baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`, // Add Bearer token
    },
    body: JSON.stringify({ name, avatar }),
  });
}

// PUT: Add a like to an item
function addCardLike(id, token) {
  return request(`${baseUrl}/items/${id}/likes`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// DELETE: Remove a like from an item
function removeCardLike(id, token) {
  return request(`${baseUrl}/items/${id}/likes`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export { getItems, addItem, deleteItem, updateUser, addCardLike, removeCardLike };