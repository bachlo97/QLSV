function ListSinhVien() {
  this.danhSachSinhVien = [];

  this.themSinhVien = function (sv) {
    // thêm sinh viên vào cuối mảng.
    this.danhSachSinhVien.push(sv);
  };
  this.xoaSinhVien = function (msv) {
    // filter. loại bỏ sinhVien có maSinhVien === msv

    // Dừng hàm tại dòng return không chạy nữa.
    if (this.danhSachSinhVien.length === 0) return;

    var newDanhSinhSien = this.danhSachSinhVien.filter(function (sv) {
      //   if (sv.maSinhVien === msv) {
      //     return false;
      //   } else {
      //     return true;
      //   }

      // !true == false
      return !(sv.maSinhVien === msv);
    });

    // Gán lại danh sách sinh viên
    this.danhSachSinhVien = newDanhSinhSien;
  };
  this.timKiemSinhVienTheoTen = function (name) {
    /**
     * 1. Nếu người dùng truyền vào 1 string rỗng hoặc không truyền
     *
     * -- Nếu người dùng không truyền gì vào thì sẽ return về danhSachSinhVien không cần filter
     */

    if (name === undefined || name === "") {
      return this.danhSachSinhVien;
    }

    var listSinhVien;

    listSinhVien = this.danhSachSinhVien.filter(function (sv) {
      // 'Nguyen van a'.includes('van') => true
      // 'Nguyen van a'.includes('vann') => false

      // Tìm kiếm không phân biệt hoa thường.
      //   if (sv.ten.toLowerCase().includes(name.toLowerCase())) {
      //     return true;
      //   }

      //   return false;

      return sv.ten.toLowerCase().includes(name.toLowerCase());
    });
    console.log(listSinhVien);
    return listSinhVien;
  };
  // Phục vụ cho tìm kiếm sinh viên cần chỉnh sửa.
  this.timKiemSinhVienTheoMsv = function (msv) {
    if (msv === undefined || msv === "") return; // thoát khỏi function.

    //-- else ?
    //-- gán giá trị tìm thấy cho sinhVien -> return sinhVien
    // var sinhVien = this.danhSachSinhVien.find(function (sv) {
    //   return sv.maSinhVien === msv;
    // });
    // return sinhVien;

    //-- return giá trị tìm thấy
    return this.danhSachSinhVien.find(function (sv) {
      return sv.maSinhVien === msv;
    });
  };
  this.capNhatSinhVien = function (sv) {
    /**
     * 1. Tìm vị trí sinhVien cần cập nhật trong danhSachSinhVien -> findIndex
     * 2. Cập nhật giá trị sv cho vị trí mới vừa tìm thấy.
     */

    var index = this.danhSachSinhVien.findIndex(function (sinhVien) {
      // dựa vào mã sinh viên để tìm kiếm tại vì nó là duy nhất.
      return sinhVien.maSinhVien === sv.maSinhVien;
    });

    // nếu như không tìm thấy. thì dừng function
    if (index === -1) return;

    // nếu như tìm thấy thì cập nhật giá trị của vị trí index
    this.danhSachSinhVien[index] = sv;

    // ------------------------
    // var arr = [1, 2, 3, 4, 5];
    //           [1, 7, 3, 4, 5];
    // arr[1]  = 7;
  };
}

//-- Tạo ra một đối tương từ ListSinhVien
// var listSinhVienKhoiA = new ListSinhVien();

// console.log(listSinhVienKhoiA.danhSachSinhVien); // []

//-- Thêm sinh viên.
// var sinhVienA = new SinhVien(
//   "001",
//   "abc@gmail.com",
//   "Nguyen Van A",
//   "kh001",
//   "1/1/1111",
//   9, // toan
//   10, // ly
//   8, // hoa
//   "123456"
// );
// listSinhVienKhoiA.themSinhVien(sinhVienA);
//-- Mong muốn sẽ có một mảng chứa 1 phần tử sinhVienA -> triển khai
// console.log("themSinhVien", listSinhVienKhoiA.danhSachSinhVien); // một mảng chứa 1 phần tử sinhVienA

