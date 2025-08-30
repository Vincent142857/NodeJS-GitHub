//thiết kế cho collection Cameras như sau:
const p1 = [
    {
        "_id": ObjectId("62a17a9edc2048a3b9eb654c"),
        "GTIN": 'CAMERA-0001',
        "name": "X7800",
        "brand": "Cannon",
        "description": "The camera with the highest resolution",
        "release_date": ISODate("2022-06-09T04:44:14.544Z"),
        "resolution_Mp": 36,
        "technology": "ANS-3000",
        "weight_g": 365,
        "height": 98,
        "width": 125,
        "depth": 70,
        "video_resolution": "1920 x 1080"
    }
]

/**
 * Nhưng điều gì xảy ra nếu chúng ta cho chúng hiển thị cả hai dữ liệu đó trên cùng một page. Hay thực tế là Lịch sử người dùng xem hàng. Cho nên cách này không ổn chút nào, chúng ta đi xem xét cách tiếp theo.
 */

const p2 = [
    {
        "_id": ObjectId("62a17a9edc2048a3b9eb654c"),
        "code": 'CAMERA-0001',
        "name": "X7800",
        "brand": "Cannon",
        "description": "The camera with the highest resolution",
        "release_date": ISODate("2022-06-09T04:44:14.544Z"),
        "weight_g": 365,
        "specs": [
            { "resolution_Mp": 36 },
            { "technology": "ANS-3000" },
            { "height": 98 },
            { "width": 125 },
            { "depth": 70 },
            { "video_resolution": "1920 x 1080" }
        ]
    },
    {
        "_id": ObjectId("62a17a9edc2048a3b9eb654d"),
        "code": "NGK-12345",
        "name": "Nha gia kim",
        "brand": "Amazon",
        "description": "A book to understand about me",
        "release_date": ISODate("2022-06-09T04:44:14.544Z"),
        "weight_g": 365,
        "specs": [
            { "author": "Paulo Coelho" },
            { "editor": "Amazon" },
            { "pages": 100 }
        ]
    },
]
/**
 * Đó chính là Polymorphic model mà chúng ta muốn áp dụng,
 *  mô hình này giúp bạn có thể lưu trữ đa hình các sản phẩm một cách dễ dàng. 
 * Đương nhiên mọi thứ đều có hai mặt, ưu và nhược.
 * Ưu: Dễ dàng thực hiện việc lưu trữ, ngoài ra dễ dàng hiện thị các sản phẩm trên một trang.
 * Nhược: Khó khăn vì dữ diệu không đồng nhất.
 */



/**
 * Để hoàn chỉnh một shema Products thì Polymorphic model là chưa đủ.
 *  Háy xem xét thêm môt pattern mới của Mongodb đó là Attribute model.
 */

const p3 = [
    {
        "_id": ObjectId("62a17a9edc2048a3b9eb654c"),
        "code": 'CAMERA-0001',
        "name": "X7800",
        "brand": "Cannon",
        "description": "The camera with the highest resolution",
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
    },
    {
        "_id": ObjectId("62a17a9edc2048a3b9eb654d"),
        "code": "NGK-12345",
        "name": "Nha gia kim",
        "brand": "Amazon",
        "description": "A book to understand about me",
        "release_date": ISODate("2022-06-09T04:44:14.544Z"),
        "weight_g": 365,
        "specs": [
            { k: "author", v: "Paulo Colho" },
            { k: "editor", v: "Amazon" },
            { k: "pages", v: 100 }
        ]
    },
]
// Shema.createIndexes({ "specs.k": 1, "specs.v": 1})

/**
 * Tôi sẽ thay thế tất cả các thuộc tính trong specs bằng cách sử dụng {k,v ...} Sau khi thao tác xong thì đánh index lại như sau:
 * shema.createIndexes({ "specs.k": 1, "specs.v": 1})
 */