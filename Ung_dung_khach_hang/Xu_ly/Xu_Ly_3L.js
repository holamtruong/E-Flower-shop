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
function Xuat_Thong_tin_Cua_hang(Cua_hang, Thamso_Ten, Thamso_Diachi, Thamso_Dienthoai_top, Thamso_Dienthoai_bot, Thamso_logo) {
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
    var HTML_Logo = `<img class="logo" src="${Dia_chi_Dich_vu_Media}/${Cua_hang.Ma_so}.jpg" alt="logo E-Flower shop" title="logo E-Flower shop"></img>`
    Thamso_logo.innerHTML = HTML_Logo;
}

// *********** Hàm ghi phiếu đặt hàng vào Giỏ hàng ***********

function Ghi_Phieu_Dat_hang(DsPhieu_dat) {
    var Kq = ""
    var Xu_ly_HTTP = new XMLHttpRequest()
    var Tham_so = `Ma_so_Xu_ly=Ghi_Phieu_Dat_hang`
    var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
    Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
    var Chuoi_goi = JSON.stringify(DsPhieu_dat)
    Xu_ly_HTTP.send(Chuoi_goi)
    Kq = Xu_ly_HTTP.responseText
    return Kq
}


// *********** Hàm xuất và thể hiện Danh sách hoa ***********
function Xuat_The_hien_Danh_sach_Hoa(Danh_sach, Th_Cha) {
    Th_Cha.innerHTML = ""
    Danh_sach.forEach(Hoa_tuoi => {
        // Kiểm tra trạng thái sản phẩm
        var Gia_goc = Hoa_tuoi.Don_gia_Ban  //number
        var Gia_khuyen_mai = Gia_goc - ((Gia_goc) * (Hoa_tuoi.Trang_thai.Ti_le_khuyen_mai))  //number
        var Hang_moi = Hoa_tuoi.Trang_thai.Hang_moi_ve  //true - false

        // Thể hiện card sản phẩm
        var The_hien = document.createElement("div")
        The_hien.className = "col-md-2"
        var Noi_dung_HTML_card = `
            <figure class="card card-product">`

        if (Hang_moi) {
            Noi_dung_HTML_card +=
                `<span class="badge-new"> Mới </span>
            <div class="img-wrap"> <img src="${Dia_chi_Dich_vu_Media}/${Hoa_tuoi.Ma_so}.jpg"></div>
            <figcaption class="info-wrap">
            <h6 class="title "><a href="#">${Hoa_tuoi.Ten}</a></h6>
            <div class="price-wrap">`

        } else {
            Noi_dung_HTML_card +=
                `<div class="img-wrap"> <img src="${Dia_chi_Dich_vu_Media}/${Hoa_tuoi.Ma_so}.jpg"></div>
            <figcaption class="info-wrap">
            <h6 class="title "><a href="#">${Hoa_tuoi.Ten}</a></h6>
            <div class="price-wrap">`
        }

        if (Hoa_tuoi.Trang_thai.Ti_le_khuyen_mai != 0) {
            Noi_dung_HTML_card +=
                `<span class="price-new">${Tao_Chuoi_The_hien_So_nguyen_duong(Gia_khuyen_mai)} đ</span>
            <del class="price-old">${Tao_Chuoi_The_hien_So_nguyen_duong(Gia_goc)} đ</del>
            </div> 
            </figcaption>
            </figure>`
        } else {
            Noi_dung_HTML_card +=
                `<span class="price-new">${Tao_Chuoi_The_hien_So_nguyen_duong(Gia_goc)} đ</span>
            </div> 
            </figcaption>
            </figure>`
        }
        The_hien.innerHTML = Noi_dung_HTML_card
        Th_Cha.appendChild(The_hien)


        // Sự kiện thêm sản phẩm vào Giỏ hàng 
        The_hien.onclick = () => {
            
            // Khởi tạo sự kiện "CHON"
            The_hien.classList.toggle("CHON")
            //alert(The_hien.getAttribute("data"))

            // Lưu danh sách các sản phẩm vào Session Storage 
            var ds = []
            if (sessionStorage.getItem("Danh_sach_Chon") != undefined) {
                ds = JSON.parse(sessionStorage.getItem("Danh_sach_Chon"))
            }
            
            var vt = ds.indexOf(Hoa_tuoi.Ma_so)
            if (vt == -1) {
                ds.push(Hoa_tuoi.Ma_so) // Thêm
            } else {
                ds.splice(vt, 1) // Xóa
            }

            if (ds.length > 0) {
                sessionStorage.setItem("Danh_sach_Chon", JSON.stringify(ds)) //thêm vào danh sách
            } else {
                sessionStorage.removeItem("Danh_sach_Chon") //xóa khỏi danh sách
            }

            //Thể hiện số lượng sản phẩm trên icon Giỏ hàng
            Th_Gio_hang_So_luong_SP.innerHTML = `<u>${ds.length}</u>`
        }



    })
}


