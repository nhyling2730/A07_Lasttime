/**
 * Đồng bộ số lượng giỏ hàng trên biểu tượng giỏ hàng.
 */
function syncCartQuantity() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Cập nhật số lượng hiển thị trên phần tử #cartQuantity
    const cartQuantityElement = document.getElementById("cartQuantity");
    if (cartQuantityElement) {
        cartQuantityElement.textContent = totalQuantity || 0; // Hiển thị "0" nếu không có sản phẩm
    }
}

// Gọi hàm khi trang được tải
document.addEventListener("DOMContentLoaded", syncCartQuantity);

/**
 * Gọi hàm này bất cứ khi nào giỏ hàng thay đổi (thêm, xóa, cập nhật số lượng).
 */
function updateCart() {
    syncCartQuantity();
    // Thêm các logic khác nếu cần, ví dụ lưu lại giỏ hàng:
    // localStorage.setItem("cart", JSON.stringify(cart));
}
