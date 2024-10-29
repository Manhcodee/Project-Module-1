// Hàm để chỉnh sửa một học sinh
function editStudent(index) {
    const container = document.querySelector('.container');
    container.style.marginTop = (container.style.marginTop === "0px") ? "80px": "80px";

    //scroll khi nhấn vào nút
    document.querySelector('.add_student').scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });

    const student = dataStudents[index];

    // Điền thông tin học sinh vào các ô input
    document.getElementById('name').value = student.name;
    document.getElementById('email').value = student.email;
    document.getElementById('class').value = student.class;

    // Định dạng ngày từ dd/mm/yyyy sang yyyy-mm-dd để hiển thị trong input
    const [day, month, year] = student.date.split("/");
    document.getElementById('date').value = `${year}-${month}-${day}`;

    // Đặt giá trị giới tính
    document.getElementById('gender').value = student.gender;

    // Đặt giá trị thành phố và cập nhật danh sách quận
    document.getElementById('city').value = student.city;
    updateDistrictOptions();  // Cập nhật danh sách quận dựa trên thành phố đã chọn
    document.getElementById('district').value = student.district;

    // Điền giá trị khóa học
    document.getElementById('course').value = student.course;

    // Cập nhật vị trí của học sinh đang chỉnh sửa
    editIndex = index;

    // Hiển thị nút "Lưu" và ẩn nút "Thêm"
    document.getElementById('saveBtn').style.display = 'block';
    document.getElementById('addBtn').style.display = 'none';
}

// Hàm để lưu thông tin đã chỉnh sửa
function saveStudent() {
    if (editIndex >= 0) {
        dataStudents[editIndex].name = document.getElementById('name').value;
        dataStudents[editIndex].email = document.getElementById('email').value;
        dataStudents[editIndex].class = document.getElementById('class').value;
        dataStudents[editIndex].date = formatDate(document.getElementById('date').value);
        dataStudents[editIndex].gender = document.getElementById('gender').value;

        const district = document.getElementById('district').value;
        const city = document.getElementById('city').value;
        dataStudents[editIndex].district = district;
        dataStudents[editIndex].city = city;

        dataStudents[editIndex].course = document.getElementById('course').value;

        saveToLocalStorage(); // Lưu mảng vào json
        displayStudents(dataStudents);
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
    document.getElementById('city').value = '';
    document.getElementById('district').innerHTML = '<option value="">Chọn huyện/quận</option>';
    document.getElementById('course').value = '';

    document.getElementById('saveBtn').style.display = 'none';
    document.getElementById('addBtn').style.display = 'block';
    editIndex = -1;
}
