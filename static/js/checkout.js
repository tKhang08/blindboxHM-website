document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".checkout-form");
  const submitButton = document.querySelector(".btn");

  submitButton.addEventListener("click", (event) => {
    event.preventDefault(); // Ngăn chặn gửi biểu mẫu

    // Lấy thông tin từ các trường nhập liệu
    const firstName = document.getElementById("first-name").value.trim();
    const lastName = document.getElementById("last-name").value.trim();
    const country = document.getElementById("country").value.trim();
    const address = document.getElementById("address").value.trim();
    const city = document.getElementById("city").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const bankAccount = document.getElementById("bank-account").value.trim();

    // Kiểm tra thông tin hợp lệ
    if (
      !firstName ||
      !lastName ||
      !country ||
      !address ||
      !city ||
      !phone ||
      !email
    ) {
      document.getElementById("card-errors").innerText =
        "Vui lòng điền tất cả các trường bắt buộc.";
      return;
    }
    // Kiểm tra số tài khoản ngân hàng (nếu chọn phương thức chuyển khoản)
    const paymentMethod = document.querySelector(
      'input[name="payment"]:checked'
    ).value;
    if (
      paymentMethod === "bank-transfer" &&
      (!bankAccount || !/^\d+$/.test(bankAccount))
    ) {
      document.getElementById("card-errors").innerText =
        "Vui lòng nhập số tài khoản ngân hàng hợp lệ.";
      return;
    }

    // Nếu tất cả thông tin hợp lệ
    document.getElementById("card-errors").innerText = ""; // Xóa thông báo lỗi

    // Hiển thị thông báo thành công
    alert(`Cảm ơn bạn, ${firstName}! Đơn hàng của bạn đã được đặt thành công.`);

    // Ở đây bạn có thể thêm mã để gửi dữ liệu đến máy chủ nếu cần
    // form.submit(); // Bỏ dòng này nếu bạn không muốn gửi biểu mẫu ngay lập tức

    // Chuyển hướng về trang chủ
    window.location.href = "index.html"; // Thay đổi đường dẫn nếu cần
  });
});
function toggleBankAccount() {
  const bankAccountContainer = document.getElementById(
    "bank-account-container"
  );
  const bankTransferOption = document.querySelector(
    'input[name="payment"][value="bank-transfer"]'
  );

  // Hiện ô nhập tài khoản ngân hàng nếu chọn chuyển khoản ngân hàng
  if (bankTransferOption.checked) {
    bankAccountContainer.style.display = "block";
  } else {
    bankAccountContainer.style.display = "none";
  }
}
