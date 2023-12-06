// Tạo đối tượng danh sách sinh viên.
// Sẽ sử dụng ở nhiều nơi, nên chúng ta sẽ tạo nó ở phạm vi global.
// Vì sao không tạo nó ở bên trong hàm gắn cho onsubmit? vì để lưu trữ lại những sinh viên đã được lưu trước đó.
var dssv = new ListSinhVien();

// Tạo một biến lưu trạng thái để nhận diện form chúng ta đang thêm mới hay là đang chỉnh sửa
var isEdit = false;

// ==========
var eleForm = document.querySelector("form");

eleForm.onsubmit = function (event) {
  // ngăn chặn reload lại trang, hành vi mặc định của thẻ form
  event.preventDefault();

  return;

  /**
   * 1. Lấy tất cả các giá trị trên form.
   * 2. Tạo một đối tượng SinhVien
   * 3. Lưu đối tượng sinh viên vào danh sách sinh viên
   *
   * 4. Render lại giao diện table.
   */

  var listEle = document.querySelectorAll(
    ".form-sinh-vien input:not([disabled]), .form-sinh-vien select, .form-sinh-vien input#msv"
  );

  console.log("listEle", listEle);

  // --------------------------
  var sv = {};

  listEle.forEach(function (ele) {
    // Sử dụng id để nhận diện giá trị là của input, hay select nào.
    var thuocTinh = ele.id;
    sv[thuocTinh] = ele.value;
  });

  // Gõ đúng thứ tự tham số truyền vào để tránh nhầm thuộc tính.
  var sinhVien = new SinhVien(
    sv.msv,
    sv.email,
    sv.tsv,
    sv.khoaHoc,
    sv.ngaySinh,
    sv.toan,
    sv.ly,
    sv.hoa,
    sv.matKhau
  );
  // lưu vào danhSachSinhVien

  if (isEdit) {
    updateSinhVien(sinhVien);
  } else {
    createSinhVien(sinhVien);
  }
  // --------------------------
  // Cập nhật lại trạng thái button
  renderButtonAction();
  // --------------------------

  // luu vào localStorage
  luuDanhSachSinhVienLocal();

  // reset form
  eleForm.reset();

  // render table
  renderTable();
};

// == Function Tạo mới sinh viên ==
function createSinhVien(sinhVien) {
  // Đôi khi chúng ta mong muốn xử lý thêm logic
  dssv.themSinhVien(sinhVien);
}

// == Function Cập nhật sinh viên ==
function updateSinhVien(sinhVien) {
  // Đôi khi chúng ta mong muốn xử lý thêm logic
  dssv.capNhatSinhVien(sinhVien);

  // Sau khi update xong thì chuyển trạng thái form về dạng create
  isEdit = false;

  // Mở lại input msv cho người dùng nhập sau khi cập nhật
  var inp = document.querySelector("input#msv");
  inp.disabled = undefined;
}
// == Reload page ==
/**
 * Chạy mỗi khi reload page
 * 1. Lấy dssv từ local ra
 * 2. Gán lại giá trị thuộc tính danhSachSinhVien của đối tượng dssv
 * 3. render table
 */
function init() {
  // 1.
  var danhSanhSinhVien = layDanhSachSinhVienLocal();
  // 2.
  dssv.danhSachSinhVien = danhSanhSinhVien;
  // 3.
  renderTable();
}
// Chạy function
init();

// == Render Table ==

/* <tr>
<td>Mark</td>
<td>Otto</td>
<td>@mdo</td>
<td>@mdo</td>
<td>@mdo</td>
<td>@mdo</td>
<td>
    <button class="btn btn-warning">Sửa</button>
    <button class="btn btn-danger">Xóa</button>
</td>
</tr> */

