const students = [
    {
        id: '1',
        name: "Dinh",
        address: "hue"
    },
    {
        id: '2',
        name: "Nam",
        address: "quang nam"
    },
    {
        id: '3',
        name: "Tan",
        address: "da nang"
    },
    {
        id: '4',
        name: "Hung",
        address: "hue"
    },
    {
        id: '5',
        name: "Tri",
        address: "quang tri"
    },
    {
        id: '6',
        name: "Anh",
        address: "hue"
    },
    {
        id: '7',
        name: "Binh",
        address: "da nang"
    }
]

/**
 * Render ra từng sinh viên
 * @param {*} student 
 * @returns 
 */
function renderStudent(student) {
    return `<li class='student-${student.id}'>
                <h2>Name: ${student.name}</h2>
                <p>Address: ${student.address}</p>
                <button onclick="onUpdate('${student.id}')">Sửa</button>
                <button onclick="onDelete('${student.id}')">Xóa</button>
            </li>`
}

/**
 * Render ra mảng sinh viên
 * @param {*} array 
 */
function render(array) {
    var ulElement = document.querySelector('#list-students');

    var htmls = array.map(function (student) {
        return renderStudent(student);
    });
    ulElement.innerHTML = htmls.join('');
}

render(students);

var createBtn = document.querySelector('#create');
var updateBtn = document.querySelector('#update');
var stName = document.querySelector('input[name="name"]');
var address = document.querySelector('input[name="address"]');

function generateUuid() {
    return 'xxxx-xxxx-xxx-xxxx'.replace(/[x]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Xử lý khi kích vào button Thêm
createBtn.onclick = function () {
    var check = true;
    if (isRequired(stName)) {
        check = false;
    }
    if (isRequired(address)) {
        check = false;
    }
    if (check) {
        var newSt = {
            id: generateUuid(),
            name: stName.value,
            address: address.value
        }
        students.push(newSt);
        var ulElement = document.querySelector('#list-students');
        ulElement.innerHTML += renderStudent(newSt);
        stName.value = '';
        address.value = '';
    }

    function isRequired(input) {
        var errorElement = input.parentElement.querySelector('.form-message');
        if (input.value.trim() === '') {
            errorElement.setAttribute('style', 'display: block; color: red; font-style: italic;');
            errorElement.innerText = 'Yêu cầu nhập!';
            input.classList.add('invalid');
            return true;
        } else {
            errorElement.setAttribute('style', 'display: none;');
            input.classList.remove('invalid');
            return false;
        }
    }
}

var idEd;
// Xử lý khi kích vào button Sửa
function onUpdate(id) {
    idEd = id;
    // tìm sinh viên muốn sửa
    var student = students.find(function (st) {
        return st.id === idEd;
    })

    stName.value = student.name;
    address.value = student.address;

    createBtn.setAttribute('style', 'display: none');
    updateBtn.setAttribute('style', 'display: block');
}

updateBtn.onclick = function () {
    var student = {
        id: idEd,
        name: stName.value,
        address: address.value
    }
    var idx = students.findIndex(function (student) {
        return student.id === idEd;
    })
    students.splice(idx, 1, student);
    var htmls = renderStudent(student);
    var studentElement = document.querySelector('.student-' + idEd);
    if (studentElement) {
        studentElement.outerHTML = htmls;
    }
    createBtn.setAttribute('style', 'display: block');
    updateBtn.setAttribute('style', 'display: none');
    stName.value = '';
    address.value = '';
}

// Xử lý khi kích vào button Xóa
function onDelete(id) {
    if (confirm("Bạn có chắc muốn xóa?")) {
        var idx = students.findIndex(function (student) {
            return student.id === id;
        })
        students.splice(idx, 1);
        var studentItem = document.querySelector('.student-' + id);
        if (studentItem) {
            studentItem.remove();
        }
    }
}

function handleBlurInput(input) {
    var errorElement = input.parentElement.querySelector('.form-message');
    input.onblur = function () {
        if (input.value.trim() === '') {
            errorElement.setAttribute('style', 'display: block; color: red; font-style: italic;');
            errorElement.innerText = 'Yêu cầu nhập!';
            input.classList.add('invalid');
        } else {
            errorElement.setAttribute('style', 'display: none;');
            input.classList.remove('invalid');
        }
    }

    input.oninput = function () {
        errorElement.setAttribute('style', 'display: none;');
        input.classList.remove('invalid');
    }
}

handleBlurInput(stName);
handleBlurInput(address);