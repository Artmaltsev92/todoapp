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