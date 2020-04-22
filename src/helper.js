// метод, создающий тэг по входящим параметрам
// создан в целях обёртки над длинными методами js-a
// name - имя тега
// id - id
// className - имя класса
// innerText - innerText
// innerHtml - innerHTML
export const create = (name, id = null, className = null, innerText = null, innerHtml = null) => {
    const tag = document.createElement(name)
    if(id) {
        tag.setAttribute('id', id)
    }
    if(className) {
        tag.setAttribute('class', className)
    }
    if(innerText) {
        tag.innerText = innerText
    }
    if(innerHtml) {
        tag.innerHTML = innerHtml
    }
    return tag
}

// проверка входящих значений
export const check = (value) => {
    // если значение пустое
    if(!value) {
        alert('Пустой таск')
        return false
    }
    // получаем tbody
    const todoTableBody = document.getElementById('todoList');
    // получаем всех детей внутри tbody и их первых детей (td с самим таском)
    let elements = todoTableBody.querySelectorAll('tr > td:first-child')
    for(let el of elements) {
        // если хоть один из тасков равен входящему значению
        if(el.innerText === value) {
            alert('Такой таск уже имеется')
            return false
        }
    }

    return true
}