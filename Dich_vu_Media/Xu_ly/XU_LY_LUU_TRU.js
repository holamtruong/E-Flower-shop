// Gọi module File System đọc, ghi dữ liệu
var File = require("fs")

// Khai báo đường dẫn lưu media
var Thu_muc_Media_Hoa_tuoi = "Media/Hoa_tuoi"
var Thu_muc_Media_Cua_hang = "Media/Cua_hang"


// Hàm decode media thành chuỗi nhị phân

/* function decodeBase64Image(dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};
    if (matches.length !== 3) {
        return new Error('Lỗi ...');
    }
    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');
    return response;
} */

// Hàm đọc HTML thông tin trang dịch vụ
function Doc_Thong_tin_Dich_vu() {
    var Duong_dan = "index.html"
    var Chuoi_Thong_tin = File.readFileSync(Duong_dan, "UTF-8")
    return Chuoi_Thong_tin
}

// Khởi tạo lớp xử lý lưu trữ media
class XL_LUU_TRU {

    // Đọc thông tin trang dịch vụ
    Thong_tin_Dich_vu() {
        return Doc_Thong_tin_Dich_vu()
    }

    // Đọc chuỗi nhị phân của media của hoa tươi
    Doc_Nhi_phan_Media_Hoa_tuoi(Ten_Tap_tin) {
        var Nhi_phan = ""
        var Duong_dan = Thu_muc_Media_Hoa_tuoi + "//" + Ten_Tap_tin
        if (File.existsSync(Duong_dan))
            Nhi_phan = File.readFileSync(Duong_dan)
        return Nhi_phan     // trả về chuỗi nhị phân
    }

    // Đọc chuỗi nhị phân của media của cửa hàng
    Doc_Nhi_phan_Media_Cua_hang(Ten_Tap_tin) {
        var Nhi_phan = ""
        var Duong_dan = Thu_muc_Media_Cua_hang + "//" + Ten_Tap_tin
        if (File.existsSync(Duong_dan))
            Nhi_phan = File.readFileSync(Duong_dan)
        return Nhi_phan     // trả về chuỗi nhị phân
    }
}

//Publish để các file js khác đọc
var Xu_ly = new XL_LUU_TRU
module.exports = Xu_ly




