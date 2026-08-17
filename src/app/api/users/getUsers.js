export async function getUsers() {
  try {
    const response = await fetch(`${process.env.BACK_URL}/users`);
    if (!response.ok) {
      throw new Error(`Error al obtener usuarios: ${response.status}`);
    }
    const data = await response.json(); // Aquí extraes el JSON
    return data;
  } catch (error) {
    console.error("Error en getUsers:", error);
    return null;
  }
}
