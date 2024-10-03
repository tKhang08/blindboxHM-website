// Lấy tất cả các nút "Buy Now"
const buyNowButtons = document.querySelectorAll(".buy-now");

// Gắn sự kiện click cho từng nút
buyNowButtons.forEach((button) => {
  button.addEventListener("click", function (event) {
    event.preventDefault(); // Ngăn không cho trang tải lại
    const productName = this.getAttribute("data-name");
    const productPrice = this.getAttribute("data-price");
    const productImage = this.getAttribute("data-image"); // Lấy hình ảnh sản phẩm
    // Lấy giỏ hàng hiện tại từ sessionStorage, nếu chưa có thì tạo mảng rỗng
    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    let existingProduct = cart.find((item) => item.name === productName);

    if (existingProduct) {
      // Nếu đã có, tăng số lượng
      existingProduct.quantity += 1;
    } else {
      // Nếu chưa có, thêm sản phẩm mới vào giỏ hàng với số lượng 1
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