// listSinhVienKhoiA.xoaSinhVien("001");
//-- Mong muốn sẽ có một mảng không chứa đối tượng SinhVien có msv = 001 -> triển khai
// console.log("xoaSinhVien", listSinhVienKhoiA.danhSachSinhVien); // []

// -- TimKiemTheoTen --
// listSinhVienKhoiA.themSinhVien(sinhVienA);
// var sinhVienB = new SinhVien(
//   "002",
//   "abc@gmail.com",
//   "Nguyen Van Teo",
//   "kh001",
//   "1/1/1111",
//   9, // toan
//   10, // ly
//   8, // hoa
//   "123456"
// );
// listSinhVienKhoiA.themSinhVien(sinhVienB);

// console.log(
//   "timKiemSinhVienTheoTen: 'van'",
//   listSinhVienKhoiA.timKiemSinhVienTheoTen("van")
// );
// console.log(
//   "timKiemSinhVienTheoTen: 'teo'",
//   listSinhVienKhoiA.timKiemSinhVienTheoTen("teo")
// );
// console.log(
//   "timKiemSinhVienTheoTen: 'teoo'",
//   listSinhVienKhoiA.timKiemSinhVienTheoTen("teoo")
// );
// console.log(
//   "timKiemSinhVienTheoTen: ''",
//   listSinhVienKhoiA.timKiemSinhVienTheoTen("")
// );

// console.log(
//   "timKiemSinhVienTheoTen: 'undefined'",
//   listSinhVienKhoiA.timKiemSinhVienTheoTen()
// );

// -- timKiemSinhVienTheoMSV --
// console.log(
//   "timKiemSinhVienTheoMsv: '002'",
//   listSinhVienKhoiA.timKiemSinhVienTheoMsv("002")
// );

// console.log(
//   "timKiemSinhVienTheoMsv: 'undefined'",
//   listSinhVienKhoiA.timKiemSinhVienTheoMsv()
// );

// console.log(
//   "timKiemSinhVienTheoMsv: '003'",
//   listSinhVienKhoiA.timKiemSinhVienTheoMsv("003")
// );

// sinhVienB.diemToan = 3;
// sinhVienB.diemHoa = 5;

// console.log("danhSachSinhVien:", listSinhVienKhoiA.danhSachSinhVien);

// console.log(
//   "capNhatSinhVien: sinhVienB",
//   listSinhVienKhoiA.capNhatSinhVien(sinhVienB)
// );

// console.log(
//   "danhSachSinhVien - sau khi cap nhat:",
//   listSinhVienKhoiA.danhSachSinhVien
// );

// --
// == Filter ==
// const numbers = [1, 2, 3, 4, 5, 6];
// // [ 4, 5, 6]: lớn hơn > 3
// // truyền vào là một function và phải có return về kiểu dữ liệu boolean.
// // true: Nhận item đó
// // false: Loại bỏ item đó.
// // filter sẽ trả về giá trị là một Array chứa tất cả các item thỏa mãn điều kiền (true).
// const newNumbers = numbers.filter(function (item, index) {
//   //   if (item > 3) {
//   //     return true;
//   //   } else return false;

//   return item > 3;
// });

// console.log(newNumbers);
// == Filter ==

// == find ==
// var numbers = [
//   { a: 10, b: 20 },
//   { a: 20, b: 10 },
//   { a: 30, b: 40 },
// ];
// tìm đối tượng có thuộc tính a > 15;
// function truyền vào phải có return, kiểu dữ liệu là boolean.
// find chỉ trả về 1 đối tượng duy nhất thỏa mãn điều kiện đầu tiên.
// var obj = numbers.find(function (obj, index) {
//   if (obj.a > 15) return true;

//   return false;
// });

// console.log(obj);

// == findIndex ==
// findIndex: tìm ra vị trí phần tử đầu tiên thỏa mãn điều kiện.
// Nếu không tìm thấy: sẽ trả về -1;
// var index = numbers.findIndex(function (obj, index) {
//   if (obj.a > 50) return true;

//   return false;
// });

// console.log(index);
// --
