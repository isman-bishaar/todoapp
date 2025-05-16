// Hämtar formulär, textfältet och listan från HTML
const todoForm = document.getElementById('todo-form'); 
const todoInput = document.getElementById('todo-input'); 
const todoList = document.getElementById('todo-list'); 

// Hämtar sparade todos från localStorage.Om det inte finns några (dvs null), skapas istället en tom lista [].
let todos = JSON.parse(localStorage.getItem('todos')) || []; 

//  Alla todos som fanns i localStorage visas i listan direkt när sidan laddas.
todos.forEach(todo => addTodoToDOM(todo)); 

// Lyssnar på att användaren lägger till en ny todo och skapar den
todoForm.addEventListener('submit', e => {
  e.preventDefault(); // Förhindrar att sidan laddas om vid formulärskick
  const text = todoInput.value.trim(); // Hämtar och trimmar texten från inputfältet
  if (text !== '') { // Om texten inte är tom
    const newTodo = {
      id: Date.now().toString(), // Skapar ett unikt id med tidsstämpel
      text: text // Sätter todo-texten
    };
    todos.push(newTodo); // Lägger till nya todo i listan
    addTodoToDOM(newTodo); // Visar nya todo i skärmen
    saveTodos(); // Sparar listan i localStorage
    todoInput.value = ''; // den tömmer där texten skrivs
  }
});

// Funktion som lägger till en todo i skärmen
function addTodoToDOM(todo) {
  const li = document.createElement('li'); // Skapar nytt <li> element
  li.setAttribute('data-id', todo.id); // Sätter id som attribut

  const span = document.createElement('span'); // Skapar <span> för att visa texten
  span.textContent = todo.text; // Sätter innehållet till todo-texten

  const editBtn = document.createElement('button'); // Skapar en edit button
  editBtn.textContent = 'Edit'; // den sätter edit som namn
  editBtn.addEventListener('click', () => { // den lyssnar på klick
    const newText = prompt('Edit your task:', todo.text); // Visar prompt med aktuell text
    if (newText !== null && newText.trim() !== '') { // Om något nytt skrevs in
      todo.text = newText.trim(); // Uppdaterar gamla text
      span.textContent = todo.text; // Visar uppdaterade text
      saveTodos(); // Sparar uppdaterad lista i localStorage
    }
  });

  const deleteBtn = document.createElement('button'); // Skapar en raderingsknapp
  deleteBtn.textContent = 'Delete'; // Sätter knapptext
  deleteBtn.addEventListener('click', () => { // Lyssnar på klick
    todos = todos.filter(t => t.id !== todo.id); // Tar bort todo från listan
    todoList.removeChild(li); // Tar bort todo från DOM
    saveTodos(); // Sparar ändrad lista i localStorage
  });

  li.appendChild(span); // Lägger till text i lista
  li.appendChild(editBtn); // Lägger till redigeringsknapp i listan
  li.appendChild(deleteBtn); // Lägger till raderingsknapp i listan
  todoList.appendChild(li); // Lägger till hela listan p[ skär
}

// Funktion för att spara todo-listan i localStorage
function saveTodos() {
 try {
    localStorage.setItem('todos', JSON.stringify(todos));
  } catch (error) {
    console.error('Kunde inte spara till localStorage:', error);
  }}
