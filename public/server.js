const express = require('express'); // Importerar Express-framework
const bodyParser = require('body-parser'); // Importerar body-parser för att tolka JSON
const cors = require('cors'); // Importerar CORS för att tillåta åtkomst från andra domäner
const { v4: uuidv4 } = require('uuid'); // Importerar uuid och döper om till uuidv4 för att skapa unika id:n

const app = express(); // Skapar en ny Express-app
const port = 3000; // Bestämmer vilken port servern ska köra på

let todos = []; // Skapar en tom lista som ska innehålla todos

app.use(cors()); // Aktiverar CORS så att frontend kan prata med servern
app.use(bodyParser.json()); // Tillåter JSON i inkommande förfrågningar
app.use(express.static(__dirname)); // Gör mappen tillgänglig för att t.ex. kunna ladda index.html

// Route: Hämta alla todos
app.get('/todos', (req, res) => {
    try {
    res.json(todos);
  } catch (error) {
    console.error('Fel vid hämtning av todos:', error);
    res.status(500).json({ error: 'Serverfel vid hämtning av todos' });
  }
});

// Route: Skapa ny todo
app.post('/todos', (req, res) => {
  const { text } = req.body; // Hämtar text från request
  if (!text) return res.status(400).json({ error: 'Text is required' }); // Returnerar fel om text saknas

  const newTodo = { id: uuidv4(), text }; // Skapar ny todo med unikt id och text
  todos.push(newTodo); // Lägger till i listan
  res.status(200).json(newTodo); // Skickar tillbaka ny todo med status 201
});

// Route: Uppdatera en befintlig todo
app.put('/todos/:id', (req, res) => {
  const { id } = req.params; // Hämtar id från URL
  const { text } = req.body; // Hämtar ny text från request body

  const todo = todos.find(todo => todo.id === id); // Letar upp rätt todo i listan
  if (!todo) return res.status(404).json({ error: 'Todo not found' }); // Returnerar fel om ingen hittas

  todo.text = text; // Uppdaterar text
  res.json(todo); // Skickar tillbaka uppdaterad todo
});

// Route: Ta bort en todo
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params; // Hämtar id från URL
  todos = todos.filter(todo => todo.id !== id); // Tar bort todo från listan
  res.status(200).send(); // Skickar svar utan innehåll
});

// Startar servern och lyssnar på angiven port
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`); // Skriver ut att servern är igång
});
