var marker, markerMap, map, myPlacemark, myRoute,  coordMkad;
let address = document.getElementById("address");
let distanceMap = document.getElementById("distance");
var mkad = [
            [55.575358, 37.600963], [55.596356, 37.508095], [55.66045, 37.435574],
            [55.685285, 37.414553], [55.713877, 37.385385,], [55.745985, 37.369431],
            [55.76645, 37.369952], [55.794178, 37.376554], [55.835862, 37.397018],
            [55.849757, 37.392517], [55.864414, 37.400378], [55.882156, 37.446695],
            [55.88562, 37.478774], [55.907798, 37.536023], [55.910397, 37.590731],
            [55.897044, 37.641432], [55.89294, 37.704493], [55.827924, 37.835378],
            [55.77758, 37.846571], [55.71054, 37.838441], [55.685899, 37.830249],
            [55.655717, 37.842627], [55.605648, 37.766432], [55.574365, 37.687812]
        ]

// Функция YMaps.ready() будет вызвана, когда
// загрузятся все компоненты API, а также когда будет готово DOM-дерево.
ymaps.ready(init);
    function init(){
        
        // Создание карты.
        map = new ymaps.Map("map", {
            // Координаты центра карты.
            // Порядок по умолчанию: «широта, долгота».
            // Чтобы не определять координаты центра карты вручную,
            // воспользуйтесь инструментом Определение координат.
            center: [55.76, 37.64],
            // Уровень масштабирования. Допустимые значения:
            // от 0 (весь мир) до 19.
            zoom: 10
        
		});
        
        //Создаем Полигон
        var myPolygon = new ymaps.Polygon([mkad]);
        map.geoObjects.add(myPolygon);

        //Создаем метки по координатам МКАДа
        var arPlacemarks = new Array();
        for (let i=0; i<mkad.length-1; i++) {
            arPlacemarks[i] = new ymaps.Placemark(mkad[i]);
        }
    
        // Добавляем метки на карту
        var arPlacemarksRez = ymaps.geoQuery(arPlacemarks).addToMap(map);
    
	
	    // Слушаем клик на карте.
        map.events.add('click', function (e) {
            var coords = e.get('coords');
		    var closestObject = arPlacemarksRez.getClosestTo(coords);
            
            // Если метка уже создана – просто передвигаем ее координаты.
            if (myPlacemark) {
                myPlacemark.geometry.setCoordinates(coords);
           
            }
            // Если нет – создаем.
            else {
                myPlacemark = new ymaps.Placemark(coords);
                
            }
		
            //Передаем координаты, чтоб узнать адрес метки
            getAddress(coords);
            
            //Передаем координаты для маршрута
		    myWay(coords, closestObject)
		
        });
	
	    // Определяем адрес по координатам и выводим в блок address
        function getAddress(coords) {
            ymaps.geocode(coords).then(function (res) {
                var firstGeoObject = res.geoObjects.get(0);
                address.innerHTML=firstGeoObject.getAddressLine(); 
            });
        }
	
	
        //Строим и добавляем маршрут
	    function myWay(position, closestObjectMy) {
		    coordMkad=closestObjectMy.geometry.getCoordinates();
            ymaps.route([
                position,
                coordMkad
            ], {
                mapStateAutoApply: false
            }).then(function (route) {
                route.getPaths().options.set({
                // балун показывает только информацию о времени в пути с трафиком
                balloonContentLayout: ymaps.templateLayoutFactory.createClass('{{ properties.humanJamsTime }}'),
                // вы можете настроить внешний вид маршрута
                strokeColor: '0000ffff',
                opacity: 0.9
                });

                let distance = Math.round(route.getLength()/1000);
                distanceMap.innerHTML=`${distance} km`; 

                // добавляем маршрут на карту
                map.geoObjects.add(route);
        });

    }

}