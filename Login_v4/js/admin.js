let arrProduct = [];
let arrnameproduct = [];
let arrhoten = [];
var today = new Date();
var day = today.getDay();
var date = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var day_name = "";
let products = {} || products
let nhap = {} || nhap
let xuat = {} || xuat
let customer = {} || customer
let tratien = {} || tratien



customer.gethoten = function() {
    $.ajax({
        url: "  http://localhost:3000/Customer",
        method: "GET",
        dataType: "JSON",
        success: function(data) {
            $.each(data, function(i, v) {
                arrhoten.push(v.Name)
            })
            var input = $("#tenkhachhang")[0]
            new Awesomplete(input, { list: arrhoten })
        }
    })
}

customer.gethoten2 = function() {
    $.ajax({
        url: "  http://localhost:3000/Customer",
        method: "GET",
        dataType: "JSON",
        success: function(data) {
            $.each(data, function(i, v) {
                arrhoten.push(v.Name)
            })
            var input = $("#khachhangtratien")[0]
            new Awesomplete(input, { list: arrhoten })
        }
    })
}

function getproduct() {
    var input = document.getElementById("tenmathang")
    new Awesomplete(input, { list: arrnameproduct })
}

switch (day) {
    case 0:
        day_name = "Chủ nhật";
        break;
    case 1:
        day_name = "Thứ hai";
        break;
    case 2:
        day_name = "Thứ ba";
        break;
    case 3:
        day_name = "Thứ tư";
        break;
    case 4:
        day_name = "Thứ năm";
        break;
    case 5:
        day_name = "Thứ sau";
        break;
    case 6:
        day_name = "Thứ bảy";
}

$("#date").append(day_name + "," + date)

products.dataAdmin = function() {
    $.ajax({
        url: " http://localhost:3000/products",
        method: "GET",
        dataType: "JSON",
        success: function(data) {
            $("#dataAdmin").empty()
            $.each(data, function(i, v) {
                arrProduct.push(v);
                arrnameproduct.push(v.NameProduct)
                let p = +v.Price;
                p = p.toLocaleString("it-IT", { style: "currency", currency: "VND" }),
                    $("#dataAdmin").append(
                        '<tr><td>' + (i + 1) + '</td>' +
                        '<td>' + v.NameProduct + '</td>' +
                        '<td id="tinhtrang' + i + '"></td>' +
                        '<td>' + v.Amount + '</td>' +
                        '<td>' + p + '</td>' +
                        '</tr> ')
                if (v.Amount == 0) {
                    $("#tinhtrang" + i).append('<div class="alert alert-danger" role="alert">' +
                        'Đã hết hàng' +
                        '</div>')
                }
                if (v.Amount <= 2 && v.Amount > 0) {
                    $("#tinhtrang" + i).append('<div class="alert alert-waring" role="alert">' +
                        'Sắp hết hàng' +
                        '</div>')
                }
                if (v.Amount > 2) {
                    $("#tinhtrang" + i).append('<div class="alert alert-success" role="alert">' +
                        'Còn' +
                        '</div>')
                }
            })
            $('#dataTable').DataTable();
        }

    })

}

products.modal = function() {
    $.ajax({
        url: " http://localhost:3000/products",
        method: "GET",
        dataType: "JSON",
        success: function(data) {
            $("#tensp").empty()
            $.each(data, function(i, v) {
                $("#tensp").append(
                    '<label for="basic-url" class="form-label text-middle" id="txtnp' + v.id + '">' + v.NameProduct + '</label>' +
                    '<div class="input-group mb-3 px-lg-5">' +
                    '<span class="input-group-text">Số Lượng</span>' +
                    '<input type="number" class="form-control"  id="txtsl' + v.id + '">' +
                    '<span class="input-group-text">Giá</span>' +
                    '<input type="number" class="form-control"  id="txtg' + v.id + '"></div>')
            })
        }
    })
}

products.modalxuat = function() {
    $.ajax({
        url: " http://localhost:3000/products",
        method: "GET",
        dataType: "JSON",
        success: function(data) {
            $("#tensp").empty()
            $.each(data, function(i, v) {
                $("#thongtinxuat").append()
            })
        }
    })
}

products.luu = function() {
    lsnhaphang();
    for (let i = 0; i < arrProduct.length; i++) {
        products.update(arrProduct[i].id, arrProduct[i].Amount, arrProduct[i].NameProduct)
    }

    products.dataAdmin();
}
products.update = function(id, sl, nameproduct) {
    let obj = {};
    obj.NameProduct = nameproduct
    obj.Amount = +$("#txtsl" + id).val() + sl
    obj.Price = +$("#txtg" + id).val()
    $.ajax({
        url: 'http://localhost:3000/products/' + id,
        method: "PUT", //GET POST PUT DELETE
        dataType: "JSON",
        contentType: "application/JSON",
        data: JSON.stringify(obj)
    })
}

