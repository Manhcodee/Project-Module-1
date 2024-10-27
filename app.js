const tableTbody = document.querySelector('#students-table tbody');
let editIndex = -1; // Biến để lưu chỉ số của học sinh đang được chỉnh sửa

// Hàm hiển thị danh sách học sinh
function displayStudents(students = dataStudents) {
    tableTbody.innerHTML = '';

    if (students.length === 0) {
        // Nếu không có kết quả, hiển thị thông báo
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="9" style="text-align:center;">Không tìm thấy kết quả</td>`;
        tableTbody.appendChild(row);
        return;
    }

    students.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.class}</td>
            <td>${student.date}</td>
            <td>${student.gender}</td>
            <td>${student.address}</td>
            <td>${student.email}</td>
            <td>${student.course}</td>
            <td>
                <span>
                    <button class="btn" onclick="editStudent(${index})">Sửa</button>
                    <button class="btn btn_del" onclick="removeStudent(${index})">Xóa</button>
                </span>
            </td>
        `;
        tableTbody.appendChild(row);
    });
}

// Hàm tìm kiếm học sinh
function searchStudent() {
    const searchInput = document.getElementById('search_input').value.toLowerCase();
    const searchType = document.getElementById('select_search').value;

    const filteredStudents = dataStudents.filter(student => {
        if (searchType === 'name') {
            return student.name.toLowerCase().includes(searchInput);
        } else if (searchType === 'id') {
            return student.id.toString().includes(searchInput);
        } else if (searchType === 'class') {
            return student.class.toLowerCase().includes(searchInput);
        }
        return false;
    });

    displayStudents(filteredStudents);
}

// Thêm sự kiện Enter cho ô tìm kiếm
document.getElementById('search_input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        searchStudent();
    }
});

// Hàm thêm dữ liệu
function addStudent() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const classId = document.getElementById('class').value;
    const date = document.getElementById('date').value;
    const gender = document.getElementById('gender').value;
    const address = document.getElementById('address').value;
    const course = document.getElementById('course').value;

    if (name !== '' && classId !== '') {
        const newStudent = {
            id: dataStudents.length + 1,
            name: name,
            email: email,
            class: classId,
            address: address,
            course: course,
            date: date,
            gender: gender,
        };

        dataStudents.push(newStudent);
    } else {
        alert(' Vui lòng nhập tối thiểu tên và lớp');
    }

    displayStudents();

    // Xóa nội dung trong các ô input sau khi thêm
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('class').value = '';
    document.getElementById('date').value = '';
    document.getElementById('gender').value = '';
    document.getElementById('address').value = '';
    document.getElementById('course').value = '';
}

// Xóa nội dung
function removeStudent(index) {
    if(confirm("Bạn có chắc chắn muốn xóa không?")) {
        dataStudents.splice(index, 1);  // Xóa học sinh tại vị trí index
    }
    displayStudents();
}
displayStudents();

// Hàm để chỉnh sửa một học sinh
function editStudent(index) {
    const student = dataStudents[index];

    // Hiển thị thông tin học sinh trong các ô input
    document.getElementById('name').value = student.name;
    document.getElementById('email').value = student.email;
    document.getElementById('class').value = student.class;
    document.getElementById('date').value = student.date;
    document.getElementById('gender').value = student.gender;
    document.getElementById('address').value = student.address;
    document.getElementById('course').value = student.course;

    // Lưu vị trí của học sinh đang được chỉnh sửa
    editIndex = index;

    // Hiển thị nút "Lưu" và ẩn nút "Thêm"
    document.getElementById('saveBtn').style.display = 'inline';
    document.getElementById('addBtn').style.display = 'none';
}

// Hàm để lưu thông tin đã chỉnh sửa
function saveStudent() {
    if (editIndex >= 0) {
        // Cập nhật dữ liệu học sinh
        dataStudents[editIndex].name = document.getElementById('name').value;
        dataStudents[editIndex].email = document.getElementById('email').value;
        dataStudents[editIndex].class = document.getElementById('class').value;
        dataStudents[editIndex].date = document.getElementById('date').value;
        dataStudents[editIndex].gender = document.getElementById('gender').value;
        dataStudents[editIndex].address = document.getElementById('address').value;
        dataStudents[editIndex].course = document.getElementById('course').value;

        // Hiển thị lại danh sách và đặt lại form
        displayStudents();
        resetForm();
    }
}

// Hàm để xóa dữ liệu trong ô input và đặt lại trạng thái
function resetForm() {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('class').value = '';
    document.getElementById('date').value = '';
    document.getElementById('gender').value = '';
    document.getElementById('address').value = '';
    document.getElementById('course').value = '';

    // Ẩn nút "Lưu" và hiện lại nút "Thêm"
    document.getElementById('saveBtn').style.display = 'none';
    document.getElementById('addBtn').style.display = 'block'
    editIndex = -1;
}


displayStudents();