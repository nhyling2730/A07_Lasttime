var username =  document.querySelector('#username');
var password =  document.querySelector('#password');
var form =  document.querySelector('form');

function showError(input, message){
    var formControl = input.parentElement
    formControl.className = 'input-box error'
    var span = formControl.querySelector('span')
    span.innerText = message
}

function showSuccess(input){
    var formControl = input.parentElement
    formControl.className = 'input-box success'
    var span = formControl.querySelector('span')
    span.innerText = ''
}

function checkEmptyError(listInput){
    let isEmptyError = false;
    listInput.forEach(input => {
        input.value = input.value.trim()
        if(!input.value){
            isEmptyError = true;
            showError(input, `${input.placeholder} không được để trống`)
        }
    });
    return isEmptyError;
}

function checkLengthErrorUsername (input, min, max){
    input.value = input.value.trim();
    if(input.value.length < min){
        showError(input, `Tên đăng nhập phải ít nhất ${min} ký tự`);
        return true;
    }
    if(input.value.length > max){
        showError(input, `Tên đăng nhập không được quá ${max} ký tự`);
        return true;
    }
    showSuccess(input);
    return false;
}

function checkLengthErrorPassword(input, min, max){
    input.value = input.value.trim();
    if(input.value.length < min){
        showError(input, `Mật khẩu phải có ít nhất ${min} ký tự`);
        return true;
    }
    if(input.value.length > max){
        showError(input, `Mật khẩu phải có tối đa ${max} ký tự`);
    }
    showSuccess(input);
    return false;
}

    function CheckUserData(){
        var usernameValue = username.value;
        var passwordValue = password.value;
    
        // Lấy dữ liệu từ localStorage
        var storedUser = JSON.parse(localStorage.getItem(usernameValue));

        console.log("Username:", usernameValue, "Password:", passwordValue);
        console.log("Stored User:", storedUser);

    
        if(!storedUser){
            const modalNoExist = document.querySelector('.modalNoExist');
            modalNoExist.classList.add('activeNoExist'); // Hiện modal không tồn tại
        } else if(usernameValue != storedUser.username || passwordValue != storedUser.password){
            const modalfail = document.querySelector('.modalFail');
            modalfail.classList.add('activefail'); // Hiện modal lỗi đăng nhập
        } else {
            const modalsuccess = document.querySelector('.modalSuccess');
            modalsuccess.classList.add('active'); // Hiện modal thành công
        }
    }

const login = document.querySelector('.form')
login.addEventListener('submit', function(e){
    let isPasswordLengthError = checkLengthErrorPassword(password, 6, 20);
    let isUserNameLengthError = checkLengthErrorUsername(username, 5, 20);
    let isEmptyError = checkEmptyError([username, password]);
    e.preventDefault();
    if( !isEmptyError && !isPasswordLengthError && !isUserNameLengthError){
        CheckUserData();
    }
})

document.addEventListener("DOMContentLoaded", function() {
    const searchToggle = document.querySelector(".searchToggle");
    const searchBox = document.querySelector(".search-bar");
    const searchInput = document.getElementById("search-input");
    const searchBoxButton = document.querySelector(".search-box button");
    const dropdownItems1 = document.querySelectorAll("#list .dropdown-list-item");
    const dropdownItems2 = document.querySelectorAll("#price-list .dropdown-list-item");
    const dropdownList1 = document.getElementById("list");
    const dropdownList2 = document.getElementById("price-list");
    const span1 = document.getElementById("span");
    const span2 = document.getElementById("price-span");

    let selectedText1 = "Tất cả";
    let selectedText2 = "Khoảng giá";

    searchToggle.addEventListener("click", () => {
        searchToggle.classList.toggle("active");
        const isActive = searchToggle.classList.contains("active");
        searchBox.style.display = isActive ? "flex" : "none";
    });

    function performSearch(e) {
        const query = searchInput.value.trim();

        if (query === "") {
            return;
        }

        searchToggle.classList.remove("active");
        searchBox.style.display = "none";

        span1.innerText = selectedText1;
        span2.innerText = selectedText2;

        console.log(`Tìm kiếm với từ khóa: ${query}`);
    }

    searchBoxButton.addEventListener("click", performSearch);

    searchInput.addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
            performSearch(e);
        }
    });

    const searchForm = document.querySelector(".search-form");
    searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const query = searchInput.value.trim();
        if (query) {
            window.location.href = `./user/search.html?query=${encodeURIComponent(query)}`;
        }
    });

    document.querySelector(".dropdown-bar1").addEventListener("click", (e) => {
        e.stopPropagation();
        dropdownList1.classList.toggle("show");
        dropdownList2.classList.remove("show");
    });

    document.querySelector(".dropdown-bar2").addEventListener("click", (e) => {
        e.stopPropagation();
        dropdownList2.classList.toggle("show");
        dropdownList1.classList.remove("show");
    });

    dropdownItems1.forEach((item) => {
        item.addEventListener("click", (e) => {
            selectedText1 = e.target.innerText;
            span1.innerText = selectedText1;
            updatePlaceholder();
            dropdownList1.classList.remove("show");
        });
    });

    dropdownItems2.forEach((item) => {
        item.addEventListener("click", (e) => {
            selectedText2 = e.target.innerText;
            span2.innerText = selectedText2;
            updatePlaceholder();
            dropdownList2.classList.remove("show");
        });
    });

    document.addEventListener("click", () => {
        dropdownList1.classList.remove("show");
        dropdownList2.classList.remove("show");
    });

    dropdownList1.addEventListener("click", (e) => e.stopPropagation());
    dropdownList2.addEventListener("click", (e) => e.stopPropagation());

    function updatePlaceholder() {
        searchInput.placeholder = `Tìm kiếm ${selectedText1}, ${selectedText2}`;
    }
});

function myMenuFunction() {
    var i = document.getElementById("headerMenu");
    if (i.classList.contains("responsive")) {
        i.classList.remove("responsive");
    } else {
        i.classList.add("responsive");
    }
}