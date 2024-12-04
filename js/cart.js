document.addEventListener("DOMContentLoaded", function () {
    const cartContainer = document.querySelector(".orders--items");
    const cartQuantityElement = document.getElementById("cartQuantity");
    const subtotalElement = document.getElementById("subtotal");
    const totalElement = document.getElementById("total");
    const cartItemCount = document.getElementById("cartItemCount");
    const shippingFee = 10000; // Phí vận chuyển cố định
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const modal = document.getElementById("custom-order-modal");
    const closeModalBtn = document.getElementById("custom-close-order-modal");
    const confirmYes = document.getElementById("custom-yes");
    const confirmNo = document.getElementById("custom-no");

    let currentIndexToDelete = null; // Lưu trữ sản phẩm cần xóa

    // Hàm định dạng tiền tệ
    function formatCurrency(amount) {
        return `${amount.toLocaleString()} VNĐ`;
    }

    // Hàm cập nhật tổng tiền và số lượng
    function updateOrderSummary() {
        let subtotal = 0;

        cart.forEach(item => {
            subtotal += item.quantity * item.price; // Tổng tiền các sản phẩm
        });

        subtotalElement.textContent = formatCurrency(subtotal);
        totalElement.textContent = formatCurrency(subtotal + shippingFee); // Tổng tiền bao gồm phí vận chuyển
        cartItemCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0); // Tổng số lượng
    }
    
    function updateCartQuantity() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0); // Tính tổng số lượng
        const cartQuantityElement = document.getElementById("cartQuantity");
    
        if (cartQuantityElement) {
            cartQuantityElement.textContent = totalQuantity; // Hiển thị số lượng trên icon
        }
    }
    
    

    // Hàm hiển thị giỏ hàng
    function renderCart() {
        cartContainer.innerHTML = "";

        if (cart.length === 0) {
            cartContainer.innerHTML = "<p>Giỏ hàng trống</p>";
            updateOrderSummary();
            return;
        }

        cart.forEach((item, index) => {
            cartContainer.innerHTML += `
            <div class="orders--items row">
    <div class="orders--items-left col-2">
        <div class="items--thumb">
            <img src="${item.image}" alt="${item.name}">
            <div class="product_qty">
                <form id="myform" method="POST" class="quantity row m-0" action="#">
                    <button type="button" class="qtyminus minus" data-index="${index}">
                        <i class="fas fa-minus"></i>
                    </button>
                    <input name="quantity" type="text" id="qty" value="${item.quantity}" class="text-center qty" disabled>
                    <button type="button" class="qtyplus plus" data-index="${index}">
                        <i class="fas fa-plus"></i>
                    </button>
                </form>
            </div>
        </div>
    </div>
    <div class="orders--items-right col-10">
        <div class="items--name">
            <a href="${item.image}"><b>${item.name}</b></a>
        </div>
        <div class="items--size">Kích thước: <span>${item.size || "S"}</span></div>
        <div class="items--price">Đơn giá: <span>${formatCurrency(item.price)}</span></div>
        <div class="items--total">Tổng: <span>${formatCurrency(item.quantity * item.price)}</span></div>
        <button class="items--remove" data-index="${index}">Xoá</button>
    </div>
</div>`;
        });

        updateOrderSummary();
    }

    // Hàm mở modal xác nhận xóa
    function openModal(index) {
        currentIndexToDelete = index;
        modal.style.display = "block";
    }

    // Hàm đóng modal
    function closeModal() {
        modal.style.display = "none";
        currentIndexToDelete = null;
    }

    // Xử lý xóa sản phẩm
    confirmYes.addEventListener("click", function () {
        if (currentIndexToDelete !== null) {
            cart.splice(currentIndexToDelete, 1); // Xóa sản phẩm khỏi mảng
            localStorage.setItem("cart", JSON.stringify(cart)); // Lưu lại giỏ hàng vào localStorage
            renderCart();
            updateCartQuantity();
        }
        closeModal();
    });

    confirmNo.addEventListener("click", closeModal);
    closeModalBtn.addEventListener("click", closeModal);

    cartContainer.addEventListener("click", function (event) {
        const index = parseInt(event.target.getAttribute("data-index"));
        if (isNaN(index)) return;
    
        if (event.target.classList.contains("qtyplus")) {
            cart[index].quantity+=1;
        } else if (event.target.classList.contains("qtyminus")) {
            if (cart[index].quantity > 1) {
                cart[index].quantity-=1;
            }
        } else if (event.target.classList.contains("items--remove")) {
            cart.splice(index, 1); // Xóa sản phẩm
        }
    
        localStorage.setItem("cart", JSON.stringify(cart)); // Cập nhật giỏ hàng trong localStorage
        renderCart(); // Hiển thị lại giỏ hàng
        updateCartQuantity(); // Cập nhật số lượng trên icon giỏ hàng
    });
    
    renderCart();
    updateCartQuantity();
        
});