function renderTable(danhSachSinhVien) {
  var eleHtml = ``;

  // Lặp qua mảng sinh viên để tạo mỗi sinh viên là mỗi thẻ tr
  // và cộng dồn nó vào eleHtml
  // (1)danhSachSinhVien: đối tượng
  // (2)danhSachSinhVien: thuộc tính.

  /**
   * Nếu có giá trị undefined thì gán giá trị default cho nó.
   * Ngược lại thì không.
   */
  if (!danhSachSinhVien) {
    danhSachSinhVien = dssv.danhSachSinhVien;
  }

  // f2 đổi tên toàn bộ biến.
  danhSachSinhVien.forEach(function (sv) {
    // Chúng ta không thể truyền trực tiếp giá trị object sv vào function inline được.
    eleHtml += `
        <tr>
          <td>${sv.maSinhVien}</td>
          <td>${sv.ten}</td>
          <td>${sv.ngay}</td>
          <td>${sv.email}</td>
          <td>${sv.khoaHoc}</td>
          <td>${tinhDiemTrungBinh(sv)}</td>
          <td>
              <button onclick="chinhSuaSinhVien('${
                sv.maSinhVien
              }')" class="btn btn-warning">Sửa</button>
              <button onclick="xoaSinhVien('${
                sv.maSinhVien
              }')" class="btn btn-danger">Xóa</button>
          </td>
        </tr>
      `;
  });

  var tbody = document.querySelector(".table-sinh-vien tbody");

  tbody.innerHTML = eleHtml;
}
// == Xóa Sinh Viên ==
function xoaSinhVien(msv) {
  console.log(msv);
  dssv.xoaSinhVien(msv);

  // render lại table
  renderTable();
  // cập nhật lại storage
  luuDanhSachSinhVienLocal();
}
// == Chỉnh Sửa Sinh Viên ==
/**
 * 1. Render ngược dữ liệu lên form
 * 2. Disabled input mã sinh viên
 * 3. Chuyển thêm sinh viên -> cập nhật sinh viên
 */
function chinhSuaSinhVien(msv) {
  var sinhVien = dssv.timKiemSinhVienTheoMsv(msv);

  renderDuLieuLenForm(sinhVien);
}

function renderDuLieuLenForm(sv) {
  var listEle = document.querySelectorAll(
    ".form-sinh-vien input:not([disabled]),.form-sinh-vien select, .form-sinh-vien input#msv"
  );

  var mapper = {
    msv: "maSinhVien",
    tsv: "ten",
    email: "email",
    khoaHoc: "khoaHoc",
    ngaySinh: "ngay",
    toan: "diemToan",
    ly: "diemLy",
    hoa: "diemHoa",
    matKhau: "matKhau",
  };

  /**
   * Dùng id để phân biệt được input nào cần lấy dữ liệu thuộc tính nào của đối tượng sv để render lên trên giao diện.
   */

  listEle.forEach(function (ele) {
    var thuocTinh = mapper[ele.id];

    ele.value = sv[thuocTinh];

    // Chặn không cho phép người dùng chỉnh sửa maSinhVien.
    if (ele.id === "msv") {
      ele.disabled = true;
    }
  });

  // Cập nhật trạng thái form
  isEdit = true;
  // render lại button
  renderButtonAction();
}

// == Render Button Thêm - Sửa ==
function renderButtonAction() {
  // Lấy element button thêm sinh viên hay chỉnh sửa
  var btn = document.querySelector("button.tsv");

  if (isEdit) {
    btn.innerHTML = "Cập nhật sinh viên";
    // Thêm class vào có tên btn-primary
    btn.classList.add("btn-primary");
    // Xóa class có giá trị là btn-success
    btn.classList.remove("btn-success");
  } else {
    btn.innerHTML = "Thêm sinh viên";
    btn.classList.add("btn-success");
    btn.classList.remove("btn-primary");
  }
}

// == Tìm kiếm ==
document.querySelector("button.search").onclick = function () {
  const valueSearch = document.querySelector("input#tim-kiem-sv").value;

  var danhSachSinhVienTimKiemDuoc = dssv.timKiemSinhVienTheoTen(valueSearch);

  console.log("danhSachSinhVienTimKiemDuoc", danhSachSinhVienTimKiemDuoc);

  // reset lại ô tìm kiếm
  document.querySelector("input#tim-kiem-sv").value = "";

  // render lại table danh sách sinh viên
  renderTable(danhSachSinhVienTimKiemDuoc);
};

// == Validate ==
/**
 * Khi người dùng rời khỏi ô input thì chúng ta mới bắt đầu validate ô input vừa rời đi.
 *  - onblur: để lắng nghe nếu người dùng vừa rồi ô input.
 * Khi người dùng submit form.
 *
 *
 * Lưu trữ tất cả ô input người dùng từng đi qua.
 * var touches;
 *
 * Lưu các message lỗi của từng ô input.
 * var errors;
 *
 * - Kiểm tra người dùng đã từng đi qua hay chưa và có message lỗi nào hay không để hiển thị error.
 *
 *
 * Yêu cầu:
 * - tất cả các trường đều yêu cầu bắt buộc nhập vào.
 * - maSinhVien: toàn bộ là số.
 * - email: phải đúng định dạng email
 * - ten: Toàn bộ là ký tự.
 * - matKhau: từ 6 ký tự trở lên
 * - ly: số chạy từ 0 -> 10
 * - hoa: số chạy từ 0 -> 10
 * - toan: số chạy từ 0 -> 10
 */
// == Gắn sự kiện onblur cho tất cả ô input - để xem thử người dùng đã từng đi qua ô input đó hay chưa ==
var touches = {
  // maSinhVien: true,
  // email: false,
};