//************************* CÁC HÀM XỬ LÝ SỐ, NGÀY (Mr. Tuan)*******************************************************


//***************** Xử lý biến Số nguyên *****************
function Nhap_So_nguyen_duong(Th_So_nguyen) {
    var Kq = {}
    Kq.So_nguyen = parseInt(Th_So_nguyen.value.trim())
    Kq.Hop_le = !isNaN(Kq.So_nguyen) && Kq.So_nguyen > 0
    return Kq
}

function Tao_Chuoi_The_hien_So_nguyen_duong(So_nguyen) {
    var Chuoi_The_hien = ""
    var Chuoi_So_nguyen = So_nguyen.toString()
    var So_Ky_so = Chuoi_So_nguyen.length
    if (So_Ky_so % 3 == 0) {
        for (var Chi_so = 0; Chi_so < Chuoi_So_nguyen.length; Chi_so++) {
            Chuoi_The_hien += Chuoi_So_nguyen[Chi_so]
            if (Chi_so % 3 == 2 && Chi_so < Chuoi_So_nguyen.length - 1)
                Chuoi_The_hien += "."
        }
    } else if (So_Ky_so % 3 == 1) {
        Chuoi_The_hien = Chuoi_So_nguyen[0]
        if (So_Ky_so > 1)
            Chuoi_The_hien += "."
        Chuoi_So_nguyen = Chuoi_So_nguyen.slice(1)
        for (var Chi_so = 0; Chi_so < Chuoi_So_nguyen.length; Chi_so++) {
            Chuoi_The_hien += Chuoi_So_nguyen[Chi_so]
            if (Chi_so % 3 == 2 && Chi_so < Chuoi_So_nguyen.length - 1)
                Chuoi_The_hien += "."

        }
    } else if (So_Ky_so % 3 == 2) {
        Chuoi_The_hien = Chuoi_So_nguyen[0] + Chuoi_So_nguyen[1]
        if (So_Ky_so > 2)
            Chuoi_The_hien += "."
        Chuoi_So_nguyen = Chuoi_So_nguyen.slice(2)
        for (var Chi_so = 0; Chi_so < Chuoi_So_nguyen.length; Chi_so++) {
            Chuoi_The_hien += Chuoi_So_nguyen[Chi_so]
            if (Chi_so % 3 == 2 && Chi_so < Chuoi_So_nguyen.length - 1)
                Chuoi_The_hien += "."
        }
    }
    return Chuoi_The_hien
}

//***************** Xử lý Biến Số thực *****************

function Nhap_So_thuc_duong(Th_So_thuc) {
    var Kq = {}
    Kq.So_thuc = parseInt(Th_So_thuc.value.trim())
    Kq.Hop_le = !isNaN(Kq.So_thuc) && Kq.So_thuc > 0
    return Kq
}

