
    $.ajaxSetup({
    cache:false
    });
    initMap();
    jsonData();
    saveData();
    $( "#tags" ).autocomplete({
      source: cafename
    });

var jsonOutput;
var geocoder = new google.maps.Geocoder;
var infowindow = new google.maps.InfoWindow;
var cafelat;
var cafelng;
var cafename;
var cafecontent;
var cafeaddress;
var cafeamericano;
var cafesize;
var cafetoilet;
var cafeparking;
var cafeopening;
var cafeclosing;
var cafeallnight;
var cafefloor
var cafeicon;
var cafeid;
var infobox;
var markers = [];    

    
function initMap() {
  var query_latitude = document.getElementById("query_latitude").innerHTML;
  if (query_latitude == "")
  {
    function success(position) {
      var directionsService = new google.maps.DirectionsService();
      directionsDisplay = new google.maps.DirectionsRenderer();
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      map = new google.maps.Map(document.getElementById('map'), {
            zoom: 17,
            center: new google.maps.LatLng(latitude,longitude),
            minZoom: 9,
            maxZoom: 20
            });
      google.maps.event.addListener(this.map, 'idle', function() {
       document.getElementById("overlay_image").style.display = 'none';
      }); 
      var addMarkerIcon = {
                          url: "/images/tamper-iron.png", // url
                          scaledSize: new google.maps.Size(35, 58) // scaled size
                        }; // Picker의 아이콘
                        
      var Picker = new google.maps.Marker({
                                            map: map,
                                            draggable: true,
                                            icon: addMarkerIcon,
                                            animation: google.maps.Animation.DROP
                                         }); // 장소의 경도, 위도, 주소 데이터를 표시해주는 마커
  
      addYourLocationButton(map, Picker);
      AddMarker(map, Picker);
      saveMarker(map, Picker);
      ListMarker(map, 40);
      var mcOptions = {gridSize: 40, maxZoom: 17, imagePath: 'images/m'};
      var mc = new MarkerClusterer(map, markers, mcOptions);
      google.maps.event.addListener(map, 'dragstart', function(){
        document.getElementById("overlay_image").style.display = 'initial';
      })
      google.maps.event.addListener(map, 'idle', function() {
        document.getElementById("overlay_image").style.display = 'initial';
        var zL = map.getZoom();
        var latlng = map.getCenter();
        document.getElementById("q_lat").value = latlng.lat();
        document.getElementById("q_lng").value = latlng.lng();
        document.getElementById("q_zoom").value = zL;
        document.getElementById("s_lat").value = latlng.lat();
        document.getElementById("s_lng").value = latlng.lng();
        document.getElementById("s_zoom").value = zL;
        if (zL >= 9){
          document.getElementById("mapinfobox").innerHTML = "";
          document.getElementById("mapinfo_bar_content_title").innerHTML = '';
          var bounds  = map.getBounds();//important listener        
          for(var i = 0; i < cafelat.length; i++){ // looping through my Markers Collection       
            if(bounds.contains(markers[i].position))
            {
              mc.addMarker(markers[i]);
              $('#mapinfobox').append('<li class="ci_list">'+
                                        '<a style="text-decoration:none;" target="_blank" href="/home/cafe/'+cafename[i]+'">'+
                                          '<div class="ci_box">'+
                                            '<h2>'+cafename[i]+'</h2>'+
                                            '<label>아메리카노 가격</label><h3>'+cafeamericano[i]+'</h3><br>'+
                                            '<span class="checkbox" id="parking'+cafeid[i]+'" style="width:120px;">주차장</span>'+
                                            '<span class="checkbox" id="allnight'+cafeid[i]+'" style="width:120px;">24시간</span>'+
                                          '</div>'+
                                          '<div id="parking_content'+cafeid[i]+'" style="display:none;">'+cafeparking[i]+'</div>'+
                                          '<div id="allnight_content'+cafeid[i]+'" style="display:none">'+cafeallnight[i]+'</div>'+
                                        '</a>'+
                                      '</li>'
                                      );
              // document.getElementById("mapinfo").innerHTML = markers[i].name;
              var parking_content = document.getElementById("parking_content"+cafeid[i]).innerHTML;
              if(parking_content == "1")
              {
                $("#parking"+cafeid[i]).removeClass("checkbox");
              }
              var allnight_content = document.getElementById("allnight_content"+cafeid[i]).innerHTML;
              if(allnight_content == "1")
              {
                $("#allnight"+cafeid[i]).removeClass("checkbox");
              }
            }
            else
            {
              mc.removeMarker(markers[i]);
            }
          }
          
          var list_number = $('.ci_list').length;
          document.getElementById("mapinfo_bar_content_title").innerHTML = '카페 목록 ('+list_number+')';
          document.getElementById("overlay_image").style.display = 'none';
        }
       });
       google.maps.event.addListener(map, 'zoom_changed', function(){
         document.getElementById("overlay_image").style.display = 'initial';
         zoomLevel = map.getZoom();
         var bounds  = map.getBounds();
         if (zoomLevel > 13){
         if (zoomLevel >= 19) {
            for(var i = 0; i < cafelat.length; i++){
              if(bounds.contains(markers[i].position))
              {
                delete markers[i].icon.size;
                delete markers[i].icon.scaledSize;
                mc.removeMarker(markers[i]);
                mc.addMarker(markers[i]);
                markers[i].icon.size = {
                  f:"px",
                  height:60,
                  j:"px",
                  width:60
                };
                markers[i].icon.scaledSize = {
                  f:"px",
                  height:60,
                  j:"px",
                  width:60
                };
              }
            }
          } else if (zoomLevel >= 16 && zoomLevel < 19) {
            for(var i = 0; i < cafelat.length; i++){
              if(bounds.contains(markers[i].position))
              {
                delete markers[i].icon.size;
                delete markers[i].icon.scaledSize;
                mc.removeMarker(markers[i]);
                mc.addMarker(markers[i]);
                markers[i].icon.size = {
                  f:"px",
                  height:40,
                  j:"px",
                  width:40
                };
                markers[i].icon.scaledSize = {
                  f:"px",
                  height:40,
                  j:"px",
                  width:40
                };
              }
            }
          } else if (zoomLevel >= 13 && zoomLevel < 16) {
            for(var i = 0; i < cafelat.length; i++){
              if(bounds.contains(markers[i].position))
              {
                delete markers[i].icon.size;
                delete markers[i].icon.scaledSize;
                mc.removeMarker(markers[i]);
                mc.addMarker(markers[i]);
                markers[i].icon.size = {
                  f:"px",
                  height:20,
                  j:"px",
                  width:20
                };
                markers[i].icon.scaledSize = {
                  f:"px",
                  height:20,
                  j:"px",
                  width:20
                };
              }
            }
          }
         }
       });
    }
    
    function error() {
      var latitude = 36.3504;
      var longitude = 127.3845;
      map = new google.maps.Map(document.getElementById('map'), {
            zoom: 7,
            center: new google.maps.LatLng(latitude,longitude)
            });
      var addMarkerIcon = {
                          url: "http://m.hiapphere.org/data/icon/201512/HiAppHere_com_com.samymarboy.theme.material.iconpack.paid.png", // url
                          scaledSize: new google.maps.Size(50, 50) // scaled size
                        }; // Picker의 아이콘
               
      var Picker = new google.maps.Marker({
                                            map: map,
                                            draggable: true,
                                            icon: addMarkerIcon,
                                            animation: google.maps.Animation.DROP
                                         }); // 장소의 경도, 위도, 주소 데이터를 표시해주는 마커
    
      addYourLocationButton(map, Picker);
      addMarker(map, Picker);
      saveMarker(map, Picker);
      ListMarker(map);
    }
    
    navigator.geolocation.getCurrentPosition(success, error);
  }
  //끝
  else 
  {
    function success(position) {
      var directionsService = new google.maps.DirectionsService();
      directionsDisplay = new google.maps.DirectionsRenderer();
      var latitude = document.getElementById("query_latitude").innerHTML;
      var longitude = document.getElementById("query_longitude").innerHTML;
      var query_zoom = document.getElementById("query_zoom").innerHTML;
      map = new google.maps.Map(document.getElementById('map'), {
            zoom: parseInt(query_zoom),
            center: new google.maps.LatLng(latitude,longitude),
            minZoom: 9,
            maxZoom: 20
            });
      google.maps.event.addListener(this.map, 'idle', function() {
       document.getElementById("overlay_image").style.display = 'none';
      }); 
      var addMarkerIcon = {
                          url: "/images/tamper-iron.png", // url
                          scaledSize: new google.maps.Size(35, 58) // scaled size
                        }; // Picker의 아이콘
                        
      var Picker = new google.maps.Marker({
                                            map: map,
                                            draggable: true,
                                            icon: addMarkerIcon,
                                            animation: google.maps.Animation.DROP
                                         }); // 장소의 경도, 위도, 주소 데이터를 표시해주는 마커
  
      addYourLocationButton(map, Picker);
      AddMarker(map, Picker);
      saveMarker(map, Picker);
      ListMarker(map, 40);
      var mcOptions = {gridSize: 40, maxZoom: 17, imagePath: 'images/m'};
      var mc = new MarkerClusterer(map, markers, mcOptions);
      google.maps.event.addListener(map, 'dragstart', function(){
        document.getElementById("overlay_image").style.display = 'initial';
      })
      google.maps.event.addListener(map, 'idle', function() {
        document.getElementById("overlay_image").style.display = 'initial';
        var zL = map.getZoom();
        var latlng = map.getCenter();
        document.getElementById("q_lat").value = latlng.lat();
        document.getElementById("q_lng").value = latlng.lng();
        document.getElementById("q_zoom").value = zL;
        document.getElementById("s_lat").value = latlng.lat();
        document.getElementById("s_lng").value = latlng.lng();
        document.getElementById("s_zoom").value = zL;
        if (zL >= 9){
          document.getElementById("mapinfobox").innerHTML = "";
          document.getElementById("mapinfo_bar_content_title").innerHTML = '';
          var bounds  = map.getBounds();//important listener        
          for(var i = 0; i < cafelat.length; i++){ // looping through my Markers Collection       
            if(bounds.contains(markers[i].position))
            {
              mc.addMarker(markers[i]);
              $('#mapinfobox').append('<li class="ci_list">'+
                                        '<a style="text-decoration:none;" target="_blank" href="/home/cafe/'+cafename[i]+'">'+
                                          '<div class="ci_box">'+
                                            '<h2>'+cafename[i]+'</h2>'+
                                            '<label>아메리카노 가격</label><h3>'+cafeamericano[i]+'</h3><br>'+
                                            '<span class="checkbox" id="parking'+cafeid[i]+'" style="width:120px;">주차장</span>'+
                                            '<span class="checkbox" id="allnight'+cafeid[i]+'" style="width:120px;">24시간</span>'+
                                          '</div>'+
                                          '<div id="parking_content'+cafeid[i]+'" style="display:none;">'+cafeparking[i]+'</div>'+
                                          '<div id="allnight_content'+cafeid[i]+'" style="display:none">'+cafeallnight[i]+'</div>'+
                                        '</a>'+
                                      '</li>'
                                      );
              // document.getElementById("mapinfo").innerHTML = markers[i].name;
              var parking_content = document.getElementById("parking_content"+cafeid[i]).innerHTML;
              if(parking_content == "1")
              {
                $("#parking"+cafeid[i]).removeClass("checkbox");
              }
              var allnight_content = document.getElementById("allnight_content"+cafeid[i]).innerHTML;
              if(allnight_content == "1")
              {
                $("#allnight"+cafeid[i]).removeClass("checkbox");
              }
            }
            else
            {
              mc.removeMarker(markers[i]);
            }
          }
          
          var list_number = $('.ci_list').length;
          document.getElementById("mapinfo_bar_content_title").innerHTML = '카페 목록 ('+list_number+')';
          document.getElementById("overlay_image").style.display = 'none';
        }
       });
       google.maps.event.addListener(map, 'zoom_changed', function(){
         document.getElementById("overlay_image").style.display = 'initial';
         zoomLevel = map.getZoom();
         var bounds  = map.getBounds();
         if (zoomLevel > 13){
         if (zoomLevel >= 19) {
            for(var i = 0; i < cafelat.length; i++){
              if(bounds.contains(markers[i].position))
              {
                delete markers[i].icon.size;
                delete markers[i].icon.scaledSize;
                mc.removeMarker(markers[i]);
                mc.addMarker(markers[i]);
                markers[i].icon.size = {
                  f:"px",
                  height:60,
                  j:"px",
                  width:60
                };
                markers[i].icon.scaledSize = {
                  f:"px",
                  height:60,
                  j:"px",
                  width:60
                };
              }
            }
          } else if (zoomLevel >= 16 && zoomLevel < 19) {
            for(var i = 0; i < cafelat.length; i++){
              if(bounds.contains(markers[i].position))
              {
                delete markers[i].icon.size;
                delete markers[i].icon.scaledSize;
                mc.removeMarker(markers[i]);
                mc.addMarker(markers[i]);
                markers[i].icon.size = {
                  f:"px",
                  height:40,
                  j:"px",
                  width:40
                };
                markers[i].icon.scaledSize = {
                  f:"px",
                  height:40,
                  j:"px",
                  width:40
                };
              }
            }
          } else if (zoomLevel >= 13 && zoomLevel < 16) {
            for(var i = 0; i < cafelat.length; i++){
              if(bounds.contains(markers[i].position))
              {
                delete markers[i].icon.size;
                delete markers[i].icon.scaledSize;
                mc.removeMarker(markers[i]);
                mc.addMarker(markers[i]);
                markers[i].icon.size = {
                  f:"px",
                  height:20,
                  j:"px",
                  width:20
                };
                markers[i].icon.scaledSize = {
                  f:"px",
                  height:20,
                  j:"px",
                  width:20
                };
              }
            }
          }
         }
       });
    }
    
    function error() {
      var latitude = 36.3504;
      var longitude = 127.3845;
      map = new google.maps.Map(document.getElementById('map'), {
            zoom: 7,
            center: new google.maps.LatLng(latitude,longitude)
            });
      var addMarkerIcon = {
                          url: "http://m.hiapphere.org/data/icon/201512/HiAppHere_com_com.samymarboy.theme.material.iconpack.paid.png", // url
                          scaledSize: new google.maps.Size(50, 50) // scaled size
                        }; // Picker의 아이콘
               
      var Picker = new google.maps.Marker({
                                            map: map,
                                            draggable: true,
                                            icon: addMarkerIcon,
                                            animation: google.maps.Animation.DROP
                                         }); // 장소의 경도, 위도, 주소 데이터를 표시해주는 마커
    
      addYourLocationButton(map, Picker);
      addMarker(map, Picker);
      saveMarker(map, Picker);
      ListMarker(map);
    }
    
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

function saveData() {
    cafelat = jsonOutput.lat;
    cafelng = jsonOutput.lng;
    cafename = jsonOutput.name;
    cafephone = jsonOutput.phone;
    cafecontent = jsonOutput.content;
    cafeaddress = jsonOutput.address;
    cafeicon = jsonOutput.markericon;
    cafeamericano = jsonOutput.americano;
    cafesize = jsonOutput.size;
    cafetoilet = jsonOutput.toilet;
    cafeparking = jsonOutput.parking;       
    cafeallnight = jsonOutput.allnight;    
    cafefloor = jsonOutput.floor
    cafeid = jsonOutput.id;
}

//여기부터 고쳐야함

function addYourLocationButton(map, marker) 
{
    var controlDiv = document.createElement('div');

    var firstChild = document.createElement('button');
    firstChild.style.backgroundColor = '#fff';
    firstChild.style.border = 'none';
    firstChild.style.outline = 'none';
    firstChild.style.width = '28px';
    firstChild.style.height = '28px';
    firstChild.style.borderRadius = '2px';
    firstChild.style.boxShadow = '0 1px 4px rgba(0,0,0,0.3)';
    firstChild.style.cursor = 'pointer';
    firstChild.style.marginRight = '10px';
    firstChild.style.padding = '0px';
    firstChild.title = 'My Location';
    controlDiv.appendChild(firstChild);

    var secondChild = document.createElement('div');
    secondChild.style.margin = '5px';
    secondChild.style.width = '18px';
    secondChild.style.height = '18px';
    secondChild.style.background = 'url("/images/mylocation.png")'
    secondChild.style.backgroundSize = '180px 18px';
    secondChild.style.backgroundPosition = '0px 0px';
    secondChild.style.backgroundRepeat = 'no-repeat';
    secondChild.id = 'you_location_img';
    firstChild.appendChild(secondChild);

    google.maps.event.addListener(map, 'dragend', function() {
        $('#you_location_img').css('background-position', '0px 0px');
    });

    firstChild.addEventListener('click', function() {
        var imgX = '0';
        var animationInterval = setInterval(function(){
            if(imgX == '-18') imgX = '0';
            else imgX = '-18';
            $('#you_location_img').css('background-position', imgX+'px 0px');
        }, 500);
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                marker.setPosition(latlng);
                map.setCenter(latlng);
                clearInterval(animationInterval);
                map.setZoom(18);
                $('#you_location_img').css('background-position', '-144px 0px');
            });
        }
        else{
            clearInterval(animationInterval);
            $('#you_location_img').css('background-position', '0px 0px');
        }
    });

    controlDiv.index = 1;
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv);
    
    google.maps.event.addListener(marker, 'dragstart', function(){

              marker.icon.url = "/images/tamper-iron-1.png"
    });
    google.maps.event.addListener(marker, 'dragend', function(){

              marker.icon.url = "/images/tamper-iron.png"
    });
}

