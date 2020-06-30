'use strict';

const todoControl = document.querySelector('.todo-control'),
    todoContainer = document.querySelector('.todo-container'),
    todo = document.querySelector('#todo'),
    completed = document.querySelector('#completed');


// возвращает либо запись либо пустой массив
const readLocalStorage = () => JSON.parse(localStorage.getItem('todo')) || [];


// отрисовка элементов на страницу
const render = function () {
    let localData = readLocalStorage();
    todo.textContent = '';
    completed.textContent = '';

    localData.forEach(function (item, i) {
        let newLi = document.createElement('li');
        newLi.classList.add('todo-item');
        newLi.setAttribute(`data-id`, `${i}`);
        newLi.innerHTML = '<span class="text-todo">' + item.title + '</span>' +
            '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
            '</div>';

        if (item.status === false) {
            todo.append(newLi);
        } else {
            completed.append(newLi);
        }
    });
};

render();

// вносим данные в LocalStorage
const insertToLocalStorage = data => {
    let localData = readLocalStorage();
    localData.push(data);
    localStorage.setItem('todo', JSON.stringify(localData));
    render();
};

const deleteLocalStorage = function (elem) {
    let localData = readLocalStorage();
    let parentId = +elem.closest('li').dataset.id;
    localData.splice(parentId, 1);
    localStorage.setItem('todo', JSON.stringify(localData));
    render();
};

const updateLocalStorage = function (elem) {
    let localData = readLocalStorage();
    let parentId = +elem.closest('li').dataset.id;
    localData[parentId].status = true;
    localStorage.setItem('todo', JSON.stringify(localData));
    render();
};

todoControl.addEventListener('submit', function (event) {
    event.preventDefault();

    const input = event.target.querySelector('input');

    const data = {
        title: input.value,
        status: false
    };

    insertToLocalStorage(data);
    event.target.reset();
});

todoContainer.addEventListener('click', function (event) {
    let target = event.target;
    if (target.closest('.todo-remove')) {
        deleteLocalStorage(target);
    } else if (target.closest('.todo-complete')) {
        updateLocalStorage(target);
    }
});