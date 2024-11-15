/* nav mav-menu khi thu nhỏ */
document.querySelector('.toggle').addEventListener('click', function() {
  const navMenu = document.querySelector('.nav-menu');
  const faBars = document.querySelector('.fa-bars');
  const faXmark = document.querySelector('.fa-xmark');

  // Chuyển đổi giữa hiển thị menu và ẩn menu
  navMenu.classList.toggle('show');  // Mở/đóng menu

  // Chuyển đổi giữa các biểu tượng fa-bars và fa-xmark
  faBars.classList.toggle('active');
  faXmark.classList.toggle('active');
});

function toggleSubMenu(subMenuId) {
  const allSubMenus = document.querySelectorAll('.sub-menu');
  allSubMenus.forEach(menu => {
      if (menu.id !== subMenuId) {
          menu.style.display = 'none'; // Ẩn tất cả các sub-menu khác khi mở một sub-menu
      }
  });
  
  const subMenu = document.getElementById(subMenuId);
  // Kiểm tra và thay đổi trạng thái hiển thị của sub-menu
  if (subMenu.style.display === 'flex') {
      subMenu.style.display = 'none'; // Nếu sub-menu đang hiển thị, ẩn nó
  } else {
      subMenu.style.display = 'flex'; // Nếu sub-menu đang ẩn, hiển thị nó
  }
}

// Sự kiện cho các dropdown khi nhấp vào trên màn hình nhỏ
document.querySelectorAll('.nav-menu .dropdown > a').forEach(item => {
  item.addEventListener('click', function(event) {
      event.preventDefault(); // Ngăn không cho link làm mới trang
      const subMenuId = item.nextElementSibling.id; // Lấy id của sub-menu tương ứng
      toggleSubMenu(subMenuId); // Gọi hàm toggle để hiển thị hoặc ẩn sub-menu
  });
});

/* tìm kiếm */
document.addEventListener("DOMContentLoaded", function () {
  const searchToggle = document.querySelector(".searchToggle");
  const searchBox = document.querySelector(".search-bar");
  const searchInput = document.getElementById("search-input");
  const searchBoxButton = document.querySelector(".search-box button");
  const dropdownItems1 = document.querySelectorAll("#list .dropdown-list-item");
  const dropdownItems2 = document.querySelectorAll(
    "#price-list .dropdown-list-item"
  );
  const dropdownList1 = document.getElementById("list");
  const dropdownList2 = document.getElementById("price-list");
  const span1 = document.getElementById("span");
  const span2 = document.getElementById("price-span");

  let selectedText1 = "Tất cả";
  let selectedText2 = "Khoảng giá";

  searchToggle.addEventListener("click", () => {
    searchToggle.classList.toggle("active");
    const isActive = searchToggle.classList.contains("active");
    searchBox.style.display = isActive ? "flex" : "none";
  });

  // Thêm sự kiện click vào nút tìm kiếm
  searchBoxButton.addEventListener("click", function (e) {
    const query = searchInput.value.trim();

    if (query === "") {
      e.preventDefault(); // Ngăn gửi form nếu không có từ khóa
    } else {
      span1.innerText = selectedText1;
      span2.innerText = selectedText2;
    }
  });

  // Thêm sự kiện keyup để thực hiện tìm kiếm khi nhấn Enter
  searchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      const query = searchInput.value.trim();
      if (query === "") {
        e.preventDefault(); // Ngăn gửi form nếu không có từ khóa
      } else {
        span1.innerText = selectedText1;
        span2.innerText = selectedText2;
      }
    }
  });

  document.querySelector(".dropdown-bar1").addEventListener("click", (e) => {
    e.stopPropagation();
    dropdownList1.classList.toggle("show");
    dropdownList2.classList.remove("show");
  });

  document.querySelector(".dropdown-bar2").addEventListener("click", (e) => {
    e.stopPropagation();
    dropdownList2.classList.toggle("show");
    dropdownList1.classList.remove("show");
  });

  dropdownItems1.forEach((item) => {
    item.addEventListener("click", (e) => {
      selectedText1 = e.target.innerText;
      span1.innerText = selectedText1;
      updatePlaceholder();
      dropdownList1.classList.remove("show");
    });
  });

  dropdownItems2.forEach((item) => {
    item.addEventListener("click", (e) => {
      selectedText2 = e.target.innerText;
      span2.innerText = selectedText2;
      updatePlaceholder();
      dropdownList2.classList.remove("show");
    });
  });

  document.addEventListener("click", () => {
    dropdownList1.classList.remove("show");
    dropdownList2.classList.remove("show");
  });

  dropdownList1.addEventListener("click", (e) => e.stopPropagation());
  dropdownList2.addEventListener("click", (e) => e.stopPropagation());

  function updatePlaceholder() {
    searchInput.placeholder = `Tìm kiếm ${selectedText1}, ${selectedText2}`;
  }
});

/* user */
document.addEventListener("DOMContentLoaded", function () {
  const userIcon = document.querySelector(".fa-user");
  const dropdownUser = document.querySelector(".dropdown-user");
  let hideTimeout;

  userIcon.addEventListener("click", function (event) {
    event.stopPropagation();
    dropdownUser.style.display =
      dropdownUser.style.display === "flex" ? "none" : "flex";
  });

  function hideDropdown() {
    hideTimeout = setTimeout(() => {
      dropdownUser.style.display = "none";
    }, 200);
  }

  userIcon.addEventListener("mouseleave", hideDropdown);
  dropdownUser.addEventListener("mouseleave", hideDropdown);

  dropdownUser.addEventListener("mouseenter", function () {
    clearTimeout(hideTimeout);
  });

  document.addEventListener("click", function (event) {
    if (
      !userIcon.contains(event.target) &&
      !dropdownUser.contains(event.target)
    ) {
      dropdownUser.style.display = "none";
    }
  });
});

/* Top */
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

// Hiển thị nút khi cuộn xuống 200px
window.onscroll = function () {
  if (window.scrollY > 200) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
};

// Cuộn lên đầu trang khi nhấn nút
scrollToTopBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