function AddMarker(map, marker)
{
    var controlDiv = document.createElement('div');

    var firstChild = document.createElement('button');
    firstChild.style.backgroundColor = '#fff';
    firstChild.style.border = 'none';
    firstChild.style.outline = 'none';
    firstChild.style.width = '28px';
    firstChild.style.height = '28px';
    firstChild.style.borderRadius = '2px';
    firstChild.style.boxShadow = '0 1px 4px rgba(0,0,0,0.3)';
    firstChild.style.cursor = 'pointer';
    firstChild.style.marginRight = '10px';
    firstChild.style.marginBottom = '15px';
    firstChild.style.padding = '0px';
    firstChild.title = 'Add Marker';
    controlDiv.appendChild(firstChild);

    var secondChild = document.createElement('div');
    secondChild.style.margin = '5px';
    secondChild.style.width = '18px';
    secondChild.style.height = '18px';
    secondChild.style.backgroundImage = "url('/images/tamper-basic.jpg')";
    secondChild.style.backgroundSize = '18px 18px';
    secondChild.style.backgroundPosition = '0px 0px';
    secondChild.style.backgroundRepeat = 'no-repeat';
    secondChild.id = 'you_location_img';
    firstChild.appendChild(secondChild);
    
    firstChild.addEventListener('click', function() {

                var latlng = map.getCenter();
                marker.setPosition(latlng);
                map.setCenter(latlng);

    });
    
    controlDiv.index = 1;
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv);

}