function Tao_Chuoi_The_hien_So_thuc_duong(So_thuc, So_so_le) {
    So_thuc = parseFloat(So_thuc)
    var Chuoi_The_hien = ""
    if (!So_so_le)
        So_so_le = 2
    var Thanh_phan_con = So_thuc
        .toFixed(So_so_le)
        .split(".")
    Chuoi_The_hien = Tao_Chuoi_The_hien_So_nguyen_duong(Thanh_phan_con[0])
    if (Thanh_phan_con.length == 2 && parseInt(Thanh_phan_con[1]) != 0 && So_so_le > 0)
        Chuoi_The_hien += "," + Tao_Chuoi_The_hien_So_nguyen_duong(Thanh_phan_con[1])
    return Chuoi_The_hien
}

function Tao_Chuoi_The_hien_Tien(So_tien, n) {
    if (!n)
        n = 0

    var Chuoi_The_hien = Tao_Chuoi_The_hien_So_thuc_duong(So_tien, n)

    return Chuoi_The_hien
}

//***************** Xử lý với Biến Ngày *****************

function La_Ngay_Hien_hanh(Ngay) {
    var Ngay_Hien_hanh = new Date()
    Ngay = new Date(Ngay)
    var Kq = Ngay_Hien_hanh.getDate() == Ngay.getDate() &&
        Ngay_Hien_hanh.getMonth() == Ngay.getMonth() &&
        Ngay_Hien_hanh.getFullYear() == Ngay.getFullYear()

    return Kq
}

function Tao_Chuoi_The_hien_Ngay(Ngay) {
    var Chuoi_The_hien = ""
    if (!Ngay)
        Ngay = new Date()
    Chuoi_The_hien = Ngay.getDate() + "/" + (Ngay.getMonth() + 1) + "/" + Ngay.getFullYear()
    return Chuoi_The_hien
}

function Tao_Chuoi_The_hien_Gio(Ngay) {
    var Chuoi_The_hien = ""
    if (!Ngay)
        Ngay = new Date()
    Chuoi_The_hien = Ngay.getHours() + ":" + Ngay.getMinutes() + ":" + Ngay.getMinutes()
    return Chuoi_The_hien
}

function Tao_Chuoi_The_hien_Ngay_Gio(Ngay) {
    var Chuoi_The_hien = Tao_Chuoi_The_hien_Ngay(Ngay) + " " + Tao_Chuoi_The_hien_Gio(Ngay)
    return Chuoi_The_hien
}

function Kiem_tra_Ngay(Chuoi_ngay) {
    var Thanh_phan_con = Chuoi_ngay.split("/")
    var Hop_le = Thanh_phan_con.length == 3 && !isNaN(Thanh_phan_con[0]) && !isNaN(Thanh_phan_con[1]) && !isNaN(Thanh_phan_con[2])
    if (Hop_le) {
        var Ng = parseInt(Thanh_phan_con[0])
        var Th = parseInt(Thanh_phan_con[1])
        var Nm = parseInt(Thanh_phan_con[2])
        var So_ngay_cua_Th = new Date(Nm, Th, 0).getDate()
        // var So_ngay_cua_Th = new Date(Nm, Th+1 , 0).getDate()
        Hop_le = Ng >= 1 && Ng <= So_ngay_cua_Th && Th >= 1 && Th <= 12 && Nm > 0
    }
    return Hop_le
}

function Nhap_Ngay(Th_Ngay) {
    var Kq = {}
    var Chuoi_Ngay = Th_Ngay
        .value
        .trim()
    Kq.Hop_le = Kiem_tra_Ngay(Chuoi_Ngay)
    if (Kq.Hop_le) {
        var Thanh_phan_con = Chuoi_ngay.split("/")
        Kq.Ngay = new Date(Thanh_phan_con[1] + "-" + Thanh_phan_con[0] + "-" + Thanh_phan_con[2])
    }

    return Kq
}