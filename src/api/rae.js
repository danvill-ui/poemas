export default async function handler(req, res) {
    const { word } = req.query;
    console.log(word)
    try {
        const response = await fetch(`https://rae-api.com/api/words/${word}`);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener datos de la API' });
    }
}