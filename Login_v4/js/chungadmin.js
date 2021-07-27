let user = {} || user;


user.getInfor = function() {
    $.ajax({
        url: "http://localhost:3000/session/0",
        method: "GET",
        dataType: "JSON",
        success: function(data) {
            user.getUser(data.cus_id)
        }
    })
}

user.getUser = function(id) {
    $.ajax({
        url: "http://localhost:3000/Admin/" + id,
        method: "GET",
        dataType: "JSON",
        success: function(data) {
            $("#hoten").append(data.Name)
        }
    })
}

function dangxuat() {
    window.location.href = "file:///C:/Users/PC/Desktop/QuanLyPhanBon/Home.html";
}
$(document).ready(function() {
    user.getInfor();
})