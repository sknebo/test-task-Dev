import React, { useEffect, useRef, useState } from 'react'
import { YMaps, Map, Polygon, Placemark, Polyline, ZoomControl, GeolocationControl, Rou } from 'react-yandex-maps'
import '../ymap.css'
import { get_mkad_points } from './mkad_points'

export default function YandexMap() {
    let map = useRef(null)
    localStorage.getItem('coords') || localStorage.setItem('coords', [55.75, 37.62])
    const [coords, setCoords] = useState({
        position: localStorage.getItem('coords').split(',') || [],
        address: localStorage.getItem('address') || ''
    })
    const [ymaps_geo, setYmaps_geo] = useState('')
    const [route, setRoute] = useState({
        lengths: localStorage.getItem('length') || 0,
        start: localStorage.getItem('coords') || [],
        end: localStorage.getItem('endpoint') || []
    })

    const [drivingLength, setDrivingLength] = useState(0)

    const defaultState = {
        center: [55.75, 37.62],
        zoom: 10,
    }

    const polygonOptions = {
        fillColor: '#6699ff',
        strokeWidth: 4,
        opacity: 0.3
    }

    function getYmaps(ymaps) {
        setYmaps_geo(ymaps)
    }

    function getCoords(e) {
        const _coords = e.get('coords')
        localStorage.setItem('coords', _coords)
        ymaps_geo?.geocode(_coords).then((resp) => {
            const getAddress = resp.geoObjects.get(0).getAddressLine()
            localStorage.setItem('address', getAddress)
            setCoords({ position: _coords, address: getAddress })
        }).catch(e => console.log(e))
    }

    useEffect(() => {
        if (coords.position) { findClosest() }
    }, [coords])

    function findClosest() {
        // Расстояние до каждой точки - неэффективно

        // get_mkad_points.map(point => {
        //     const b = Math.sqrt(Math.pow((coords.position[0] - point[0]), 2) + Math.pow((coords.position[1] - point[1]), 2))
        //     console.log(b);
        // })

        // Расстояние до прямой - не работает, нужен отрезок
        // let min = {
        //     length: Math.abs((get_mkad_points[0][1] - get_mkad_points[108][1]) * coords.position[0] - (get_mkad_points[0][0] - get_mkad_points[108][0]) * coords.position[1] + get_mkad_points[0][0] * get_mkad_points[108][1] - get_mkad_points[0][1] * get_mkad_points[108][0]) / Math.sqrt(Math.pow((get_mkad_points[0][1] - get_mkad_points[108][1]), 2) + Math.pow((get_mkad_points[0][0] - get_mkad_points[108][0]), 2)),
        //     x: 108,
        //     y: 0
        // }
        // console.log(min);
        // for (let i = 0; i < get_mkad_points.length - 1; i++) {
        //     let b = Math.abs((get_mkad_points[i + 1][1] - get_mkad_points[i][1]) * coords.position[0] - (get_mkad_points[i + 1][0] - get_mkad_points[i][0]) * coords.position[1] + get_mkad_points[i + 1][0] * get_mkad_points[i][1] - get_mkad_points[i + 1][1] * get_mkad_points[i][0]) / Math.sqrt(Math.pow((get_mkad_points[i + 1][1] - get_mkad_points[i][1]), 2) + Math.pow((get_mkad_points[i + 1][0] - get_mkad_points[i][0]), 2))
        //     console.log(b);
        //     if (b < min.length) min = { length: b, x: i + 1, y: i }
        // }
        // console.log(min);
        // setRoute(min)

        // Высота из точки к отрезку - не довел до конца, т.к. не смог подобрать формулу для нахождения координат пересечения высоты и отрезка
        let min = distance(108)

        for (let i = 0; i < get_mkad_points.length - 1; i++) {
            const dist = distance(i)
            if (dist.lengths <= min.lengths) {
                min = dist
            }
        }

        setRoute(min)
    }

    // Высота из точки к отрезку - не довел до конца, т.к. не смог подобрать формулу для нахождения координат пересечения высоты и отрезка
    // итог - иногда некорректное отображение пути по воздуху

    function distance(i) {
        let j
        i !== 108 ? j = i + 1 : j = 0

        let triangleMin = {
            lengths: 0,
            start: coords.position,
            end: []
        }

        //Стороны треугольника OIJ

        let triangleLengths = [
            Math.sqrt(Math.pow((get_mkad_points[i][0] - coords.position[0]), 2) + Math.pow((get_mkad_points[i][1] - coords.position[1]), 2)),
            Math.sqrt(Math.pow((get_mkad_points[j][0] - get_mkad_points[i][0]), 2) + Math.pow((get_mkad_points[j][1] - get_mkad_points[i][1]), 2)),
            Math.sqrt(Math.pow((get_mkad_points[j][0] - coords.position[0]), 2) + Math.pow((get_mkad_points[j][1] - coords.position[1]), 2))
        ]

        // console.log('Треугольник острый');

        // Если сторона OI - гипотенуза, и треугольник тупой - берем расстояние до J
        if (Math.pow(triangleLengths[0], 2) > (Math.pow(triangleLengths[1], 2) + Math.pow(triangleLengths[2], 2))) {
            // console.log('Треугольник тупой, OI гипотенуза');
            triangleMin = {
                lengths: triangleLengths[2] * 100,
                start: coords.position,
                end: get_mkad_points[j]
            }

        }
        // Если сторона OJ - гипотенуза, и треугольник тупой - берем расстояние до I
        else if (Math.pow(triangleLengths[2], 2) > (Math.pow(triangleLengths[1], 2) + Math.pow(triangleLengths[0], 2))) {
            // console.log('Треугольник тупой, OJ гипотенуза');
            triangleMin = {
                lengths: triangleLengths[0] * 100,
                start: coords.position,
                end: get_mkad_points[i]
            }

        }
        else {
            const vector = Math.abs((get_mkad_points[j][1] - get_mkad_points[i][1]) * coords.position[0] - (get_mkad_points[j][0] - get_mkad_points[i][0]) * coords.position[1] + get_mkad_points[j][0] * get_mkad_points[i][1] - get_mkad_points[j][1] * get_mkad_points[i][0]) / Math.sqrt(Math.pow((get_mkad_points[j][1] - get_mkad_points[i][1]), 2) + Math.pow((get_mkad_points[j][0] - get_mkad_points[i][0]), 2))
            // const per = 1 / 2 * (triangleLengths.reduce((sum, a) => sum + a, 0))
            // const area = Math.sqrt(per * (per - triangleLengths[0]) * (per - triangleLengths[1]) * (per - triangleLengths[2]))
            // const h = area * 2 / triangleLengths[1]
            let rac = 0
            let Xc = 0
            let Yc = 0
            if (triangleLengths[0] < triangleLengths[2]) {
                rac = Math.sqrt(Math.abs(Math.pow(triangleLengths[0], 2) - Math.pow(vector, 2)))

                Xc = ((triangleLengths[1] - rac) * get_mkad_points[i][0] + rac * get_mkad_points[j][0]) / triangleLengths[1]
                Yc = ((triangleLengths[1] - rac) * get_mkad_points[i][1] + rac * get_mkad_points[j][1]) / triangleLengths[1]

            }
            else if (triangleLengths[0] > triangleLengths[2]) {
                rac = Math.sqrt(Math.pow(triangleLengths[2], 2) - Math.pow(vector, 2))

                Xc = ((triangleLengths[1] - rac) * get_mkad_points[j][0] + (rac * get_mkad_points[i][0])) / triangleLengths[1]
                Yc = ((triangleLengths[1] - rac) * get_mkad_points[j][1] + (rac * get_mkad_points[i][1])) / triangleLengths[1]

            }
            else {
                // console.log('Треугольник равнобедренный');
                Xc = (get_mkad_points[j][0] + get_mkad_points[i][0]) / 2
                Yc = (get_mkad_points[j][1] + get_mkad_points[i][1]) / 2
            }
            // console.log(Xc, Yc);
            // const length = Math.sqrt(Math.pow((coords.position[0] - Xc), 2) - Math.pow((coords.position[1] - Yc), 2))
            triangleMin = {
                lengths: vector * 100,
                start: coords.position,
                end: [Xc, Yc]
            }
        }
        return triangleMin
    }

    useEffect(() => {
        console.log(route);
        console.log(coords);
        localStorage.setItem('length', route?.lengths)
        localStorage.setItem('endpoint', route.end)

        if (ymaps_geo && route && coords && map) {
            try {
                // console.log(map.geoObjects.getLength());
                ymaps_geo.route(
                    [route.start, route.end],
                    {
                        mapStateAutoApply: true
                    }
                ).then((path) => {

                    path.getPaths().options.set({
                        strokeColor: '000',
                        opacity: 0.4,
                    })
                    map?.geoObjects?.splice(3, 1, path)

                    setDrivingLength(path?.properties?._data?.RouterRouteMetaData?.Length?.text)
                    console.log(drivingLength);
                }).catch((e) => console.log(e))
            }
            catch (e) { console.log(e) }
        }

    }, [route])


    useEffect(() => {
        console.log('yop');
        console.log(drivingLength);
    }, [drivingLength])




    return (
        <div className='map'>
            <YMaps
                query={{
                    apikey: '3d9c2fdc-4319-459e-90eb-6af3b4b25c55'
                }}>
                <Map
                    modules={['geocode', 'route']}
                    onLoad={(ymaps) => getYmaps(ymaps)}
                    defaultState={defaultState}
                    width='100%' height='100%'
                    instanceRef={ref => map = ref}
                    onClick={e => getCoords(e)}
                >

                    {coords ? <Placemark geometry={coords.position} properties={{ hintContent: coords.address }} modules={['geoObject.addon.balloon', 'geoObject.addon.hint']} /> : null}

                    <Polygon geometry={[get_mkad_points]} options={polygonOptions} onClick={e => getCoords(e)} />
                    {route ? <Polyline geometry={[route?.start, route?.end]} properties={{ hintContent: route?.length }} modules={['geoObject.addon.balloon', 'geoObject.addon.hint']} /> : null}
                    <ZoomControl />
                </Map>
                {drivingLength.length ? <div className='popup'>Длина маршрута из {coords?.address} до МКАД на автомобиле: {drivingLength}; <br /> по воздуху: {route?.lengths?.toFixed(2)}</div> : null}
            </YMaps >
        </div >
    )
}