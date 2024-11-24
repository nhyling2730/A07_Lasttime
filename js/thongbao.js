document.addEventListener("DOMContentLoaded", () => {
    const customOrderModal = document.getElementById('custom-order-modal');
    const customCloseOrderModal = document.getElementById('custom-close-order-modal');
    const customContinueShoppingBtn = document.getElementById('custom-continue-shopping-btn');
    const customGoToCartBtn = document.getElementById('custom-go-to-cart-btn');

    const cartCount = document.getElementById('cart-count');

    const buyNowButtons = document.querySelectorAll('.buy-now');

    let cartQuantity = parseInt(localStorage.getItem('cartQuantity')) || 0;
    cartCount.textContent = cartQuantity; 

    buyNowButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            console.log("Nút Đặt mua được nhấn!"); 
            customOrderModal.style.display = 'block';
            cartQuantity++;
            cartCount.textContent = cartQuantity;
            localStorage.setItem('cartQuantity', cartQuantity);
        });
    });

    customCloseOrderModal.addEventListener('click', () => {
        customOrderModal.style.display = 'none';
    });

    customContinueShoppingBtn.addEventListener('click', () => {
        customOrderModal.style.display = 'none';
    });

    customGoToCartBtn.addEventListener('click', () => {
        customOrderModal.style.display = 'none';
        window.location.href = '../cart.html';
    });
    window.addEventListener('click', (event) => {
        if (event.target === customOrderModal) {
            customOrderModal.style.display = 'none';
        }
    });
});
