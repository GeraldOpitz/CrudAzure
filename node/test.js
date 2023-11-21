const { create, update, remove, getAll } = require('./crud');

async function testCrud() {
  try {
    const newItem = await create({ name: 'Nuevo ítem', description: 'Descripción del nuevo ítem' });
    console.log('Nuevo ítem creado:', newItem);

    const newItem2 = await create({ name: 'Nuevo ítem2', description: 'Descripción del nuevo ítem' });
    console.log('Nuevo ítem creado:', newItem2);

    const updatedItem = await update(newItem.id, { name: 'Ítem actualizado', description: 'Descripción actualizada' });
    console.log('Ítem actualizado:', updatedItem);

    const deletedItem = await remove(updatedItem.id);
    console.log('Ítem eliminado:', deletedItem);

    const allItems = await getAll();
    console.log('Todos los elementos:', allItems);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testCrud();