var listEle = document.querySelectorAll(
  ".form-sinh-vien input:not([disabled]), .form-sinh-vien select"
);

// Duyệt qua từng ô input và gắn thuộc tính onblur
function handleBlur(event) {
  // event.target: chính là ô input của chúng ta.
  touches[event.target.id] = true; // true: đã từng đi qua ô input

  console.dir(touches);

  // Hiện errors mỗi khi người dùng blur khỏi ô input
  renderErrors();
}

listEle.forEach(function (ele) {
  ele.onblur = handleBlur;
});
// == Validate ==
var errors = {
  msv: "Yêu cầu bắt buộc nhập vào.",
};

// == Render error message ==
function renderErrors() {
  listEle.forEach(function (ele) {
    // Kiểm tra ô input này có message lỗi hay không
    // và có đã từng đi qua hay chưa.

    // --

    var thuocTinh = ele.id; // msv ten email

    // Kiểm tra ô input có hợp lệ hay không để show message
    // Hiển thị message khi nào:
    // errors[thuocTinh]: có giá trị .length > 0;
    // touches[thuocTinh]: có giá trị true

    // Falsy: false, 0 , '', underfined, null
    // Bỏ qua chuyện ép kiểu về Boolean, vì javascript tự làm giúp chúng ta
    var isShow = Boolean(errors[thuocTinh]) && touches[thuocTinh];
    
    if(!isShow){
      // Dừng chạy hàm, không show message
      return;
    }
    // --

    // Lấy ra element kế tiếp của input. chính là form-message
    // Kiểm tra coi thử có hay chưa.
    // Có rồi, thì chỉ thay đổi nội dung.
    // Chưa, thì mình sẽ tạo mới nó.
    var nextEle = ele.nextElementSibling;

    var messageHTML = `
                        <span class="form-message">
                          Bắt buộc nhập vào.
                        </span>`;
    if (nextEle) {
      nextEle.innerHTML = messageHTML;
    } else {
      // Tạo mới element form-message
      ele.insertAdjacentHTML("afterend", messageHTML);
    }
  });
}

// == Fix tạm bug khi lưu vào local sẽ bị mất method tinhDiemTrungBinh ==
function tinhDiemTrungBinh(sv) {
  const dtb = (sv.diemHoa + sv.diemLy + sv.diemToan) / 3;
  return dtb.toFixed(2);
}

// ==
function luuDanhSachSinhVienLocal() {
  localStorage.setItem("dssv", JSON.stringify(dssv.danhSachSinhVien));
}

function layDanhSachSinhVienLocal() {
  var res = localStorage.getItem("dssv");

  // Kiểm tra xem thử localStorage có chứa dữ liệu của key: dssv hay không.
  if (res) {
    return JSON.parse(res);
  }

  return [];
}

// == LocalStorage ==
/**
 * Lưu trữ data tại browser
 * Khi reload trang không bị mất dữ liệu.
 */
var age = 20;
var sv = {
  name: "Nguyen Van Teo",
  age: 20,
};
// JSON.stringify(age): chuyển dữ liệu của chúng ta về định dạng JSON
// Định dạng JSON là một chuỗi(String).
// JSON.parse(json): chuyển định dạng JSON về kiểu dữ liệu của chúng ta

// 1. Lưu (set)
// localStorage.setItem("sinhVien", JSON.stringify(sv));
// localStorage.setItem("tuoi", JSON.stringify(age));
// localStorage.setItem("ten", JSON.stringify("Nguyen Van A"));

// 2. Lấy (get)
// console.log("tuoi", JSON.parse(localStorage.getItem("tuoi"))); // Kiểu dữ liệu chúng ta sẽ nhận được là kiểu gì? String -> ở định dạng json
// console.log("ten", JSON.parse(localStorage.getItem("ten")));
// console.log("sinhVien", JSON.parse(localStorage.getItem("sinhVien")));

/**
 * "20"
 * "[1,2,3,4]"
 * "{"a":10,"b":20}"
 */

// ======================
var obj = {};
//-- kiểm tra nếu obj không có thuộc tính a, thì nó sẽ tạo ra thuộc tính đó và gán giá trị
//-- Nếu có thì nó sẽ ghi đè giá trị, gán lại giá trị.
//-- obj.a = 20;
var age = "number";
obj[age] = 20;

// console.log(obj);
// ======================


// primitive type | object type
// |_ string          |_ array
//                    |_ function
//                    |_ object
// "hello".length; => coercion(tính năng ẩn của js)
// 1> Chuyển về new String('hello') => được quyền sử dụng length nếu có thuộc tính.
// 2> Khôi phục lại biến String cho chúng ta. Không thay đổi hay can thiệp vào chuỗi của chúng ta.

