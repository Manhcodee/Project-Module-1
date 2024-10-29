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