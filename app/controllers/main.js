var nguoiDungService = new NguoiDungService();

getListUser();


getELE("btnThemNguoiDung").addEventListener("click", function(){
    document.getElementsByClassName("modal-title")[0].innerHTML = "Thêm người dùng"

    var footer = `
        <button class="btn btn-success" onclick = "ThemNguoiDung()">Thêm</button>
    `
    document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
    clearInput();
})


/**
 * Thêm người dùng
 */
function ThemNguoiDung(){
    var taiKhoan = getELE("TaiKhoan").value;
    var hoTen = getELE("HoTen").value;
    var matKhau = getELE("MatKhau").value;
    var email = getELE("Email").value;
    var soDT = getELE("SoDienThoai").value;
    var loaiNguoiDung = getELE("loaiNguoiDung").value;

    var nguoiDung = new NguoiDung(taiKhoan,hoTen,matKhau,email,soDT,loaiNguoiDung);
    console.log(nguoiDung);
    nguoiDungService.themNguoiDung(nguoiDung)
    .then(function(result){
        // người dùng nhập vào thì tự load lại trang
        // location.reload();

        getListUser();
        alert("thêm người dùng thành công");
        
    })
    .catch(function(err){
        console.log(err);       
    })
}
/**xoá người dùng */
function xoaNguoiDung(id){
    console.log(id);
    nguoiDungService.xoaNguoiDung(id)
        .then(function(result){
            alert("xoá người dùng thành công");
            getListUser();
        })
        .catch(function(err){
            console.log(err);
        });
}


/**
 * sửa người dùng
 */

function suaNguoiDung(id){
    console.log(id);
    document.getElementsByClassName("modal-title")[0].innerHTML = "Sửa người dùng";
    var footer = `
    <button class = "btn btn-success" onclick = "capNhatNguoiDung(${id})">Cập nhập</button>
    `

    document.getElementsByClassName("modal-footer")[0].innerHTML = footer;

    nguoiDungService.layThongTinNguoiDung(id)
        .then(function(result){
            console.log(result.data);  
            getELE("TaiKhoan").value = result.data.taiKhoan ;
            getELE("HoTen").value = result.data.hoTen;
            getELE("MatKhau").value = result.data.matKhau;
            getELE("Email").value = result.data.email;
            getELE("SoDienThoai").value = result.data.soDT;
            getELE("loaiNguoiDung").value = result.data.loaiNguoiDung;
        })
        .catch(function(err){
            console.log(err);           
        });
}


function capNhatNguoiDung(id){
    console.log(id);
    

    var taiKhoan = getELE("TaiKhoan").value;
    var hoTen = getELE("HoTen").value;
    var matKhau = getELE("MatKhau").value;
    var email = getELE("Email").value;
    var soDT = getELE("SoDienThoai").value;
    var loaiNguoiDung = getELE("loaiNguoiDung").value;

    var nguoiDung = new NguoiDung(taiKhoan,hoTen,matKhau,email,soDT,loaiNguoiDung);
    console.log(nguoiDung);
    nguoiDungService.capNhatNguoiDung(id,nguoiDung)
    .then(function(result){
        // người dùng nhập vào thì tự load lại trang
        // location.reload();
        alert("cập nhật thành công");
        getListUser();   
    })
    .catch(function(err){
        console.log(err);       
    })
}

function clearInput(){   // xoá dữ liệu khi bấm lại vào nút thêm
    getELE('TaiKhoan').value="";
    getELE('HoTen').value="";
    getELE('MatKhau').value="";
    getELE('Email').value="";
    getELE('SoDienThoai').value="";
    getELE('loaiNguoiDung').value="";
}



/**
 * Tìm kiếm
 */


getELE('txtSearch').addEventListener("keyup", function(){
    var chuoiTimKiem = getELE("txtSearch").value;
    console.log(chuoiTimKiem);

    var danhSachNguoiDung =  getLocalStorage();


    var mangTimKiem =  nguoiDungService.timKiemNguoiDung(chuoiTimKiem,danhSachNguoiDung);

    console.log(mangTimKiem);
    renderTable(mangTimKiem);
});


/**lưu dữ liệu xuống local Storage */
function setLocalStorage(danhSachNguoiDung){
    // lưu xuống chuyển từ json qua string nó mới lưu được
    localStorage.setItem("DSND", JSON.stringify(danhSachNguoiDung));
}

function getLocalStorage(){
    // lấy lên chuyển string qua json

     return JSON.parse(localStorage.getItem("DSND"));
  
}



function getListUser(){
    nguoiDungService.layDanhSachNguoiDung()
    .then(function(result){
        console.log(result.data);
        this.mangNguoiDung = result.data;
        renderTable(result.data);     
        setLocalStorage(result.data);          
    })
    .catch(function(errors){
        console.log(errors);               
    });
    
}

function renderTable(mangNguoiDung){   

    var contentHTML = "";
    mangNguoiDung.map(function(item, index){
        contentHTML += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.taiKhoan}</td>   
                    <td>${item.hoTen}</td>   
                    <td>${item.matKhau}</td>   
                    <td>${item.email}</td> 
                    <td>${item.soDT}</td>  
                    <td>${item.maLoaiNguoiDung}</td>
                    <td>
                        <button class="btn btn-success" onclick="suaNguoiDung('${item.id}')" data-toggle="modal" data-target="#myModal">Sửa</button> 
                        <button class="btn btn-danger" onclick="xoaNguoiDung('${item.id}')">Xoá</button>    
                    </td>
                </tr>

                `;

    });
    document.getElementById("tblDanhSachNguoiDung").innerHTML = contentHTML;
}

function getELE(id){
    return document.getElementById(id);
}