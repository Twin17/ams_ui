import {useState, useRef} from "react"
import Aircraft from './Aircraft'
import Modal from "./Modal"
import EditAircraft from "./EditAircraft"
import DeleteAircraft from "./DeleteAircraft"

function Aircrafts ({aircrafts, onAdd, onEdit, onDelete}) {
    const [modalActive, setModalActive] = useState(false)
    const [deleteActive, setDeleteActive] = useState(false)
    const [aircraft, setAircraft] = useState({})
    const [isAdd, setIsAdd] = useState(false)
    const imageUrl = useRef('')

    if (aircrafts.length > 0)
        return (
            <div>
                <button className="add-btn" onClick={() => {
                    document.querySelector('#in_model').value = null;
                    document.querySelector('#in_manuf').value = null;
                    document.querySelector('#in_year').value = null;
                    document.querySelector('#in_seats').value = null;
                    document.querySelector('#in_status').value = null;
                    setIsAdd(true)
                    setModalActive(true)
                }
                }>Добавить</button>
                <Modal active={modalActive} setActive={setModalActive}>
                    <EditAircraft 
                        className="editAircraft" 
                        onAdd={onAdd} 
                        onEdit={onEdit}
                        aircraft={aircraft} 
                        setModalActive={setModalActive}
                        isAdd={isAdd}
                        imageUrl={imageUrl}
                    />
                </Modal>
                <Modal active={deleteActive} setActive={setDeleteActive}>
                    <DeleteAircraft
                        className="deleteAircraft"
                        aircraft={aircraft}
                        onDelete={onDelete}
                        setDeleteActive={setDeleteActive}
                        imageUrl={imageUrl}
                    />
                </Modal>
                <table>
                    <tbody>
                    <tr>
                        <th>Изображение</th>
                        <th>Модель</th>
                        <th>Производитель</th>
                        <th>Год выпуска</th>
                        <th>Кол-во мест</th>
                        <th>Статус</th>
                        <th>Действия</th>
                    </tr>
                    {aircrafts.map(el => (
                        <Aircraft key={el.id} el={el} 
                            setAircraft={setAircraft} 
                            setModalActive={setModalActive}
                            setDeleteActive={setDeleteActive}
                            setIsAdd={setIsAdd}
                            imageUrl={imageUrl}
                        />
                    ))}
                    </tbody>
                </table>
            </div>)
    else
        return (
            <div>
                <h3>Авиационная техника отсутствует</h3>
            </div>)      
}

export default Aircrafts;
