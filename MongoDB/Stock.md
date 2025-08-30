## Schema Product use Attribute model
    {
        "_id": ObjectId("62a17a9edc2048a3b9eb654c"),
        "code": 'CAMERA-0001',
        "name": "X7800",
        "brand": "Cannon",
        "description": "The mamera with the highest resolution",
        "release_date": ISODate("2022-06-09T04:44:14.544Z"),
        "weight_g": 365,
        "specs": [
            { k: "resolution_Mp", v: 36, u: "mp" },
            { k: "technology", v: "ANS-3000" },
            { K: "height", v: 98 },
            { k: "width", v: 125 },
            { k: "depth", v: 70 },
            { k: "video_resolution", v: "1920 x 1080" }
        ]
    }
https://www.youtube.com/watch?v=1sTAklCy4zk


 https://www.youtube.com/watch?v=qHqMB47liwQ

## 2 phuong phap chu dao tang/giam hang ton kho
    1. Dat hang (add to cart) va dong thoi giam hang ton kho;
        Uu diem:
            - Trai nghiem nguoi dung than thien;
            - Logic he thong don gian.
        Nhuoc diem;
            - dat hang khong chu dich;
            - Khong mua hang sau khi dat hang;
            - anh huong den doanh so ban hang that su;
        Giai phap:
            Dat thoi gian co hieu luc mua hang cho don hang;
    2. Thanh toan (nguoi dung nhan hang) va dong thoi giam hang ton kho.
        UD: Giam nhung don hang khong hop le;
        ND: Do chenh lech thoi gian giua ket qua thanh toan cua ben thu 3 nen viec thanh toan thanh cong cung luc nhieu nguoi, se khien so luong dat hang vuot qua hang ton kho.
        GP: them nhac nho, xin loi khach hang


## Quan ly hang ton kho:
 1. Dat thoi gian hieu luc thanh toan cho don hang;
 2. Dat gioi han mua hang cho nguoi mua;
 3. Kiem soat ngam, danh chan tu xa; kiem soat ky thuat.

## Add to cart
    1. Khach vang lai (chua dang nhap):
        - Tao ID ngau nhien -> luu vao cookie -> tao gio hang theo ID -> sau khi dang ky -> dong bo gio hang vao he thong (giong nhu da login);
        - Luot truy cap lon, nen gio hang thiet ke bang redis, khong phai database;
    2. Khach hang da login