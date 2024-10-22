document.getElementById('task-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const taskList = document.getElementById('task-list');
        const tasks = Array.from(taskList.getElementsByTagName('li')).map(item => item.textContent);
        if (!tasks.includes(taskText)) {
            const listItem = document.createElement('li');
            listItem.textContent = taskText;

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.addEventListener('change', function() {
                listItem.classList.toggle('highlighted');
            });

            const deleteIcon = document.createElement('img');
            deleteIcon.src = 'papelera.png';
            deleteIcon.alt = 'Eliminar';
            deleteIcon.classList.add('delete-icon');
            deleteIcon.addEventListener('click', function() {
                taskList.removeChild(listItem);
            });

            listItem.appendChild(checkbox);
            listItem.appendChild(deleteIcon);
            taskList.appendChild(listItem);
            taskInput.value = '';
        } else {
            alert('La tarea ya existe.');
        }
    }
});