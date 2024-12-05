/**
 * Đồng bộ số lượng sản phẩm trên biểu tượng giỏ hàng.
 */
function syncCartQuantity() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Tìm và cập nhật tất cả các phần tử hiển thị số lượng giỏ hàng
    document.querySelectorAll("#cartQuantity, .cart-quantity").forEach(element => {
        element.textContent = totalQuantity > 0 ? totalQuantity : 0;
    });
}

/**
 * Gọi hàm này sau khi cập nhật giỏ hàng (thêm, xóa, tăng, giảm số lượng).
 */
function updateCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart)); // Lưu trạng thái giỏ hàng vào localStorage
    syncCartQuantity(); // Đồng bộ hiển thị số lượng giỏ hàng trên mọi trang
}
