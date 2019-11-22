function NguoiDungService(){

    this.layDanhSachNguoiDung = function(){
        return axios({
            method: "GET",
            url: "http://5dce9e0975f9360014c25ff6.mockapi.io/api/NGUOIDUNG",
        });           
    };


    this.themNguoiDung = function(nguoiDung){
        return axios({
            method: "POST",
            url: "http://5dce9e0975f9360014c25ff6.mockapi.io/api/NGUOIDUNG",
            data: nguoiDung
        })
    }

    this.xoaNguoiDung = function(id){
        return axios({
            method : "DELETE",
            url :`http://5dce9e0975f9360014c25ff6.mockapi.io/api/NGUOIDUNG/${id}`,
        })
    }

    this.layThongTinNguoiDung = function(id){
        return axios({
            method : "GET",
            url :`http://5dce9e0975f9360014c25ff6.mockapi.io/api/NGUOIDUNG/${id}`,
        })
    }

    this.capNhatNguoiDung = function(id,user){
        return axios({
            method : "PUT",
            url :`http://5dce9e0975f9360014c25ff6.mockapi.io/api/NGUOIDUNG/${id}`,
            data : user,
        });
    }

    this.timKiemNguoiDung = function(chuoiTimKiem,danhSachNguoiDung){
        var mangTimKiem = danhSachNguoiDung.filter(function(item){
            return item.hoTen.toLowerCase().indexOf(chuoiTimKiem.toLowerCase()) > -1;
        });
        return mangTimKiem;
    }
}

