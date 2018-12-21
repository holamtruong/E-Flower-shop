// Khai báo sử dụng module HTTP truyền dữ liệu
var http = require("http");

// Gọi kết quả của module xử lý dữ liệu lưu trữ
var Luu_tru = require("../Xu_ly/XU_LY_LUU_TRU")

// Khai báo cổng kết nối
var Port = 1001

//Khai báo sử dụng module xử lý tham số truy vấn
var Xu_ly_Tham_so = require('querystring')

// Khởi tạo server chạy cổng 1001
var Dich_vu = http.createServer(
    (Yeu_cau, Dap_ung) => {
        var Chuoi_Nhan = ""
        var Nhi_phan_Kq = ""
        var Ten = Yeu_cau.url.replace("/", "")

        Yeu_cau.on('data', (chunk) => { Chuoi_Nhan += chunk })
        Yeu_cau.on('end', () => {

            //Đọc yêu tham số xử lý
            if (Yeu_cau.method == "GET" && Ten != "") {
                //Lấy chuỗi nhị phân media của hoa tươi
                var Nhi_phan_Kq_Hoa_tuoi = ""
                Nhi_phan_Kq_Hoa_tuoi = Luu_tru.Doc_Nhi_phan_Media_Hoa_tuoi(Ten)    //kết quả là chuỗi nhị phân
                //Lấy chuỗi nhị phân media của cửa hàng
                var Nhi_phan_Kq_Cua_hang = ""
                Nhi_phan_Kq_Cua_hang = Luu_tru.Doc_Nhi_phan_Media_Cua_hang(Ten)    //kết quả là chuỗi nhị phân

                // Kiểm tra và trả về media của hoa tươi
                if (Nhi_phan_Kq_Hoa_tuoi != "") {
                    Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
                    Dap_ung.writeHead(200, { 'Content-Type': 'image/png' });
                    Dap_ung.end(Nhi_phan_Kq_Hoa_tuoi, 'binary');               //kết quả là hình ảnh

                    // Kiểm tra và trả về media của cửa hàng
                } else {
                    Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
                    Dap_ung.writeHead(200, { 'Content-Type': 'image/png' });
                    Dap_ung.end(Nhi_phan_Kq_Cua_hang, 'binary');                //kết quả là hình ảnh
                }
            }


            //Đọc HTML trang thông tin dịch vụ
            else {
                Chuoi_Kq = Luu_tru.Thong_tin_Dich_vu()
                Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
                Dap_ung.end(Chuoi_Kq);
            }
        })
    })

// Lắng nghe kết quả tại cổng 1001
Dich_vu.listen(Port,
    console.log("Dịch vụ Media đang thực thi ...http://localhost:" + Port)
)
