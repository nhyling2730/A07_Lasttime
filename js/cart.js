document.addEventListener('DOMContentLoaded', function () {
    var orderButtons = document.querySelectorAll('.btn.btn-primary');
    var cartCountElement = document.getElementById('cart-count');
    var cartCount = 0;
    var notification = document.getElementById('notification');

    orderButtons.forEach(function (button) {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            cartCount++;
            cartCountElement.textContent = cartCount;
            notification.style.display = 'block';
            setTimeout(function () {
                notification.style.display = 'none';
            }, 2000); // Ẩn thông báo sau 2 giây
        });
    });
});
