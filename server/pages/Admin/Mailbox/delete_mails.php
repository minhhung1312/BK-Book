<?php
header('Access-Control-Allow-Origin: *');
include '../../../db/conn.php';

$mails = $_GET['mails'];

$sql = "DELETE FROM `mail` WHERE ID IN ({$mails});";
if (mysqli_query($conn, $sql)) {
    header('Content-Type: application/json');
    echo json_encode(['code' => 'sucessed']);
} else {
    header('Content-Type: application/json');
    echo json_encode(['code' => 'failed']);
}
exit;
/*
INSERT INTO MAIL
VALUES ('M1', 'phamdaihoangan', 'Nhà sách Bahasa', 'ĐỀ NGHỊ MUA LẠI TÊN THƯƠNG HIỆU', '
Thân gửi các bạn SV,

Hàng năm, Tập đoàn Vingroup tài trợ học bổng toàn phần cho các sinh viên Việt Nam tài năng theo học bậc Thạc sĩ, Tiến sĩ trong các ngành Khoa học, kỹ thuật, công nghệ tại các trường đại học hàng đầu thế giới. 
Từ năm 2019 đến nay, sau gần 4 năm triển khai, Chương trình Học bổng Khoa học Công nghệ Vingroup đã tuyển chọn được 136 học viên xuất sắc theo học tại các trường đại học hàng đầu thế giới như ĐH Harvard, ĐH Cornell, ĐH Pennsylvania, ĐH Johns Hopkins, ĐH Columbia, ĐH California tại San Diego (Hoa Kỳ); ĐH Oxford (Vương quốc Anh); Trường Bách khoa Liên bang Lausanne (EPFL – Thụy Sĩ); ĐH Công nghệ Nanyang và ĐH Quốc gia Singapore; ĐH Quốc gia Úc, ĐH Melbourne, ĐH Sydney, ĐH New South Wales (Úc); ĐH Sorbonne (Pháp); Viện Kỹ thuật Tokyo (Nhật Bản) và nhiều trường ĐH danh tiếng khác trên thế giới. Trong đó, từ năm 2029 đến năm 2022, đã có 14 sinh viên từ Trường Đại học Bách khoa – ĐHQG-HCM nhận học bổng Vingroup
', '2020-10-27', 0);
INSERT INTO MAIL
VALUES ('M2', 'phamdaihoangan', 'Trường Đại Học Bách Khoa', 'Về việc trả phí hàng tháng cho sinh viên', '
Thân gửi các bạn SV,

Hàng năm, Tập đoàn Vingroup tài trợ học bổng toàn phần cho các sinh viên Việt Nam tài năng theo học bậc Thạc sĩ, Tiến sĩ trong các ngành Khoa học, kỹ thuật, công nghệ tại các trường đại học hàng đầu thế giới. 
Từ năm 2019 đến nay, sau gần 4 năm triển khai, Chương trình Học bổng Khoa học Công nghệ Vingroup đã tuyển chọn được 136 học viên xuất sắc theo học tại các trường đại học hàng đầu thế giới như ĐH Harvard, ĐH Cornell, ĐH Pennsylvania, ĐH Johns Hopkins, ĐH Columbia, ĐH California tại San Diego (Hoa Kỳ); ĐH Oxford (Vương quốc Anh); Trường Bách khoa Liên bang Lausanne (EPFL – Thụy Sĩ); ĐH Công nghệ Nanyang và ĐH Quốc gia Singapore; ĐH Quốc gia Úc, ĐH Melbourne, ĐH Sydney, ĐH New South Wales (Úc); ĐH Sorbonne (Pháp); Viện Kỹ thuật Tokyo (Nhật Bản) và nhiều trường ĐH danh tiếng khác trên thế giới. Trong đó, từ năm 2029 đến năm 2022, đã có 14 sinh viên từ Trường Đại học Bách khoa – ĐHQG-HCM nhận học bổng Vingroup
', '2020-10-28', 1);
INSERT INTO MAIL
VALUES ('M3', 'phamdaihoangan', 'Nhà Sách Nguyễn Văn Cừ', 'Về việc hợp tác cùng nhau phát triển', '
Thân gửi các bạn SV,

Hàng năm, Tập đoàn Vingroup tài trợ học bổng toàn phần cho các sinh viên Việt Nam tài năng theo học bậc Thạc sĩ, Tiến sĩ trong các ngành Khoa học, kỹ thuật, công nghệ tại các trường đại học hàng đầu thế giới. 
Từ năm 2019 đến nay, sau gần 4 năm triển khai, Chương trình Học bổng Khoa học Công nghệ Vingroup đã tuyển chọn được 136 học viên xuất sắc theo học tại các trường đại học hàng đầu thế giới như ĐH Harvard, ĐH Cornell, ĐH Pennsylvania, ĐH Johns Hopkins, ĐH Columbia, ĐH California tại San Diego (Hoa Kỳ); ĐH Oxford (Vương quốc Anh); Trường Bách khoa Liên bang Lausanne (EPFL – Thụy Sĩ); ĐH Công nghệ Nanyang và ĐH Quốc gia Singapore; ĐH Quốc gia Úc, ĐH Melbourne, ĐH Sydney, ĐH New South Wales (Úc); ĐH Sorbonne (Pháp); Viện Kỹ thuật Tokyo (Nhật Bản) và nhiều trường ĐH danh tiếng khác trên thế giới. Trong đó, từ năm 2029 đến năm 2022, đã có 14 sinh viên từ Trường Đại học Bách khoa – ĐHQG-HCM nhận học bổng Vingroup
', '2020-10-29', 0);
INSERT INTO MAIL
VALUES ('M4', 'phamdaihoangan', 'Đặng Mai Hương', 'Về việc mượn sách của Nguyễn Nhật Ánh', '
Thân gửi các bạn SV,

Hàng năm, Tập đoàn Vingroup tài trợ học bổng toàn phần cho các sinh viên Việt Nam tài năng theo học bậc Thạc sĩ, Tiến sĩ trong các ngành Khoa học, kỹ thuật, công nghệ tại các trường đại học hàng đầu thế giới. 
Từ năm 2019 đến nay, sau gần 4 năm triển khai, Chương trình Học bổng Khoa học Công nghệ Vingroup đã tuyển chọn được 136 học viên xuất sắc theo học tại các trường đại học hàng đầu thế giới như ĐH Harvard, ĐH Cornell, ĐH Pennsylvania, ĐH Johns Hopkins, ĐH Columbia, ĐH California tại San Diego (Hoa Kỳ); ĐH Oxford (Vương quốc Anh); Trường Bách khoa Liên bang Lausanne (EPFL – Thụy Sĩ); ĐH Công nghệ Nanyang và ĐH Quốc gia Singapore; ĐH Quốc gia Úc, ĐH Melbourne, ĐH Sydney, ĐH New South Wales (Úc); ĐH Sorbonne (Pháp); Viện Kỹ thuật Tokyo (Nhật Bản) và nhiều trường ĐH danh tiếng khác trên thế giới. Trong đó, từ năm 2029 đến năm 2022, đã có 14 sinh viên từ Trường Đại học Bách khoa – ĐHQG-HCM nhận học bổng Vingroup
', '2020-10-30', 1);
INSERT INTO MAIL
VALUES ('M5', 'laquocanh', 'Đặng Mai Thị Hoàng Mai', 'Gửi chơi cho vui', '
Thân gửi các bạn SV,

Hàng năm, Tập đoàn Vingroup tài trợ học bổng toàn phần cho các sinh viên Việt Nam tài năng theo học bậc Thạc sĩ, Tiến sĩ trong các ngành Khoa học, kỹ thuật, công nghệ tại các trường đại học hàng đầu thế giới. 
Từ năm 2019 đến nay, sau gần 4 năm triển khai, Chương trình Học bổng Khoa học Công nghệ Vingroup đã tuyển chọn được 136 học viên xuất sắc theo học tại các trường đại học hàng đầu thế giới như ĐH Harvard, ĐH Cornell, ĐH Pennsylvania, ĐH Johns Hopkins, ĐH Columbia, ĐH California tại San Diego (Hoa Kỳ); ĐH Oxford (Vương quốc Anh); Trường Bách khoa Liên bang Lausanne (EPFL – Thụy Sĩ); ĐH Công nghệ Nanyang và ĐH Quốc gia Singapore; ĐH Quốc gia Úc, ĐH Melbourne, ĐH Sydney, ĐH New South Wales (Úc); ĐH Sorbonne (Pháp); Viện Kỹ thuật Tokyo (Nhật Bản) và nhiều trường ĐH danh tiếng khác trên thế giới. Trong đó, từ năm 2029 đến năm 2022, đã có 14 sinh viên từ Trường Đại học Bách khoa – ĐHQG-HCM nhận học bổng Vingroup
', '2020-10-31', 0);
*/
?>