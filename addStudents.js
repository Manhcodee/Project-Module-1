// Hàm thêm dữ liệu
function addStudent() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const classId = document.getElementById('class').value;
    const date = document.getElementById('date').value;
    const gender = document.getElementById('gender').value;
    const city = document.getElementById('city').value;
    const district = document.getElementById('district').value;
    const address = `${district}, ${city}`;
    const course = document.getElementById('course').value;

    if (name && classId && validateEmail(email)) {
        const newStudent = {
            id: dataStudents.length + 1,
            name: name,
            email: email,
            class: classId,
            city: city,
            district: district,
            course: course,
            date: formatDate(date),
            gender: gender,
        };

        dataStudents.push(newStudent);
        saveToLocalStorage(); // lưu vào json
        displayStudents(); // cập nập lại ds
        resetForm(); // đặt lại các ô input thành trống
    } else {
        alert('Vui lòng nhập đúng tên, lớp và email');
    }
}

displayStudents();

// Hàm xóa học sinh
function removeStudent(index) {
    if (confirm("Bạn có chắc chắn muốn xóa không?")) {
        dataStudents.splice(index, 1);
        saveToLocalStorage();
        displayStudents();
    }
}