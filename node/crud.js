const express = require('express');
const bodyParser = require('body-parser');

let items = [];

async function create(data) {
  const newItem = { id: items.length + 1, ...data };
  items.push(newItem);
  return newItem;
}

async function update(id, data) {
  const index = items.findIndex(item => item.id === id);
  if (index !== -1) {
    items[index] = { ...items[index], ...data };
    return items[index];
  } else {
    throw new Error('Elemento no encontrado');
  }
}

async function remove(id) {
  const index = items.findIndex(item => item.id === id);
  if (index !== -1) {
    const deletedItem = items.splice(index, 1);
    return deletedItem[0];
  } else {
    throw new Error('Elemento no encontrado');
  }
}

async function getAll() {
  return items;
}

const app = express();
app.use(bodyParser.json());

app.post('api/create', async (req, res) => {
  try {
    const newItem = await create(req.body);
    res.json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('api/update/:id', async (req, res) => {
  try {
    const updatedItem = await update(parseInt(req.params.id, 10), req.body);
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('api/remove/:id', async (req, res) => {
  try {
    const deletedItem = await remove(parseInt(req.params.id, 10));
    res.json(deletedItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('api/getAll', async (req, res) => {
  try {
    const allItems = await getAll();
    res.json(allItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

module.exports = {
  create,
  update,
  remove,
  getAll
}