import React, {useState, useRef, useEffect} from "react"
import Header from "./components/Header"
import Aircrafts from "./components/Aircrafts"
import axios from "axios"

const mainHost = 'http://localhost:8080'
const getAircraftsUrl = mainHost + '/api/getAircrafts'
const addAircraftUrl = mainHost + '/api/addAircraft'
const updateAircraftUrl = mainHost + '/api/updateAircraft'
const deleteAircraftUrl = mainHost + '/api/deleteAircraft'

function App () {
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const aircrafts = useRef()
    const pages = useRef(1)

    useEffect(() => {
        setLoading(true);
        axios.post(getAircraftsUrl, {
            model2: 'Kukuruznik',
            manufacturer2: 'Soviet Union',
            pageNum: page,
            pageSize: 5
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
        })
        .catch((err) => {
            console.log(err)
            alert('Ошибка загрузки данных из БД')
        })
        .finally(() => setLoading(false))
    }, [page])

    function addAircraft(aircraft) {
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

    function editAircraft(aircraft) {
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
                let allAircrafts = aircrafts.current
                allAircrafts.map((el,index) => {
                    if (el.id === aircraft.id) {
                        allAircrafts[index] = aircraft
                    }
                })
                //setAircrafts(allAircrafts)
                aircrafts.current = allAircrafts
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
                    {/* <li key={-1}>{'<'}</li> */}
                    {[...Array(pages.current)].map((_,idx) => (
                        <li key={idx + 1} onClick={() => setPage(idx + 1)} className={page === (idx + 1) ? 'active' : ''}>{idx + 1}</li>
                    ))}
                    {/* <li key={-2}>{'>'}</li> */}
                 </ul>            
            </main>
        )}
    </div>)
}

export default App