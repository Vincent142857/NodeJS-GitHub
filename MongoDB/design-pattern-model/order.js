const orderSchema = {
    _id: ObjectId("12345678"),
    user_id: Object("1001"),
    name: 'Nguyen Van A',
    state: 'pend',
    date: '2020-02-12',
    line_items: [
        {
            _id: ObjectId("2001"),
            sku: '2001',
            name: "Book 1",
            quantity: 1,
            pricing: {
                retail: 2,
                sale: 1
            }
        },
        {
            _id: ObjectId("2002"),
            sku: '2002',
            name: "Book 2",
            quantity: 1,
            pricing: {
                retail: 2,
                sale: 1
            }
        }
    ],
    shipping_address: {
        street: '123 LLA',
        city: 'HCM',
        state: 'VN',
        zip: 1111
    },
    pay_method: {
        status: 'Visa',
        number: 'xx-xxx-xxx',
        unit: 'USD'
    },
    sub_total: "tong tien" //tinh luu lai de so sanh voi font-end
}


//phep toan modulo