function saveMarker(map, marker) {
  
  var controlDiv = document.createElement('div');
  // Set CSS for the control border.
  var controlUI = document.createElement('div');
  controlUI.style.width = '300px';
  controlUI.style.backgroundColor = '#fff';
  controlUI.style.border = '2px solid #fff';
  controlUI.style.borderRadius = '3px';
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlUI.style.textAlign = 'center';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('div');
  controlText.style.color = 'rgb(25,25,25)';
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlText.style.fontSize = '16px';
  controlText.style.lineHeight = '38px';
  controlText.style.paddingLeft = '5px';
  controlText.style.paddingRight = '5px';
  controlText.innerHTML = '<p>주소를 확인할 수 있어요!</p>'
  controlUI.appendChild(controlText);
  
  google.maps.event.addListener(marker, 'dragend', function(evt){
    // document.getElementById('current').innerHTML = '<p>Marker dropped: Current Lat: ' + evt.latLng.lat().toFixed(3) + ' Current Lng: ' + evt.latLng.lng().toFixed(3) + '</p>';
    var selectedlat = evt.latLng.lat();
    var selectedlng = evt.latLng.lng();
    var selectedlatLng = [selectedlat,selectedlng];
    var latLng = {lat: parseFloat(selectedlatLng[0]), lng: parseFloat(selectedlatLng[1])};
    geocoder.geocode({ 'latLng': latLng }, function (results, status) {
        if (status !== google.maps.GeocoderStatus.OK) {
            alert(status);
        }
        // This is checking to see if the Geoeode Status is OK before proceeding
        if (status == google.maps.GeocoderStatus.OK) {
            var address = (results[0].formatted_address);
        }
        document.getElementById('latitude').innerHTML =  selectedlat;
        document.getElementById('longitude').innerHTML = selectedlng;
        document.getElementById('address').innerHTML = address;
        controlText.innerHTML = '<p>' +address+ '</p><br>'+
        ' <form action="/home/roasting"><input name="lat" type="hidden" value="' + selectedlat + '"><input name="lng" type="hidden" value="'+selectedlng+'">'+
        '<input name="address" type="hidden" value="'+address+'"><button type="submit">카페 추가하기</button></form> '; //위치 오류는 zoom 조정
    });
    
  });
  
  controlDiv.index = 1;
  map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(controlDiv);
}

