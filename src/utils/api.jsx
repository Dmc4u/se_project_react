const baseUrl = 'http://localhost:3001';

// Function to check server response
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

// General request function
function request(url, options) {
  return fetch(url, options).then(checkResponse);
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
    },
    body: JSON.stringify(newItem),
  });
}

// DELETE: Remove a clothing item
function deleteItem(id) {
  return request(`${baseUrl}/items/${id}`, {
    method: 'DELETE',
  });
}

export { getItems, addItem, deleteItem };
