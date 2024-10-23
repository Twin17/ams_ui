import React, {useState, useRef, useEffect} from "react"
import Header from "./components/Header"
import Aircrafts from "./components/Aircrafts"
import axios from "axios"

const mainHost = 'http://localhost:8080'
const getAircraftsUrl = mainHost + '/api/getAircrafts'
const addAircraftUrl = mainHost + '/api/addAircraft'
const updateAircraftUrl = mainHost + '/api/updateAircraft'
const deleteAircraftUrl = mainHost + '/api/deleteAircraft'
const saveImageUrl = mainHost + '/api/amsfile/save'

function App () {
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const aircrafts = useRef()
    const pages = useRef(1)
    const pageSize = 4

    // Пагинация
    const liPageA = useRef(1)
    const liPageZ = useRef(1)
    const liPages = 5

    useEffect(() => {
        setLoading(true);
        axios.post(getAircraftsUrl, {
            model2: 'Kukuruznik',
            manufacturer2: 'Soviet Union',
            pageNum: page,
            pageSize: pageSize
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            console.log('get_res: ', res)
            //setAircrafts(res.data.aircrafts)
            aircrafts.current = res.data.aircrafts
            pages.current = res.data.pageData.pages

            // Расчет для отображения кубиков пагинации
            let pgs = Math.min(liPages, pages.current)
            liPageA.current = Math.max(1, page - 2)
            pgs = pgs - (page - liPageA.current) - 1
            liPageZ.current = Math.min(page + pgs, pages.current)
            pgs = pgs - (liPageZ.current - page)
            liPageA.current = liPageA.current - pgs
        })
        .catch((err) => {
            console.log(err)
            alert('Ошибка загрузки данных из БД')
        })
        .finally(() => setLoading(false))
    }, [page])

    const saveImage = async (image, id) => {
        let formData = new FormData();
        formData.append('file', image.raw);
        formData.append('aircraft_id', id);
        await axios.post(saveImageUrl, 
            formData, 
            {headers: {'Content-Type': 'multipart/form-data'}
        })
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.error('saveImageError: ', err)
            alert('Ошибка сохранения рисунка в БД')
        });
    }

    function addAircraft(aircraft, image) {
        axios.post(addAircraftUrl, {
            model: aircraft.model,
            manufacturer: aircraft.manufacturer,
            releaseYear: aircraft.releaseYear,
            seats: aircraft.seats,
            status: aircraft.status
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            console.log('add_res: ', res)
            // this.setState({aircrafts: res.data.aircrafts})
            if (res.data.statusCode === 0) {
                // Меняем состояние aircrafts - к текущему списку aircrafts добавляем объект
                // состоящий из id ответа и списка переданных полей в aircraft
                aircraft.id = res.data.id
                //this.setState({aircrafts: [{...aircraft}, ...this.state.aircrafts]})
                aircrafts.current = [{...aircraft}, ...aircrafts.current]
                if (image.preview) {
                    saveImage(image, aircraft.id)
                }
            } else {
                const mes = 'Ошибка добавления записи в БД: ' + res.data.statusText
                console.error(mes)
                alert(mes)
            }
        })
        .catch((err) => {
            console.error('add_error: ', err)
            alert('Ошибка добавления записи в БД')
        })        
    }    

    function editAircraft(aircraft, image) {
        axios.post(updateAircraftUrl, {
            id: aircraft.id,
            model: aircraft.model,
            manufacturer: aircraft.manufacturer,
            releaseYear: aircraft.releaseYear,
            seats: aircraft.seats,
            status: aircraft.status
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })        
        .then((res) => {
            console.log('edit_res: ', res)
            if (res.data.statusCode === 0) {
                let newAircrafts = aircrafts.current
                newAircrafts.map((el,index) => {
                    if (el.id === aircraft.id) {
                        newAircrafts[index] = aircraft
                    }
                })
                //setAircrafts(allAircrafts)
                aircrafts.current = newAircrafts
                if (image.preview) {
                    saveImage(image, aircraft.id)
                }
            } else {
                const mes = 'Ошибка редактирования записи в БД: ' + res.data.statusText
                console.error(mes)
                alert(mes)
            }
        })
        .catch((err) => {
            console.error('edit_error: ', err)
            alert('Ошибка редактирования записи в БД')
        })        
    }
    
    function deleteAircraft(id) {
        console.log('delete id = ', id)
    
        axios.post(deleteAircraftUrl, {
            id: id
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            if (res.data.statusCode === 0) {
                // setAircrafts(aircrafts.filter(el => el.id !== id))
                aircrafts.current = aircrafts.current.filter(el => el.id !== id)
            } else {
                const mes = 'Ошибка удаления записи в БД: ' + res.data.statusText
                console.error(mes)
                alert(mes)
            }
        })
        .catch((err) => {
            console.error('edit_error: ', err)
            alert('Ошибка удаления записи в БД')
        })        
    }
    
    return (<div>
        <Header title="Список авиационной техники"/>
        {loading ? (
            <main>
                <h2>Идет загрузка ...</h2>    
            </main>
        ) : (
            <main>
                {console.log('airs: ', aircrafts.current)}
                <Aircrafts aircrafts={aircrafts.current} onAdd={addAircraft} onEdit={editAircraft} onDelete={deleteAircraft}/>
                <ul className="pagination">
                    {/* {[...Array(pages.current)].map((_,idx) => (
                        <li key={idx + 1} onClick={() => setPage(idx + 1)} className={page === (idx + 1) ? 'active' : ''}>{idx + 1}</li>
                    ))} */}
                    <li key={-1} onClick={() => setPage(1)}>{'<<'}</li>
                    {[...Array(liPageZ.current - liPageA.current + 1)].map((_,idx) => (
                        <li key={idx + liPageA.current} onClick={() => setPage(idx + liPageA.current)} className={page === (idx + liPageA.current) ? 'active' : ''}>{idx + liPageA.current}</li>
                    ))}
                    <li key={-2} onClick={() => setPage(pages.current)}>{'>>'}</li>
                 </ul>            
            </main>
        )}
    </div>)
}

export default App