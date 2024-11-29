// document.addEventListener("DOMContentLoaded", function () {
//     const cartContainer = document.querySelector(".orders--items");
//     const cartQuantityElement = document.getElementById("cartQuantity");
//     const subtotalElement = document.getElementById("subtotal");
//     const totalElement = document.getElementById("total");
//     const cartItemCount = document.getElementById("cartItemCount");
//     const shippingFee = 10000; // Phí vận chuyển cố định
//     const cart = JSON.parse(localStorage.getItem("cart")) || [];
//     const modal = document.getElementById("custom-order-modal");
//     const closeModalBtn = document.getElementById("custom-close-order-modal");
//     const confirmYes = document.getElementById("custom-yes");
//     const confirmNo = document.getElementById("custom-no");
    

//     let currentIndexToDelete = null; // Lưu trữ sản phẩm cần xóa

//     // Hàm cập nhật tổng tiền và số lượng
//     function updateOrderSummary() {
//         let selectedItems = 0;
//         let subtotal = 0;

//         cart.forEach((item, index) => {
//             const checkbox = document.querySelector(`.item-select[data-index="${index}"]`);
//             if (checkbox && checkbox.checked) {
//                 selectedItems += item.quantity;
//                 subtotal += item.quantity * item.price; // Tính tổng tiền
//             }
//         });

//         subtotalElement.textContent = formatCurrency(subtotal);
//         totalElement.textContent = formatCurrency(subtotal + shippingFee);
//         cartItemCount.textContent = selectedItems;
//     }

//     // Hàm cập nhật tổng số lượng trên icon giỏ hàng
//     function updateCartQuantity() {
//         const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
//         cartQuantityElement.textContent = totalQuantity;
//         localStorage.setItem("cartQuantity", totalQuantity);
//     }

//     // Hàm hiển thị giỏ hàng
//     function renderCart() {
//         cartContainer.innerHTML = "";
//         cart.forEach((item, index) => {
//             cartContainer.innerHTML += `
// <div class="orders--items row">
//     <div class="orders--items-left col-2">
//         <div class="items--thumb">
//             <input type="checkbox" class="item-select" data-index="${index}" style="margin-bottom: 10px;">
//             <img src="${item.image}" alt="${item.name}">
//             <div class="product_qty">
//                 <form id="myform" method="POST" class="quantity row m-0" action="#">
//                     <button type="button" class="qtyminus minus" data-index="${index}">
//                         <i class="fas fa-minus"></i>
//                     </button>
//                     <input name="quantity" type="text" id="qty" value="${item.quantity}" class="text-center qty" disabled>
//                     <button type="button" class="qtyplus plus" data-index="${index}">
//                         <i class="fas fa-plus"></i>
//                     </button>
//                 </form>
//             </div>
//         </div>
//     </div>
//     <div class="orders--items-right col-10">
//         <div class="items--name">
//             <a href="${item.image}"><b>${item.name}</b></a>
//         </div>
//         <div class="items--size">Kích thước: <span>${item.size || "S"}</span></div>
//         <div class="items--price">Đơn giá: <span>${formatCurrency(item.price)}</span></div>
//         <div class="items--total">Tổng: <span>${formatCurrency(item.quantity * item.price)}</span></div>
//         <button class="items--remove" data-index="${index}">Xoá</button>
//     </div>
// </div>;`
//         });

//         // Thêm sự kiện cho checkbox
//         const checkboxes = document.querySelectorAll(".item-select");
//         checkboxes.forEach((checkbox) => {
//             checkbox.addEventListener("change", updateOrderSummary);
//         });

//         updateOrderSummary(); 
//     }

//     function openModal(index) {
//         currentIndexToDelete = index; 
//         modal.style.display = "block"; 
//     }    

//     function closeModal() {
//         modal.style.display = "none"; 
//         currentIndexToDelete = null; 
//     }
    

//     confirmYes.addEventListener("click", function () {
//         if (currentIndexToDelete !== null) {
//             cart.splice(currentIndexToDelete, 1); 
//             localStorage.setItem("cart", JSON.stringify(cart)); 
//             renderCart(); 
//             updateCartQuantity(); 
//         }
//         closeModal(); 
//     });
//     confirmNo.addEventListener("click", closeModal);
//     closeModalBtn.addEventListener("click", closeModal);
//     cartContainer.addEventListener("click", function (event) {
//         if (event.target.classList.contains("items--remove")) {
//             const index = parseInt(event.target.getAttribute("data-index")); 
//             openModal(index); // Hiển thị modal
//         }
//     });
//     cartContainer.addEventListener("click", function (event) {
//         const index = parseInt(event.target.getAttribute("data-index")); 
//         if (isNaN(index)) return;
    
//         // Tăng số lượng
//         if (event.target.classList.contains("qtyplus")) {
//             cart[index].quantity++; 
//             const quantityInput = event.target.parentElement.querySelector("input");
//             quantityInput.value = cart[index].quantity; 
//         }
    
//         // Giảm số lượng
//         else if (event.target.classList.contains("qtyminus")) {
//             if (cart[index].quantity > 1) { 
//                 cart[index].quantity--;
//                 const quantityInput = event.target.parentElement.querySelector("input"); 
//                 quantityInput.value = cart[index].quantity; 
//             }
//         }
    
