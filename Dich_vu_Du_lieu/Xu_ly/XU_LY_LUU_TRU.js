// Khai báo sử dụng module File System cho phép đọc, ghi dữ liệu
var File = require("fs")

// Khai đường dẫn thư mục chứa dữ liệu và kiểu dữ liệu
var Thu_muc_Du_lieu = "Du_lieu_Luu_tru"
var Cong_nghe = "json"


// Hàm đọc thông tin của dịch vụ
function Doc_Thong_tin_Dich_vu() {
    var Duong_dan = "index.html"
    var Chuoi_Thong_tin = File.readFileSync(Duong_dan, "UTF-8")
    return Chuoi_Thong_tin
}


// Hàm đọc thông tin của cửa hàng
function Doc_Thong_tin_Cua_hang() {
    var Duong_dan = `${Thu_muc_Du_lieu}/Cua_hang/Cua_hang.json`
    var Chuoi_Thong_tin = File.readFileSync(Duong_dan, "UTF-8")
    return JSON.parse(Chuoi_Thong_tin)
}


// Khởi tạo lớp xử lý lưu trữ
class XL_LUU_TRU {

    // Hàm đọc danh sách hoa
    Doc_Du_lieu(Loai_Doi_tuong) {
        var Danh_sach = []
        var Duong_dan = Thu_muc_Du_lieu + "//" + Loai_Doi_tuong
        var Danh_sach_Ten_Tap_tin = File.readdirSync(Duong_dan, "UTF-8")
        //Duyệt danh sách hoa
        Danh_sach_Ten_Tap_tin.forEach(Ten => {
            if (Ten.toLowerCase().endsWith(Cong_nghe)) {
                var Chuoi = File.readFileSync(Duong_dan + "//" + Ten, "UTF-8")
                var Doi_tuong = JSON.parse(Chuoi)
                Danh_sach.push(Doi_tuong)
            }
        })
        return Danh_sach // Trả về đối tượng là danh sách tất cả hoa
    }

    //Hàm đọc thông tin cửa hàng
    Doc_Thong_tin_Cua_hang() {
        return Doc_Thong_tin_Cua_hang() // Trả về đối tượng là thông tin cửa hàng
    }

    //Hàm đọc thông tin dịch vụ
    Doc_Thong_tin_Dich_vu() {
        return Doc_Thong_tin_Dich_vu() // Trả về HTML trang cung cấp dịch vụ
    }
}



//Publish để các file js khác gọi 
var Xu_ly = new XL_LUU_TRU
module.exports = Xu_ly




