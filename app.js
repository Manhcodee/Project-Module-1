const tableTbody = document.querySelector('#students-table tbody');
let editIndex = -1;

// Kiểm tra dữ liệu JSON trong localStorage, nếu không có thì khởi tạo mảng trống
let dataStudents = JSON.parse(localStorage.getItem('datas')) || [];

// Hàm lưu dữ liệu JSON vào localStorage
function saveToLocalStorage() {
    localStorage.setItem('datas', JSON.stringify(dataStudents));
}

// cập nhật các quận huyện
function updateDistrictOptions() {
    const city = document.getElementById('city').value;
    const districtSelect = document.getElementById('district');

    districtSelect.innerHTML = '<option value="">Chọn huyện/quận</option>'; // Reset danh sách huyện/quận

    // Thêm các quận/huyện dựa vào thành phố được chọn
    let districts = [];
    if (city === 'Hanoi') {
        districts = ['Ba Đình', 'Hoàn Kiếm', 'Hai Bà Trưng', 'Đống Đa', 'Cầu Giấy'];
    } else if (city === 'HCMC') {
        districts = ['Quận 1', 'Quận 2', 'Quận 3', 'Quận 7', 'Thủ Đức'];
    }

    districts.forEach(district => {
        const option = document.createElement('option');
        option.value = district;
        option.textContent = district;
        districtSelect.appendChild(option);
    });
}

// Hàm định dạng ngày thành dd/mm/yyyy
function formatDate(date) {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
}

// Hiển thị danh sách học sinh từ localStorage nếu có
function displayStudents(students = dataStudents, page = 1) {
    tableTbody.innerHTML = '';

    //tìm kiếm fail
    if (students.length === 0) {
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
            <td>${student.district},${student.city}</td>
            <td>${student.email}</td>
            <td>${student.course}</td>
            <td>
                <button class="btn" onclick="editStudent(${index})">Sửa</button>
                <button class="btn btn_del" onclick="removeStudent(${index})">Xóa</button>
            </td>
        `;
        tableTbody.appendChild(row);
    });
}

// Hàm kiểm tra tính hợp lệ của email
function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

displayStudents();