function ListMarker(map, size) {
  for (var i = 0; i < cafelat.length; i++) {
              var pos = new google.maps.LatLng(cafelat[i], cafelng[i]);
              
              if (cafeicon[i] == "")
              {
                var CafeIcon = {
                url: "/images/espresso3.png", // url
                scaledSize: new google.maps.Size(size, size) // scaled size
                };
              } else
              {
                var CafeIcon = {
                url: cafeicon[i], // url
                scaledSize: new google.maps.Size(size, size) // scaled size
                };
              }
              
              var CafeMarker = new google.maps.Marker({
                  icon: CafeIcon,
                  position: pos,
                  map: map,
                  id: i
              });
              markers.push(CafeMarker); //markers에 저장하는 역할
              
              google.maps.event.addListener(CafeMarker, 'mouseover', (function(CafeMarker, i) {
          			return function() {
          			  var content = document.createElement('div');
          			  var con1 = content.innerHTML = '<div id="infobox">' + cafename[i] + '</div>';
                  infobox = new InfoBox({
                      content: con1,
                      disableAutoPan: false,
                      maxWidth: 150,
                      pixelOffset: new google.maps.Size(-100, 0),
                      zIndex: null,
                      boxStyle: {
                      background: "url('/images/arrow.gif') no-repeat",
                      opacity: 0.75,
                      width: "200px"
                      },
                      closeBoxMargin: "12px 4px 2px 2px",
                      infoBoxClearance: new google.maps.Size(1, 1)
                  });
          				infobox.open(map, CafeMarker);
          			}
          		}) (CafeMarker, i));
          		google.maps.event.addListener(CafeMarker, 'mouseout', (function(CafeMarker, i) {
          		  return function() {
          		    infobox.close();
          		  }
          		}) (CafeMarker, i));
          		google.maps.event.addListener(CafeMarker, 'click', (function(CafeMarker, i) {
          		  return function() {
          		    var content = document.createElement('div');
          		    var con1 = content.innerHTML = '<div id="iw-container">' +
                                                  '<div class="iw-title">'+ '<a href="/home/cafe/'+cafename[i]+'" target="_blank">' + cafename[i] + '</a>' + '</div>' + '<hr>'
                                                  + '<div class="iw-content"><p>'+ cafeaddress[i] + '</p><p>'+cafephone[i]+'</p></div>' +
                                                  '<div class="iw-detail"><a href="/home/cafe/'+cafename[i]+'" target="_blank">'+'자세히보기'+'</div></a>'+
                                              '</div>';
          		    infowindow.setContent(con1);
          		    infowindow.open(map, CafeMarker);
          		  }
          		}) (CafeMarker, i));
            }
          
          google.maps.event.addListener(map, "click", function() {
              infowindow.close();
          });
}

function setMarkers(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }            
}
function hideMarkers() {
    setMarkers(null);    
}

function getSomething(){
    var json = null;
    $.ajax({
        async: false,
        url: document.URL,
        data: {},
        dataType: "json",
        success: function(data){
            json = data;
        }
    });
    return json;
}

function jsonData() {
    var json = getSomething();
    var json_string = JSON.stringify(json);
    var list = JSON.parse(json_string);
    jsonOutput = {};

    for(var i=0; i<list.length; i++)
    {
        for(var key in list[i])
        {
            if(list[i].hasOwnProperty(key))
            {
                if(typeof jsonOutput[key] == 'undefined')
                {
                    jsonOutput[key] = [];
                }
                jsonOutput[key].push(list[i][key]);
            }
        }
    }
}