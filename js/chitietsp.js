/* Kích cỡ */
document.addEventListener("DOMContentLoaded", function() {
    const priceElement = document.querySelector(".price");
    const sizeButtons = document.querySelectorAll(".size-btn");
    let basePrice = parseInt(priceElement.textContent.replace("đ", "").replace(/\./g, ""));

    // Hàm để cập nhật giá
    function updatePrice(size) {
        let newPrice = basePrice; // Bắt đầu với giá của size S
        if (size === "M") {
            newPrice += 5000; // Giá của size M
        } else if (size === "L") {
            newPrice += 7000; // Giá của size L
        }
        // Cập nhật giá hiển thị
        priceElement.textContent = newPrice.toLocaleString() + "đ";
    }

    // Lắng nghe sự kiện click trên các nút kích cỡ
    sizeButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            // Xóa lớp active khỏi tất cả các nút
            sizeButtons.forEach(function(btn) {
                btn.classList.remove("active");
            });

            // Thêm lớp active vào nút đã nhấn
            button.classList.add("active");

            // Cập nhật giá dựa trên kích cỡ đã chọn
            updatePrice(button.getAttribute("data-size"));
        });
    });
});

/* Số lượng */
document.addEventListener("DOMContentLoaded", function() {
    const decreaseBtn = document.getElementById('decrease');
    const increaseBtn = document.getElementById('increase');
    const quantityValue = document.getElementById('quantity-value');

    // Giảm số lượng
    decreaseBtn.addEventListener('click', function() {
        let currentValue = parseInt(quantityValue.value);
        if (currentValue > 1) {
            quantityValue.value = currentValue - 1;
        }
    });

    // Tăng số lượng
    increaseBtn.addEventListener('click', function() {
        let currentValue = parseInt(quantityValue.value);
        if (currentValue < 100) {
            quantityValue.value = currentValue + 1;
        }
    });

    // Giới hạn số lượng khi người dùng nhập trực tiếp
    quantityValue.addEventListener('input', function() {
        let value = parseInt(quantityValue.value);
        if (isNaN(value) || value < 1) {
            quantityValue.value = 1;
        } else if (value > 100) {
            quantityValue.value = 100;
        }
    });
});

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

/*-*/
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

