/* nav mav-menu khi thu nhỏ */
// Bắt sự kiện khi bấm vào biểu tượng toggle để mở/đóng menu
document.querySelector('.toggle').addEventListener('click', function() {
    const navMenu = document.querySelector('.nav-menu');
    const faBars = document.querySelector('.fa-bars');
    const faXmark = document.querySelector('.fa-xmark');
  
    // Mở/đóng menu
    navMenu.classList.toggle('show');
    this.classList.toggle('active'); // Thêm/lấy lớp active cho toggle
  
    // Chuyển đổi giữa các biểu tượng fa-bars và fa-xmark
    if (this.classList.contains('active')) {
        faBars.style.opacity = '0'; // Ẩn biểu tượng fa-bars
        faXmark.style.opacity = '1'; // Hiện biểu tượng fa-xmark
    } else {
        faBars.style.opacity = '1'; // Hiện biểu tượng fa-bars
        faXmark.style.opacity = '0'; // Ẩn biểu tượng fa-xmark
    }
  });
  
  // Hàm thay đổi trạng thái active cho menu
  function setActiveMenu(menuItem) {
    document.querySelectorAll('.nav-menu li').forEach(item => {
        item.classList.remove('active');
    });
    menuItem.classList.add('active');
  }
  
  // Sự kiện cho các dropdown khi nhấp vào trên màn hình nhỏ
  document.querySelectorAll('.nav-menu .dropdown > a').forEach(item => {
    item.addEventListener('click', function(event) {
        event.preventDefault();
        const subMenuId = item.nextElementSibling.id;
        toggleSubMenu(subMenuId);
    });
  });
  
  // Sự kiện cho các mục menu để thêm lớp active khi nhấp vào
  document.querySelectorAll('.nav-menu li a').forEach(item => {
    item.addEventListener('click', function() {
        setActiveMenu(item.parentElement);
    });
  });
  
  /* poster */
  let list = document.querySelector(".slider .list");
  let items = document.querySelectorAll(".slider .list .item");
  let dots = document.querySelectorAll(".slider .dots li");
  let prev = document.getElementById("prev");
  let next = document.getElementById("next");
  
  let active = 0;
  let lengthItems = items.length;
  
  let autoSlider = setInterval(() => {
    next.click();
  }, 8000);
  
  next.onclick = function () {
    active = (active + 1) % lengthItems;
    reloadSlider();
  };
  
  prev.onclick = function () {
    active = (active - 1 + lengthItems) % lengthItems;
    reloadSlider();
  };
  
  function reloadSlider() {
    let checkLeft = items[active].offsetLeft;
    list.style.left = -checkLeft + "px";
  
    let lastActiveDot = document.querySelector(".slider .dots li.active");
    if (lastActiveDot) lastActiveDot.classList.remove("active");
    dots[active].classList.add("active");
  
    clearInterval(autoSlider);
    autoSlider = setInterval(() => {
      next.click();
    }, 8000);
  }
  
  dots.forEach((li, key) => {
    li.addEventListener("click", function () {
      active = key;
      reloadSlider();
    });
  });
  
  /* Tìm kiếm */
  document.addEventListener("DOMContentLoaded", function() {
    const searchToggle = document.querySelector(".searchToggle");
    const searchBox = document.querySelector(".search-bar");
    const searchInput = document.getElementById("search-input");
    const searchBoxButton = document.querySelector(".search-box button");
    const dropdownItems1 = document.querySelectorAll("#list .dropdown-list-item");
    const dropdownItems2 = document.querySelectorAll("#price-list .dropdown-list-item");
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
  
    // Hàm thực hiện tìm kiếm
    function performSearch(e) {
        const query = searchInput.value.trim();
  
        if (query === "") {
            return;
        }
  
        searchToggle.classList.remove("active");
        searchBox.style.display = "none";
  
        span1.innerText = selectedText1;
        span2.innerText = selectedText2;
  
        console.log(`Tìm kiếm với từ khóa: ${query}`);
    }
  
    // Thêm sự kiện click vào nút tìm kiếm
    searchBoxButton.addEventListener("click", performSearch);
  
    // Thêm sự kiện keyup để thực hiện tìm kiếm khi nhấn Enter
    searchInput.addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
            performSearch(e);
        }
    });
  
    // Sự kiện submit khi người dùng nhấn Enter hoặc gửi form
    const searchForm = document.querySelector(".search-form");
    searchForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Ngăn form gửi lại trang
        const query = searchInput.value.trim();
        if (query) {
            // Chuyển hướng tới trang tìm kiếm
            window.location.href = `./user/search.html?query=${encodeURIComponent(query)}`;
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
  
  /* Phân trang */
  const productsPerPage = 4;  // Giữ nguyên số sản phẩm trên mỗi trang là 4
  let currentPage = 1;
  
  const productList = document.getElementById("productList");
  const products = Array.from(productList.getElementsByClassName("menu_item"));
  const totalPages = Math.ceil(products.length / productsPerPage);
  
  function displayPage(page) {
      const start = (page - 1) * productsPerPage;
      const end = start + productsPerPage;
  
      products.forEach((product, index) => {
          product.style.display = index >= start && index < end ? "block" : "none";
      });
  
      updatePagination();
  }
  
  function updatePagination() {
      document.querySelectorAll(".listpage li").forEach((li) => {
          li.classList.toggle("active", parseInt(li.textContent) === currentPage);
      });
  
      document.querySelector(".page1").style.pointerEvents = currentPage === 1 ? "none" : "auto";
      document.querySelector(".page1").style.opacity = currentPage === 1 ? "0.5" : "1";
  
      document.querySelector(".page2").style.pointerEvents = currentPage === totalPages ? "none" : "auto";
      document.querySelector(".page2").style.opacity = currentPage === totalPages ? "0.5" : "1";
  }
  
  document.querySelector(".listpage").addEventListener("click", (e) => {
      if (e.target.closest(".page1") && currentPage > 1) {
          currentPage--;
      } else if (e.target.closest(".page2") && currentPage < totalPages) {
          currentPage++;
      } else if (!isNaN(e.target.textContent)) {
          currentPage = parseInt(e.target.textContent);
      }
      displayPage(currentPage);
  });
  
  displayPage(currentPage);
  
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
  
  // const productsPerPage = 3;  // 3 sản phẩm mỗi trang
  // let currentPage = 1;
  
  // const productList = document.getElementById("productList");
  // const products = Array.from(productList.getElementsByClassName("menu_item"));
  // const totalPages = Math.ceil(products.length / productsPerPage);
  
  // // Hàm hiển thị sản phẩm cho trang hiện tại
  // function displayPage(page) {
  //     const start = (page - 1) * productsPerPage;
  //     const end = start + productsPerPage;
  
  //     products.forEach((product, index) => {
  //         // Hiển thị sản phẩm trong phạm vi của trang hiện tại
  //         product.style.display = (index >= start && index < end) ? "block" : "none";
  //     });
  
  //     updatePagination();
  // }
  
  // // Hàm cập nhật trạng thái phân trang
  // function updatePagination() {
  //     const paginationItems = document.querySelectorAll(".listpage li");
  
  //     // Cập nhật trạng thái active cho các trang
  //     paginationItems.forEach((li, index) => {
  //         if (li.textContent.trim() !== '') {
  //             li.classList.toggle("active", index === currentPage);
  //         }
  //     });
  
  //     // Cập nhật nút trước và sau
  //     const prevButton = document.querySelector(".page1");
  //     const nextButton = document.querySelector(".page2");
  
  //     prevButton.style.pointerEvents = currentPage === 1 ? "none" : "auto";
  //     prevButton.style.opacity = currentPage === 1 ? "0.5" : "1";
  
  //     nextButton.style.pointerEvents = currentPage === totalPages ? "none" : "auto";
  //     nextButton.style.opacity = currentPage === totalPages ? "0.5" : "1";
  // }
  
  // // Lắng nghe sự kiện click trên các nút phân trang
  // document.querySelector(".listpage").addEventListener("click", (e) => {
  //     if (e.target.closest(".page1") && currentPage > 1) {
  //         currentPage--;
  //     } else if (e.target.closest(".page2") && currentPage < totalPages) {
  //         currentPage++;
  //     } else if (!isNaN(e.target.textContent)) {
  //         currentPage = parseInt(e.target.textContent);
  //     }
  //     displayPage(currentPage);
  // });
  
  // // Hiển thị trang đầu tiên khi tải trang
  // displayPage(currentPage);
  