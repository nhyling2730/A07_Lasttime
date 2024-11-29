function setActive(elementId) {
    document.querySelectorAll('.sidebar-item').forEach(item => item.classList.remove('active'));
    
    document.getElementById(elementId).classList.add('active');
}

function showProfile() {
    setActive('profile');
    document.getElementById('profile-details').style.display = 'block';
    document.getElementById('address-details').style.display = 'none';
    document.getElementById('change-password-details').style.display = 'none'; 
}

function showAddress() {
    setActive('address');
    document.getElementById('profile-details').style.display = 'none';
    document.getElementById('address-details').style.display = 'block';
    document.getElementById('change-password-details').style.display = 'none'; 
}

function showChangePassword() {
    setActive('changePassword');
    document.getElementById('profile-details').style.display = 'none';
    document.getElementById('address-details').style.display = 'none';
    document.getElementById('change-password-details').style.display = 'block';
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
