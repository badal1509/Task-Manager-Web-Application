function fetchTasks() {
    fetch('/tasks')
        .then(res => res.json())
        .then(data => {
            const taskList = document.getElementById('taskList');
            taskList.innerHTML = ''; // Clear the current list

            data.forEach(task => {
                // Create a list item
                const li = document.createElement('li');
                li.className = 'task-item'; // Apply CSS class for styling

                // Create input for task name
                const taskInput = document.createElement('input');
                taskInput.type = 'text';
                taskInput.value = task.task;
                taskInput.className = 'task-input'; // Apply styling
                taskInput.oninput = () => editTask(task.id, 'task', taskInput.value);

                // Create input for task description
                const descriptionInput = document.createElement('input');
                descriptionInput.type = 'text';
                descriptionInput.value = task.description;
                descriptionInput.className = 'task-input'; // Apply styling
                descriptionInput.oninput = () => editTask(task.id, 'description', descriptionInput.value);

                // Create delete button
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.className = 'delete-btn'; // Apply styling
                deleteButton.onclick = () => deleteTask(task.id);

                // Append elements to the list item
                li.appendChild(taskInput);
                li.appendChild(descriptionInput);
                li.appendChild(deleteButton);

                // Append the list item to the task list
                taskList.appendChild(li);
            });
        })
        .catch(error => console.error("Error fetching tasks:", error));
}

function addTask() {
    const taskName = document.getElementById('taskNameInput').value;
    const taskDescription = document.getElementById('taskDescriptionInput').value;

    // Validate that task name and description are not empty
    if (taskName.trim() === '' || taskDescription.trim() === '') {
        alert("Both task name and description are required.");
        return; // Don't proceed if any input is empty
    }

    fetch('/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: taskName, description: taskDescription })
    }).then(() => {
        document.getElementById('taskNameInput').value = '';
        document.getElementById('taskDescriptionInput').value = '';
        fetchTasks();
    }).catch(error => console.error('Error adding task:', error));
}

function editTask(id, field, value) {
    const taskData = { id, [field]: value };

    fetch('/tasks', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData)
    }).then(response => {
        if (response.ok) {
            console.log("Task updated successfully!");
            fetchTasks(); // Refresh task list to show updated data
        } else {
            console.error("Error updating task.");
        }
    }).catch(error => console.error('Error updating task:', error));
}

function deleteTask(id) {
    fetch('/tasks', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id })
    }).then(res => res.json())
    .then(data => {
        console.log(data.message); // For debugging
        fetchTasks(); // Refresh the task list after deletion
    })
    .catch(error => console.error('Error deleting task:', error));
}

function logout() {
    window.location.href = "/logout";
}

window.onload = fetchTasks;