//         else if (event.target.classList.contains("items--remove")) {
//             openModal(index); 
//             return;
//         }
//         localStorage.setItem("cart", JSON.stringify(cart));
    
//         updateOrderSummary(); 
//     });

    
//         // Xử lý nút "Đặt hàng"
//         checkoutButton.addEventListener("click", function (event) {
//             if (!isAnyItemSelected()) {
//                 alert("Vui lòng chọn ít nhất một sản phẩm trước khi đặt hàng!");
//                 event.preventDefault(); // Ngăn không chuyển trang
//                 return;
//             }
    
//             // Nếu có sản phẩm được chọn, tiếp tục chuyển sang trang thanh toán
//             window.location.href = "./payment.html"; // Đường dẫn trang thanh toán
//         });
    
//         renderCart();
//         updateCartQuantity();
//     });
    

//------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
    const cartContainer = document.querySelector(".orders--items");
    const cartQuantityElement = document.getElementById("cartQuantity");
    const subtotalElement = document.getElementById("subtotal");
    const totalElement = document.getElementById("total");
    const cartItemCount = document.getElementById("cartItemCount");
    const shippingFee = 10000; // Phí vận chuyển cố định
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const modal = document.getElementById("custom-order-modal");
    const closeModalBtn = document.getElementById("custom-close-order-modal");
    const confirmYes = document.getElementById("custom-yes");
    const confirmNo = document.getElementById("custom-no");

    let currentIndexToDelete = null; // Lưu trữ sản phẩm cần xóa

    // Hàm định dạng tiền
    function formatCurrency(amount) {
        return `${amount.toLocaleString()} VNĐ`;
    }

    // Hàm cập nhật tổng tiền và số lượng
    function updateOrderSummary() {
        let selectedItems = 0;
        let subtotal = 0;

        cart.forEach((item, index) => {
            const checkbox = document.querySelector(`.item-select[data-index="${index}"]`);
            if (checkbox && checkbox.checked) {
                selectedItems += item.quantity;
                subtotal += item.quantity * item.price; // Tính tổng tiền
            }
        });

        subtotalElement.textContent = formatCurrency(subtotal);
        totalElement.textContent = formatCurrency(subtotal + shippingFee);
        cartItemCount.textContent = selectedItems;
    }

    // Hàm cập nhật tổng số lượng trên icon giỏ hàng
    function updateCartQuantity() {
        const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartQuantityElement.textContent = totalQuantity;
        localStorage.setItem("cartQuantity", totalQuantity);
    }

    // Hàm hiển thị giỏ hàng
    function renderCart() {
        cartContainer.innerHTML = "";
        cart.forEach((item, index) => {
            cartContainer.innerHTML += `
<div class="orders--items row">
    <div class="orders--items-left col-2">
        <div class="items--thumb">
            <input type="checkbox" class="item-select" data-index="${index}" style="margin-bottom: 10px;">
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

        // Thêm sự kiện cho checkbox
        const checkboxes = document.querySelectorAll(".item-select");
        checkboxes.forEach((checkbox) => {
            checkbox.addEventListener("change", updateOrderSummary);
        });

        updateOrderSummary();
    }

    function openModal(index) {
        currentIndexToDelete = index;
        modal.style.display = "block";
    }

    function closeModal() {
        modal.style.display = "none";
        currentIndexToDelete = null;
    }


    confirmYes.addEventListener("click", function () {
        if (currentIndexToDelete !== null) {
            cart.splice(currentIndexToDelete, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            renderCart();
            updateCartQuantity();
        }
        closeModal();
    });
    confirmNo.addEventListener("click", closeModal);
    closeModalBtn.addEventListener("click", closeModal);
    cartContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("items--remove")) {
            const index = parseInt(event.target.getAttribute("data-index"));
            openModal(index); // Hiển thị modal
        }
    });
    cartContainer.addEventListener("click", function (event) {
        const index = parseInt(event.target.getAttribute("data-index"));
        if (isNaN(index)) return;

        // Tăng số lượng
        if (event.target.classList.contains("qtyplus")) {
            cart[index].quantity++;
            const quantityInput = event.target.parentElement.querySelector("input");
            quantityInput.value = cart[index].quantity;
        }

        // Giảm số lượng
        else if (event.target.classList.contains("qtyminus")) {
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
                const quantityInput = event.target.parentElement.querySelector("input");
                quantityInput.value = cart[index].quantity;
            }
        }

        else if (event.target.classList.contains("items--remove")) {
            openModal(index);
            return;
        }
        localStorage.setItem("cart", JSON.stringify(cart));

        updateOrderSummary();
    });

    // Xử lý nút "Đặt hàng"
    checkoutButton.addEventListener("click", function (event) {
        if (!isAnyItemSelected()) {
            alert("Vui lòng chọn ít nhất một sản phẩm trước khi đặt hàng!");
            event.preventDefault(); 
            return;
        }


        window.location.href = "./payment.html"; 
    });

    renderCart();
    updateCartQuantity();

});
