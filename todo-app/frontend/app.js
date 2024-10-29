document.addEventListener("DOMContentLoaded", () => {
  const todoForm = document.getElementById("todoForm");
  const taskInput = document.getElementById("taskInput");
  const todoList = document.getElementById("todoList");

  // To-Do 목록 불러오기
  const loadTodos = async () => {
    const response = await fetch("/api/todos");
    const { todos } = await response.json();
    todoList.innerHTML = "";
    todos.forEach((todo) => {
      const li = document.createElement("li");
      li.textContent = todo.task;
      li.dataset.id = todo.id;
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.onclick = async () => {
        await fetch(`/api/todos/${todo.id}`, { method: "DELETE" });
        loadTodos();
      };
      li.appendChild(deleteButton);
      todoList.appendChild(li);
    });
  };

  // 새로운 To-Do 추가
  todoForm.onsubmit = async (e) => {
    e.preventDefault();
    const task = taskInput.value;
    await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task }),
    });
    taskInput.value = "";
    loadTodos();
  };

  loadTodos();
});
