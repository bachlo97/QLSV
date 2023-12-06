function SinhVien(
  maSinhVien,
  email,
  ten,
  khoaHoc,
  ngay,
  diemToan,
  diemLy,
  diemHoa,
  matKhau
) {
  this.maSinhVien = maSinhVien;
  this.email = email;
  this.ten = ten;
  this.khoaHoc = khoaHoc;
  this.ngay = ngay;
  this.diemToan = Number(diemToan);
  this.diemLy = +diemLy;
  this.diemHoa = +diemHoa;
  this.matKhau = matKhau;

  this.tinhDiemTrungBinh = function () {
    // this là cái gì ? không phải là lớp đối tượng SinhVien.
    // this nó tượng trưng cho đối tượng được tạo ra từ lớp đối tượng SinhVien
    // this nó tượng trưng đối tượng là chủ của nó.
    const dtb = (this.diemHoa + this.diemLy + this.diemToan) / 3;

    // 2 chữ số sau dấu phẩy: toFixed
    return dtb.toFixed(2);
  };
}

// var sinhVienB = new SinhVien(
//   "001",
//   "abc@gmail.com",
//   "0123456789",
//   "kh001",
//   "1/1/1111",
//   7, // toan
//   6, // ly
//   3, // hoa
//   "123456"
// );

// sinhVienB.tinhDiemTrungBinh();

// var sinhVienA = new SinhVien(
//   "001",
//   "abc@gmail.com",
//   "0123456789",
//   "kh001",
//   "1/1/1111",
//   9, // toan
//   10, // ly
//   8, // hoa
//   "123456"
// );
// sinhVienA.tinhDiemTrungBinh();

var fullName = "Nguyen Van B";

// DOM:
// đối tượng để mô tả file html -> document
// window: là một đối tượng global.
// đối tượng để mô tả màn hình của trang web -> window: share biến, function giữa các file js, html với nhau.

// console.log("window.fullName", window.fullName);
// console.log("fullName", fullName);
