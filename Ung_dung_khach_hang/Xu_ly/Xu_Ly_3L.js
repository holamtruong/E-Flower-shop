//************************* KHAI BÁO ĐƯỜNG DẪN DỊCH VỤ ********************************************
var Dia_chi_Dich_vu_Du_Lieu = "http://localhost:1000"
var Dia_chi_Dich_vu_Media = "http://localhost:1001"


//************************* XỬ LÝ LƯU TRỮ *******************************************************

// *********** Hàm đọc danh sách tất cả Dữ liệu lưu trữ ***********
function Doc_Du_lieu() {
    // Khái báo đối tượng là danh sách tất cả Dữ liệu
    var Du_lieu = {}
    // Khởi tạo yêu cầu qua giao thức HTTP
    var Xu_ly_HTTP = new XMLHttpRequest()
    // Khai báo tham số xử lý là "Doc_danh_sach_Du_lieu"
    var Tham_so = `Ma_so_Xu_ly=Doc_danh_sach_Du_lieu`
    // Gán lại Địa chỉ chứa tham số xử lý qua giao thức HTTP
    var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu_Du_Lieu}?${Tham_so}`
    // Xử lý HTTP đọc dữ liệu
    Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
    // Xử lý HTTP gửi dữ liệu
    Xu_ly_HTTP.send("")
    var Chuoi_JSON = Xu_ly_HTTP.responseText //Kết quả trả về kiểu chuỗi
    if (Chuoi_JSON != "")
        Du_lieu = JSON.parse(Chuoi_JSON)
    return Du_lieu  //Trả về kết quả kiểu "object"
}

// *********** Hàm xuất thông tin cửa hàng ***********
function Xuat_Thong_tin_Cua_hang(Cua_hang, Thamso_Ten, Thamso_Diachi, Thamso_Dienthoai_top,Thamso_Dienthoai_bot,Thamso_logo) {
    // Tên cửa hàng 
    var HTML_Ten = `${Cua_hang.Ten}`
    Thamso_Ten.innerHTML = HTML_Ten;
    // Địa chỉ
    var HTML_Diachi = `${Cua_hang.Dia_chi}`
    Thamso_Diachi.innerHTML = HTML_Diachi;
    // Số điện thoại
    var HTML_SoDienThoai = `${Cua_hang.Dien_thoai}`
    Thamso_Dienthoai_top.innerHTML = HTML_SoDienThoai;
    Thamso_Dienthoai_bot.innerHTML = HTML_SoDienThoai;
    // Logo cửa hàng (media)
    var HTML_Logo =   `<img class="logo" src="${Dia_chi_Dich_vu_Media}/${Cua_hang.Ma_so}.jpg" alt="logo E-Flower shop" title="logo E-Flower shop"></img>`
    Thamso_logo.innerHTML = HTML_Logo;
}