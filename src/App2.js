import React from "react"
import Header from "./components/Header"
import Aircrafts from "./components/Aircrafts"
import axios from "axios"

class App2 extends React.Component {
    constructor(props) {
        super(props)

        axios.post('http://localhost:8080/api/getAircrafts', {
            model2: 'Kukuruznik',
            manufacturer2: 'Soviet Union',
            pageNum: 1,
            pageSize: 5
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            console.log(res)
            this.setState({aircrafts: res.data.aircrafts})
        })
        .catch((err) => {
            console.log(err)
        })

        this.state = {
            aircrafts: [],
            pageNum: 1
        }

        this.addAircraft = this.addAircraft.bind(this)
        this.editAircraft = this.editAircraft.bind(this)
        this.deleteAircraft = this.deleteAircraft.bind(this)
    }

    render() {
        return (<div>
            <Header title="Список авиационной техники"/>
            <main>
                <Aircrafts aircrafts={this.state.aircrafts} onAdd={this.addAircraft} onEdit={this.editAircraft} onDelete={this.deleteAircraft}/>
                <ul className="pagination">
                    <li>{'<'}</li>
                    <li>1</li>
                    <li className="active">2</li>
                    <li>3</li>
                    <li>{'>'}</li>
                    {/* {[...Array(5)].map((_,idx) => (
                        <li key={idx + 1} onClick={this.setState({pageNum: idx + 1})} className={this.state.pageNum === (idx + 1) ? 'active' : ''}>{idx + 1}</li>
                    ))} */}
                </ul>            
            </main>
            {/* <aside>
                <AddUser onAdd={this.addUser}/>
            </aside> */}
        </div>)
    }

    deleteAircraft(id) {
        console.log('delete id = ', id)

        axios.post('http://localhost:8080/api/deleteAircraft', {
            id: id
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            if (res.data.statusCode === 0) {
                this.setState({
                    aircrafts: this.state.aircrafts.filter(el => el.id !== id)
                })
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

    editAircraft(aircraft) {
        axios.post('http://localhost:8080/api/updateAircraft', {
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
                // let allAircrafts = this.state.aircrafts
                // allAircrafts.map((el,index) => {
                //     if (el.id === aircraft.id) {
                //         allAircrafts[index] = aircraft
                //     }
                // })
                // this.setState({aircrafts: []}, () => {
                //     this.setState({aircrafts: [...allAircrafts]})
                // })

                let allAircrafts = this.state.aircrafts
                allAircrafts.map((el,index) => {
                    if (el.id === aircraft.id) {
                        allAircrafts[index] = aircraft
                    }
                })
                // this.setState({aircrafts: []}, () => {
                    this.setState({aircrafts: [...allAircrafts]})
                // })
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

    addAircraft(aircraft) {
        axios.post('http://localhost:8080/api/addAircraft', {
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
                this.setState({aircrafts: [{...aircraft}, ...this.state.aircrafts]})
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
}

export default App2