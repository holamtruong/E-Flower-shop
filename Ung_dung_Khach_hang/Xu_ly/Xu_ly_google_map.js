//************************* Google Map**************************

function InitializeMap() {
    var latlng = new google.maps.LatLng(10.823099, 106.629664); // Vĩ độ, Kinh độ Tp Hồ Chí Minh
    var myOptions = {
        zoom: 10,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        gestureHandling: 'cooperative' // none || cooperative
    };

    map = new google.maps.Map(document.getElementById("map"), myOptions);


    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(10.762887, 106.682257), // Vĩ độ, Kinh độ Cửa hàng 
        map: map,
        title: 'Nhấn để xem chi tiết',
        //animation: google.maps.Animation.BOUNCE // BOUNCE || DROP
    });

    var infowindow = new google.maps.InfoWindow({
        content: `Cửa hàng:${Cua_hang.Ten}<br/>
        Địa chỉ:${Cua_hang.Dia_chi}<br/>
        LatLng:${marker.position.toString()})`
    });

    /*
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map, marker);
    });
    */

    google.maps.event.addListener(marker, 'mouseover', function () {
        infowindow.open(map, marker);
    });

    google.maps.event.addListener(marker, 'mouseout', function () {
        infowindow.close(map, marker);
    });
}

window.onload = InitializeMap;


//thêm vào trang html
//<div id="map" style="height: 30rem; width: 100%;"></div>
//<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAw3QZ5hhReTIJLSWz7o_582Wm3p6PV-EM&language=vi"></script>