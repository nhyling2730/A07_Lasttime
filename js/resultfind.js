/* Phân trang */
const productsPerPage = 4;
let currentPage = 1;

// Lấy danh sách sản phẩm và tính số trang
const productList = document.querySelector(".product-grid");
const products = Array.from(productList.getElementsByClassName("mon"));
const totalPages = Math.ceil(products.length / productsPerPage);

function displayPage(page) {
    const start = (page - 1) * productsPerPage;
    const end = start + productsPerPage;

    products.forEach((product, index) => {
        product.style.display = index >= start && index < end ? "block" : "none";
    });

    updatePagination();
}

function updatePagination() {
    // Cập nhật trạng thái của số trang
    document.querySelectorAll(".pagination li").forEach((li) => {
        li.classList.toggle("active", parseInt(li.textContent) === currentPage);
    });

    // Vô hiệu hóa nút chuyển trang khi ở trang đầu tiên hoặc cuối cùng
    const prevButton = document.querySelector(".page1");
    const nextButton = document.querySelector(".page2");

    prevButton.style.pointerEvents = currentPage === 1 ? "none" : "auto";
    prevButton.style.opacity = currentPage === 1 ? "0.5" : "1";

    nextButton.style.pointerEvents = currentPage === totalPages ? "none" : "auto";
    nextButton.style.opacity = currentPage === totalPages ? "0.5" : "1";
}

// Sự kiện khi nhấp vào phân trang
document.querySelector(".pagination").addEventListener("click", (e) => {
    const clickedElement = e.target.closest("li");

    if (clickedElement.classList.contains("page1") && currentPage > 1) {
        currentPage--;
    } else if (clickedElement.classList.contains("page2") && currentPage < totalPages) {
        currentPage++;
    } else if (!isNaN(clickedElement.textContent)) {
        currentPage = parseInt(clickedElement.textContent);
    }
    displayPage(currentPage);
});

// Khởi tạo hiển thị trang đầu tiên
displayPage(currentPage);

/* - */
document.addEventListener("DOMContentLoaded", function() {
    const addToCartButton = document.querySelector(".btn-add-to-cart");
    const orderButtons = document.querySelectorAll(".btn-primary"); // Lấy tất cả các nút Đặt mua
    const loginModal = document.getElementById("login-modal");
    const closeModalButton = document.getElementById("close-modal");

    function showModal() {
        loginModal.style.display = "flex";
    }

    if (addToCartButton) {
        addToCartButton.addEventListener("click", showModal);
    }

    orderButtons.forEach(button => {
        button.addEventListener("click", showModal);
    });

    closeModalButton.addEventListener("click", function() {
        loginModal.style.display = "none"; 
    });

    window.addEventListener("click", function(event) {
        if (event.target === loginModal) {
            loginModal.style.display = "none";
        }
    });
});