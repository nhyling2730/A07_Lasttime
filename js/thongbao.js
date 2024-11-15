document.addEventListener("DOMContentLoaded", function() {
    const loginModal = document.getElementById("login-modal");
    const closeModalButton = document.getElementById("close-modal");

    // Lắng nghe sự kiện click trên tất cả các nút "Đặt mua" (mỗi nút có class 'buy-now')
    document.body.addEventListener("click", function(event) {
        // Kiểm tra nếu phần tử được click có class "buy-now"
        if (event.target && event.target.classList.contains("buy-now")) {
            loginModal.style.display = "flex"; // Hiển thị modal
        }
    });

    // Đóng modal khi click vào nút đóng
    closeModalButton.addEventListener("click", function() {
        loginModal.style.display = "none"; // Ẩn modal khi bấm nút đóng
    });

    // Đóng modal khi click ra ngoài modal
    window.addEventListener("click", function(event) {
        if (event.target == loginModal) {
            loginModal.style.display = "none"; // Ẩn modal khi bấm ra ngoài modal
        }
    });
});
