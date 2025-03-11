const baseUrl = 'http://localhost:3001';

// GET: Fetch all clothing items
function getItems() {
  return fetch(`${baseUrl}/items`)
    .then((res) => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));
}

// POST: Add a new clothing item
function addItem(newItem) {
  return fetch(`${baseUrl}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newItem),
  })
  .then((res) => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));
}

// DELETE: Remove a clothing item
function deleteItem(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: 'DELETE',
  })
  .then((res) => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));
}

export { getItems, addItem, deleteItem };
