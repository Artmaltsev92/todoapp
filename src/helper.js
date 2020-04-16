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

export const check = (value) => {
    if(!value) {
        alert('Пустой таск')
        return false
    }

    const todoTableBody = document.getElementById('todoList');
    let elements = todoTableBody.querySelectorAll('tr > td:first-child')
    for(let el of elements) {
        if(el.innerText === value) {
            alert('Такой таск уже имеется')
            return false
        }
    }
    
    return true
}