function lsnhaphang() {
    let dshangnhap = [];
    for (let i = 0; i < arrProduct.length; i++) {
        let obj = {};
        obj.id = arrProduct[i].id
        obj.NameProduct = arrProduct[i].NameProduct
        obj.Amount = +$("#txtsl" + arrProduct[i].id).val()
        obj.Price = +$("#txtg" + arrProduct[i].id).val()
        if (+$("#txtsl" + arrProduct[i].id).val()) {
            dshangnhap.push(obj)
        }
    }
    nhap.lsnhap(dshangnhap);
}
nhap.lsnhap = function(DS) {
    let obj = {};
    obj.ds = DS
    obj.date = date
    $.ajax({
        url: 'http://localhost:3000/nhap',
        method: "POST", //GET POST PUT DELETE
        dataType: "JSON",
        contentType: "application/JSON",
        data: JSON.stringify(obj)
    })
}

xuat.lsxuat = function() {
    let obj = {};
    obj.Customer = $("#tenkhachhang").val()
    obj.NameProduct = $("#tenmathang").val()
    obj.Amount = +$("#soluong").val()
    obj.Price = +$("#gia").val()
    obj.Date = date
    obj.tinhtrang = $("#tinhtrang").val()

    $.ajax({
        url: 'http://localhost:3000/xuat',
        method: "POST", //GET POST PUT DELETE
        dataType: "JSON",
        contentType: "application/JSON",
        data: JSON.stringify(obj)
    })
}

tratien.lstratien = function() {
    let obj = {};
    obj.name = $("#khachhangtratien").val()
    obj.date = date
    obj.sotien = $("#sotientra").val()

    $.ajax({
        url: 'http://localhost:3000/tratien',
        method: "POST", //GET POST PUT DELETE
        dataType: "JSON",
        contentType: "application/JSON",
        data: JSON.stringify(obj)
    })
}

products.updatexuat = function(id, sl, nameproduct, gia) {
    let obj = {};
    obj.NameProduct = nameproduct
    obj.Amount = sl - +$("#soluong").val()
    obj.Price = gia
    $.ajax({
        url: 'http://localhost:3000/products/' + id,
        method: "PUT", //GET POST PUT DELETE
        dataType: "JSON",
        contentType: "application/JSON",
        data: JSON.stringify(obj)
    })
}


function luuxuat() {
    let temp = false
    let temp2 = false
    for (let i = 0; i < arrhoten.length; i++) {
        if ($("#tenkhachhang").val() == arrhoten[i]) {
            temp = true;
        }
    }
    for (let i = 0; i < arrnameproduct.length; i++) {
        if ($("#tenmathang").val() == arrnameproduct[i]) {
            temp2 = true;
        }
    }

    if ($("#soluong").val() == 0 || $("#gia").val() == 0) {
        temp = false;
    }

    if (temp) {
        xuat.lsxuat();
    } else { alert("bạn hãy kiểm tra lại") }
    for (let i = 0; i < arrProduct.length; i++) {
        if ($("#tenmathang").val() == arrProduct[i].NameProduct) {
            products.updatexuat(arrProduct[i].id, arrProduct[i].Amount, arrProduct[i].NameProduct, arrProduct[i].Price)
        }
    }
    products.dataAdmin();
}

function luutratien() {
    let temp = false
    for (let i = 0; i < arrhoten.length; i++) {
        if ($("#khachhangtratien").val() == arrhoten[i]) {
            temp = true;
        }
    }

    if ($("#sotientra").val() == 0) {
        temp = false;
    }

    if (temp) {
        tratien.lstratien();
    } else { alert("bạn hãy kiểm tra lại") }
}

customer.addcustomer = function() {
    let obj = {};
    obj.Image = "../Screenshot 2021-03-31 205837.png"
    obj.Name = $("#tenkhachhangmoi").val()
    obj.PhoneNumber = $("#sdtkhachhang").val()
    obj.UserName = $("#tennguoidung").val()
    obj.Pass = $("#matkhaucap").val()
    $.ajax({
        url: 'http://localhost:3000/Customer',
        method: "POST", //GET POST PUT DELETE
        dataType: "JSON",
        contentType: "application/JSON",
        data: JSON.stringify(obj)
    })
}


products.addproduct = function() {
    let obj = {};
    obj.NameProduct = $("#tensanphammoi").val()
    obj.Amount = +$("#soluongsanphammoi").val()
    obj.Price = +$("#giasanphammoi").val()
    $.ajax({
        url: 'http://localhost:3000/products',
        method: "POST", //GET POST PUT DELETE
        dataType: "JSON",
        contentType: "application/JSON",
        data: JSON.stringify(obj)
    })
}


$(document).ready(function() {
    products.dataAdmin();
})