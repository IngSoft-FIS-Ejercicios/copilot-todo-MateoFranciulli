document.getElementById('task-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const userInput = document.getElementById('user-input');
    const taskInput = document.getElementById('task-input');
    const userText = userInput.value.trim();
    const taskText = taskInput.value.trim();

    let selectedUser = document.querySelector('input[name="user"]:checked');
    if (userText === '' && !selectedUser) {
        alert('Por favor, ingresa un usuario o selecciona uno existente.');
        return;
    }

    if (taskText === '') {
        alert('Por favor, ingresa una tarea.');
        return;
    }

    const taskList = document.getElementById('task-list');
    const tasks = Array.from(taskList.getElementsByTagName('li')).map(item => item.textContent);
    if (!tasks.includes(taskText)) {
        const listItem = document.createElement('li');
        const assignedUser = userText !== '' ? userText : selectedUser.value;
        listItem.textContent = `${taskText} (Asignado a: ${assignedUser})`;

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

        if (userText !== '') {
            addUserToList(userText);
            userInput.value = '';
        }
    } else {
        alert('La tarea ya existe.');
    }
});

function addUserToList(user) {
    const userList = document.getElementById('user-list');
    const userItem = document.createElement('div');
    const userRadio = document.createElement('input');
    userRadio.type = 'radio';
    userRadio.name = 'user';
    userRadio.value = user;
    userRadio.id = `user-${user}`;

    const userLabel = document.createElement('label');
    userLabel.htmlFor = `user-${user}`;
    userLabel.textContent = user;

    userItem.appendChild(userRadio);
    userItem.appendChild(userLabel);
    userList.appendChild(userItem);
}