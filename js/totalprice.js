document.addEventListener('DOMContentLoaded', function () {
    // Lấy tất cả các phần tử có lớp .qtyminus và .qtyplus
    const minusButtons = document.querySelectorAll('.qtyminus');
    const plusButtons = document.querySelectorAll('.qtyplus');

    // Xử lý khi nhấn nút trừ
    minusButtons.forEach(button => {
        button.addEventListener('click', function () {
            const quantityInput = this.nextElementSibling;
            let quantity = parseInt(quantityInput.value);
            if (quantity > 1) {
                quantity--;
                quantityInput.value = quantity;
                updateTotal(this);
            }
        });
    });

    // Xử lý khi nhấn nút cộng
    plusButtons.forEach(button => {
        button.addEventListener('click', function () {
            const quantityInput = this.previousElementSibling;
            let quantity = parseInt(quantityInput.value);
            quantity++;
            quantityInput.value = quantity;
            updateTotal(this);
        });
    });

    // Hàm cập nhật tổng giá cho sản phẩm khi thay đổi số lượng
    function updateTotal(button) {
        const cartItem = button.closest('.orders--items'); // Lấy phần tử chứa thông tin sản phẩm
        const unitPrice = parseInt(cartItem.querySelector('.items--price span').textContent.replace(/₫|,/g, ''));
        const quantity = parseInt(cartItem.querySelector('.quantity input').value);
        const totalPrice = unitPrice * quantity;
        
        // Cập nhật giá tổng cho sản phẩm hiện tại
        cartItem.querySelector('.items--total span').textContent = totalPrice.toLocaleString() + '₫';

        // Gọi hàm để cập nhật tổng tiền giỏ hàng (nếu cần)
        updateCartTotal();
    }

    // Hàm tính tổng tiền giỏ hàng
    function updateCartTotal() {
        const totalElements = document.querySelectorAll('.items--total span');
        let totalCart = 0;
        totalElements.forEach(element => {
            totalCart += parseInt(element.textContent.replace(/₫|,/g, ''));
        });
        document.querySelector('.temp--money span').textContent = totalCart.toLocaleString() + '₫';
        
        const shippingFee = 2000; // Phí vận chuyển cố định
        document.querySelector('.into--money span').textContent = (totalCart + shippingFee).toLocaleString() + '₫';
    }
});

// giỏ hàng
// Giả sử đây là mảng lưu thông tin các sản phẩm trong giỏ hàng
let cartItems = [
    { id: 1, name: "Phin Sữa Đá", quantity: 2 },
    { id: 2, name: "Trà Sen Vàng", quantity: 1 },
    { id: 3, name: "Freeze Trà Xanh", quantity: 1 }
];

// Hàm cập nhật số lượng hiển thị trên biểu tượng giỏ hàng
function updateCartQuantity() {
    // Tính tổng số lượng sản phẩm trong giỏ hàng
    let totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

    // Hiển thị số lượng lên biểu tượng giỏ hàng
    document.getElementById("cartQuantity").textContent = totalQuantity;
}

// Hàm cập nhật giỏ hàng trên giao diện
function updateCartDisplay() {
    let cartDisplay = document.getElementById("cartItemsDisplay");
    cartDisplay.innerHTML = ""; // Xóa hết các sản phẩm cũ trong giỏ hàng

    cartItems.forEach(item => {
        // Tạo phần tử hiển thị sản phẩm trong giỏ hàng
        let itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item");
        itemDiv.innerHTML = `
            <span>${item.name}</span>
            <span>Số lượng: ${item.quantity}</span>
            <button onclick="increaseQuantity(${item.id})">Tăng</button>
            <button onclick="decreaseQuantity(${item.id})">Giảm</button>
        `;
        cartDisplay.appendChild(itemDiv);
    });
}

// Gọi hàm này mỗi khi có thay đổi trong giỏ hàng
updateCartQuantity();
updateCartDisplay();

// Hàm xử lý khi người dùng bấm nút tăng số lượng sản phẩm
function increaseQuantity(productId) {
    let product = cartItems.find(item => item.id === productId);
    if (product) {
        product.quantity += 1; // Tăng số lượng sản phẩm
        updateCartQuantity(); // Cập nhật số lượng trên biểu tượng giỏ hàng
        updateCartDisplay();  // Cập nhật lại giỏ hàng trên giao diện
    }
}

// Hàm xử lý khi người dùng bấm nút giảm số lượng sản phẩm
function decreaseQuantity(productId) {
    let product = cartItems.find(item => item.id === productId);
    if (product && product.quantity > 1) {
        product.quantity -= 1; // Giảm số lượng sản phẩm
        updateCartQuantity(); // Cập nhật số lượng trên biểu tượng giỏ hàng
        updateCartDisplay();  // Cập nhật lại giỏ hàng trên giao diện
    }
}

// Hàm thêm sản phẩm vào giỏ hàng
function addProductToCart(id, name, quantity) {
    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    let existingProduct = cartItems.find(item => item.id === id);
    
    if (existingProduct) {
        // Nếu có, tăng số lượng sản phẩm
        existingProduct.quantity += quantity;
    } else {
        // Nếu chưa, thêm sản phẩm mới vào giỏ hàng
        cartItems.push({ id: id, name: name, quantity: quantity });
    }
    
    // Cập nhật lại giao diện
    updateCartQuantity();
    updateCartDisplay();
}

// Ví dụ: Thêm sản phẩm mới
addProductToCart(3, "Cà Phê Sữa", 1); // Thêm sản phẩm mới vào giỏ hàng

