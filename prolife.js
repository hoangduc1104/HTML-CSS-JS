let profile = {} || prolile
let user = {} || user;
let Customer = {} || Customer


user.getInfor = function() {
    $.ajax({
        url: "http://localhost:3000/session/0",
        method: "GET",
        dataType: "JSON",
        success: function(data) {
            profile.dataProfile(data.cus_id)
        }
    })
}

profile.dataProfile = function(id) {
    $.ajax({
        url: " http://localhost:3000/Customer/" + id,
        method: "GET",
        dataType: "JSON",
        success: function(data) {
            $("#img").attr('src', data.Image)
            $("#hoten").val(data.Name)
            $("#sdt").val(data.PhoneNumber)
        }
    })
}


Customer.uploadImg = function(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $("#img").attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
};

user.getInfor2 = function() {
    $.ajax({
        url: "http://localhost:3000/session/0",
        method: "GET",
        dataType: "JSON",
        success: function(data) {
            profile.Profile(data.cus_id)

            // window.location.href = "file:///C:/Users/PC/Desktop/QuanLyPhanBon/startbootstrap-sb-admin-2-gh-pages/customer.html";
        }
    })
}

profile.Profile = function(id) {
    $.ajax({
        url: " http://localhost:3000/Customer/" + id,
        method: "GET",
        dataType: "JSON",
        success: function(data) {
            saveinfo(id, data.Name, data.PhoneNumber, data.UserName, data.Pass)
        }
    })
}

function saveinfo(id, name, phonenumber, username, pass) {
    let Obj = {}; //
    Obj.Image = $("#img").attr("src")
    Obj.Name = name
    Obj.PhoneNumber = phonenumber
    Obj.UserName = username
    Obj.Pass = pass
    $.ajax({
        url: 'http://localhost:3000/Customer/' + id,
        method: "PUT",
        dataType: "JSON",
        contentType: "application/JSON",
        data: JSON.stringify(Obj),
        success: function(data) {}
    })
}
$(document).ready(function() {
    user.getInfor();
})