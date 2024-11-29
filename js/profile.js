function setActive(elementId) {
    document.querySelectorAll('.sidebar-item').forEach(item => item.classList.remove('active'));
    
    document.getElementById(elementId).classList.add('active');
}

function showProfile() {
    setActive('profile');
    document.getElementById('profile-details').style.display = 'block';
    document.getElementById('address-details').style.display = 'none';
    document.getElementById('change-password-details').style.display = 'none'; 
    document.getElementById('order-history-details').style.display = 'none';
}

function showAddress() {
    setActive('address');
    document.getElementById('profile-details').style.display = 'none';
    document.getElementById('address-details').style.display = 'block';
    document.getElementById('change-password-details').style.display = 'none'; 
    document.getElementById('order-history-details').style.display = 'none';
}

function showChangePassword() {
    setActive('changePassword');
    document.getElementById('profile-details').style.display = 'none';
    document.getElementById('address-details').style.display = 'none';
    document.getElementById('change-password-details').style.display = 'block';
    document.getElementById('order-history-details').style.display = 'none';
}

function showOrderHistory() {
    setActive('order-history'); 
    document.getElementById('profile-details').style.display = 'none';
    document.getElementById('address-details').style.display = 'none';
    document.getElementById('change-password-details').style.display = 'none';
    document.getElementById('order-history-details').style.display = 'block';
}

function showOtherOption() {
    alert('Chức năng cài đặt khác sẽ được triển khai sau.');
}

const updateBtns = document.querySelectorAll(".btn-edit");
const addNewBtn = document.getElementById("updateBtn"); 
const modalPopup = document.getElementById("addressModalPopup");
const cancelBtn = document.getElementById("cancelBtn"); 

function showModal() {
    modalPopup.style.display = "flex";
}

function hideModal() {
    modalPopup.style.display = "none";
}

updateBtns.forEach((btn) => {
    btn.addEventListener("click", showModal);
});

addNewBtn.addEventListener("click", showModal);

cancelBtn.addEventListener("click", hideModal);

window.addEventListener("click", (event) => {
    if (event.target === modalPopup) {
        hideModal();
    }
});


const buttons = document.querySelectorAll('.address-type-btn');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        buttons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
    });
});



// // Hàm để hiển thị hoặc ẩn bảng chi tiết của đơn hàng
// function toggleOrderDetails(event) {
//     const orderItem = event.target.closest('.order-item');  // Lấy phần tử .order-item cha của .order-product
//     const orderDetails = orderItem.querySelector('.order-details-table');  // Lấy bảng chi tiết đơn hàng

//     // Chuyển đổi trạng thái hiển thị của bảng chi tiết đơn hàng
//     if (orderDetails.style.display === 'none' || !orderDetails.style.display) {
//         orderDetails.style.display = 'block';  // Hiển thị bảng chi tiết
//     } else {
//         orderDetails.style.display = 'none';  // Ẩn bảng chi tiết
//     }
// }

// // Thêm sự kiện click cho tất cả các phần tử .order-product
// const orderProducts = document.querySelectorAll('.order-product');
// orderProducts.forEach(product => {
//     product.addEventListener('click', toggleOrderDetails);
// });

// Hàm để hiển thị hoặc ẩn bảng chi tiết của đơn hàng
function toggleOrderDetails(event) {
    const orderItem = event.target.closest('.order-item');  // Lấy phần tử .order-item cha của .order-product
    const orderDetails = orderItem.querySelector('.order-details-table');  // Lấy bảng chi tiết đơn hàng

    // Chuyển đổi trạng thái hiển thị của bảng chi tiết đơn hàng
    if (orderDetails.style.display === 'none' || !orderDetails.style.display) {
        orderDetails.style.display = 'block';  // Hiển thị bảng chi tiết
    } else {
        orderDetails.style.display = 'none';  // Ẩn bảng chi tiết
    }

    // Khi nhấn vào sản phẩm trong đơn hàng, làm mục "Đơn mua" active
    setOrderHistoryActive();
}

// Thêm sự kiện click cho tất cả các phần tử .order-product
const orderProducts = document.querySelectorAll('.order-product');
orderProducts.forEach(product => {
    product.addEventListener('click', toggleOrderDetails);
});
