document.addEventListener("DOMContentLoaded", function () {
  const cartItemsContainer = document.getElementById("cart-items");
  const subtotalElement = document.getElementById("subtotal");
  const totalPriceElement = document.getElementById("total-price");
  const shippingFeeElement = document.getElementById("shipping-fee"); // Phí giao hàng

  let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
  let discount = 0; // Biến lưu trữ phần trăm giảm giá
  let shippingFee = 30; // Mặc định phí giao hàng là 30$
  let appliedDiscountCodes = []; // Mảng lưu trữ mã giảm giá đã áp dụng

  const discountCodes = {
    GIAM10: 10, // Giảm 10%
    GIAM15: 15,
    GIAM20: 20,
    FREESHIP: "FREESHIP", // Mã giảm phí giao hàng
  };

  // Hàm cập nhật tổng giá sau khi áp dụng giảm giá
  function updateTotalPrice() {
    let subtotal = parseFloat(subtotalElement.textContent);
    let total = subtotal - (subtotal * discount) / 100 + shippingFee; // Tổng sau khi áp dụng giảm giá và phí ship
    totalPriceElement.textContent = total.toFixed(2);
  }

  if (cart.length > 0) {
    let subtotal = 0;

    cart.forEach((product, index) => {
      const productPriceValue = parseFloat(product.price).toFixed(2);

      const cartItemRow = document.createElement("tr");
      cartItemRow.innerHTML = `
    <td><img src="${product.image}" alt="${
        product.name
      }" style="width: 50px; height: 50px;" /></td>
    <td>${product.name}</td>
    <td>$${productPriceValue}</td>
    <td><input type="number" value="${
      product.quantity
    }" min="1" class="form-control quantity" style="width: 60px;" data-index="${index}" /></td>
    <td>$<span class="item-total">${(product.quantity * product.price).toFixed(
      2
    )}</span></td>
    <td><button class="btn btn-danger remove-item" data-index="${index}">Xóa</button></td>
  `;
      cartItemsContainer.appendChild(cartItemRow);

      subtotal += parseFloat(productPriceValue) * product.quantity;

      // Xử lý thay đổi số lượng
      const quantityInput = cartItemRow.querySelector(".quantity");
      quantityInput.addEventListener("change", function () {
        const newQuantity = this.value;
        const itemIndex = this.getAttribute("data-index");
        const itemPrice = parseFloat(cart[itemIndex].price);

        const newTotal = (newQuantity * itemPrice).toFixed(2);
        cartItemRow.querySelector(".item-total").textContent = newTotal;

        updateSubtotal();
      });

      // Xử lý sự kiện xóa sản phẩm
      const removeButton = cartItemRow.querySelector(".remove-item");
      removeButton.addEventListener("click", function () {
        const itemIndex = this.getAttribute("data-index");
        cart.splice(itemIndex, 1); // Xóa sản phẩm khỏi mảng giỏ hàng
        sessionStorage.setItem("cart", JSON.stringify(cart)); // Cập nhật giỏ hàng trong sessionStorage
        location.reload(); // Tải lại trang để cập nhật giỏ hàng
      });
    });

    subtotalElement.textContent = subtotal.toFixed(2);
    updateTotalPrice(); // Cập nhật tổng tiền lần đầu

    function updateSubtotal() {
      let subtotal = 0;
      const itemTotals = document.querySelectorAll(".item-total");
      itemTotals.forEach((itemTotal) => {
        subtotal += parseFloat(itemTotal.textContent);
      });
      subtotalElement.textContent = subtotal.toFixed(2);

      // Cập nhật lại tổng tiền sau khi tính lại subtotal
      updateTotalPrice();
    }
  } else {
    const emptyRow = document.createElement("tr");
    emptyRow.innerHTML = `
  <td colspan="6">Giỏ hàng của bạn đang trống.</td>
`;
    cartItemsContainer.appendChild(emptyRow);
    updateTotalPrice(); // Đảm bảo tổng tiền là 0
  }

  // Xử lý sự kiện khi nhấn nút "Áp dụng" mã giảm giá
  document
    .getElementById("apply-discount-btn")
    .addEventListener("click", function () {
      const discountCodeInput = document
        .getElementById("discount-code-input")
        .value.trim()
        .toUpperCase();

      // Kiểm tra xem mã giảm giá đã được áp dụng chưa
      if (appliedDiscountCodes.includes(discountCodeInput)) {
        alert("Mã giảm giá đã được áp dụng.");
        return;
      }

      if (discountCodes.hasOwnProperty(discountCodeInput)) {
        // Xử lý mã giảm giá phần trăm
        if (typeof discountCodes[discountCodeInput] === "number") {
          discount += discountCodes[discountCodeInput]; // Cộng dồn phần trăm giảm giá
          alert(
            `Áp dụng mã giảm giá thành công! Bạn được giảm thêm ${discountCodes[discountCodeInput]}%`
          );
        }
        // Xử lý mã miễn phí giao hàng
        else if (discountCodes[discountCodeInput] === "FREESHIP") {
          shippingFee = 0; // Đặt phí giao hàng thành 0$
          shippingFeeElement.textContent = "0.00"; // Cập nhật giao diện
          alert("Mã miễn phí giao hàng đã được áp dụng!");
        }

        // Thêm mã giảm giá vào danh sách đã áp dụng
        appliedDiscountCodes.push(discountCodeInput);
      } else {
        alert("Mã giảm giá không hợp lệ.");
      }

      // Cập nhật lại tổng tiền
      updateTotalPrice();
    });
});
document.getElementById("checkout-btn").addEventListener("click", function () {
  // Điều hướng đến trang thanh toán
  window.location.href = "checkout.html"; // Trang checkout mà bạn đã chuẩn bị
});
