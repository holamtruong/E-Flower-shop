// Khai báo sử dụng module HTTP truyền dữ liệu
var NodeJs_Dich_vu = require("http")

// Gọi kết quả của module xử lý dữ liệu lưu trữ
var Luu_tru = require("../Xu_ly/XU_LY_LUU_TRU")

//Khai báo sử dụng module xử lý tham số truy vấn
var Xu_ly_Tham_so = require('querystring')

// Khai báo cổng giao tiếp
var Port = 1000


// Khởi tạo dữ liệu kiểu đối tượng
var Du_lieu = {}
// Khởi tạo dữ liệu danh sách hoa tươi
Du_lieu.Danh_sach_Hoa = Luu_tru.Doc_Du_lieu("Hoa_tuoi")
// Khởi tạo dữ liệu thông tin cửa hàng
Du_lieu.Cua_hang = Luu_tru.Doc_Thong_tin_Cua_hang()

// Khởi tạo server chạy cổng 1000
var Dich_vu = NodeJs_Dich_vu.createServer((Yeu_cau, Dap_ung) => {
    var Chuoi_Nhan = ""
    var Dia_chi_Xu_ly = Yeu_cau.url.replace("/", "")
    Yeu_cau.on('data', (chunk) => { Chuoi_Nhan += chunk })
    Yeu_cau.on('end', () => {
        var Tham_so = Xu_ly_Tham_so.parse(Dia_chi_Xu_ly.replace("?", ""))
        var Ma_so_Xu_ly = Tham_so.Ma_so_Xu_ly
        var Chuoi_Kq = ""

        // =========== Đọc danh sách dữ liệu lưu trữ ==============
        if (Ma_so_Xu_ly == "Doc_danh_sach_Du_lieu") {
            var Doi_tuong_Kq = {}
            // Gán danh sách dữ liệu hoa và thông tin cửa hàng
            Doi_tuong_Kq.Danh_sach_Hoa = Du_lieu.Danh_sach_Hoa
            Doi_tuong_Kq.Cua_hang = Du_lieu.Cua_hang
            // Chuyển kết quả về dạng chuỗi
            Chuoi_Kq = JSON.stringify(Doi_tuong_Kq)
            // Thiết lập cấp quyền cho Header
            Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
            Dap_ung.end(Chuoi_Kq);
        }

        // =========== Ghi phiếu đặt hàng vào Dữ liệu Hoa_tuoi  =============
        else if (Ma_so_Xu_ly == "Ghi_Phieu_Dat_hang") {
            // Khởi tạo kết quả đặt hàng
            var Kq_Dat_hang = ""
            //Khởi tạo danh sách phiếu đặt hàng
            var DsPhieu_Dat_hang = JSON.parse(Chuoi_Nhan)
            Dap_ung.setHeader("Access-Control-Allow-Origin", '*')

            //Ghi phiếu đặt hàng
            DsPhieu_Dat_hang.forEach(Phieu => {
                var Hoa_tuoi = Du_lieu.Danh_sach_Hoa.find(x => x.Ma_so == Phieu.Hoa_tuoi.Ma_so)
                var So_Phieu_Dat = 1
                if (Hoa_tuoi.Danh_sach_Phieu_Dat == undefined) {
                    Hoa_tuoi.Danh_sach_Phieu_Dat = []
                }
                So_Phieu_Dat = Hoa_tuoi.Danh_sach_Phieu_Dat.length + 1
                Phieu.Phieu_Dat.So_Phieu_Dat = So_Phieu_Dat
                Hoa_tuoi.Danh_sach_Phieu_Dat.push(Phieu.Phieu_Dat)
                // Ghi vào file dữ liệu
                Kq_Dat_hang = Luu_tru.Cap_nhat_Doi_tuong("Hoa_tuoi", Hoa_tuoi)
                if (Kq_Dat_hang == "") {
                    Chuoi_Kq = "OK"
                } else {
                    Dien_thoai.Danh_sach_Phieu_Dat.pop()
                    Chuoi_Kq = "Error"
                }
                Dap_ung.end(Chuoi_Kq); //Xuất chuỗi kết quả là "OK"
            })
        }

        // ============= Đọc trang HTML thông tin của dịch vụ =================
        else {
            Chuoi_Kq = Luu_tru.Doc_Thong_tin_Dich_vu()
            Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
            Dap_ung.end(Chuoi_Kq);
        }
    })
})

// Lắng nghe cổng 1000 thực hiện chương trình
Dich_vu.listen(Port,
    console.log(`Dịch vụ Dữ liệu đang chạy: http://localhost:${Port}`)
);


//Test kết quả
console.log("----Kiểm tra kết quả---")
console.log(Du_lieu)