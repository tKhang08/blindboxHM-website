document.addEventListener("DOMContentLoaded", function () {
  // Lấy tất cả các nút "Buy Now"
  const buyNowButtons = document.querySelectorAll(".buy-now");

  // Gắn sự kiện click cho từng nút
  buyNowButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault(); // Ngăn không cho trang tải lại
      const productName = this.getAttribute("data-name");
      const productPrice = this.getAttribute("data-price");
      const productImage = this.getAttribute("data-image");

      // Lấy giỏ hàng hiện tại từ sessionStorage, nếu chưa có thì tạo mảng rỗng
      let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

      // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
      let existingProduct = cart.find((item) => item.name === productName);

      if (existingProduct) {
        // Nếu đã có, tăng số lượng
        existingProduct.quantity += 1;
      } else {
        // Nếu chưa có, thêm sản phẩm mới vào giỏ hàng với số lượng 1 và đường dẫn hình ảnh
        cart.push({
          name: productName,
          price: productPrice,
          image: productImage,
          quantity: 1,
        });
      }

      // Lưu lại giỏ hàng vào sessionStorage
      sessionStorage.setItem("cart", JSON.stringify(cart));

      // Thông báo hoặc cập nhật giao diện nếu cần
      alert("Sản phẩm đã được thêm vào giỏ hàng!");
    });
  });
});
// Chức năng đếm ngược cho giảm giá
function countdown(elementId, days, hours, minutes, seconds) {
  var element = document.getElementById(elementId);
  var endDate = new Date();
  endDate.setDate(endDate.getDate() + days);
  endDate.setHours(
    endDate.getHours() + hours,
    endDate.getMinutes() + minutes,
    endDate.getSeconds() + seconds
  );

  var timer = setInterval(function () {
    var now = new Date();
    var timeRemaining = endDate - now;

    if (timeRemaining >= 0) {
      var d = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
      var h = Math.floor(
        (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var m = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
      var s = Math.floor((timeRemaining % (1000 * 60)) / 1000);

      element.innerHTML = d + " DAYS " + h + ":" + m + ":" + s;
    } else {
      clearInterval(timer);
      element.innerHTML = "Hết hạn";
    }
  }, 1000);
}

countdown("countdown1", 10, 9, 18, 17);
countdown("countdown2", 6, 5, 4, 3);
countdown("countdown3", 3, 2, 12, 17);
countdown("countdown4", 5, 15, 3, 1);

// Chức năng Quick View
document.querySelectorAll(".quick-view").forEach(function (element) {
  element.addEventListener("click", function () {
    alert("Chưa làm phần này :))");
  });
});
