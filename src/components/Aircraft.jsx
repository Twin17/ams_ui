import {IoCloseCircleSharp, IoDocument} from 'react-icons/io5'

function Aircraft ({el, setAircraft, setModalActive, setDeleteActive, setIsAdd, imageUrl}) {

    const onEditIconAction = (el) => {
        document.querySelector('#in_id').value = el.id;
        document.querySelector('#in_model').value = el.model;
        document.querySelector('#in_manuf').value = el.manufacturer;
        document.querySelector('#in_year').value = el.releaseYear;
        document.querySelector('#in_seats').value = el.seats;
        document.querySelector('#in_status').value = el.status;
        imageUrl.current = 'http://localhost:8080/api/amsmainfile/' + el.id;
        setAircraft(el);
        setIsAdd(false);
        setModalActive(true);
    }

    const onDeleteIconAction = (el) => {
        document.querySelector('#del_id').value = el.id;
        document.querySelector('#del_model').value = el.model;
        document.querySelector('#del_manuf').value = el.manufacturer;
        document.querySelector('#del_year').value = el.releaseYear;
        document.querySelector('#del_seats').value = el.seats;
        document.querySelector('#del_status').value = el.status;
        imageUrl.current = 'http://localhost:8080/api/amsmainfile/' + el.id;
        setAircraft(el);
        setDeleteActive(true);
    }

    return (
        <tr>
            <td>
                {/* <img src="https://reqres.in/img/faces/9-image.jpg" alt="" className="row-image"/> */}
                <img src={'http://localhost:8080/api/amsmainfile/' + el.id} alt="" className="row-image"/>
            </td>
            <td>{el.model}</td>
            <td>{el.manufacturer}</td>
            <td>{el.releaseYear}</td>
            <td>{el.seats}</td>
            <td>{el.status}</td>
            <td>
                <IoDocument className="edit-icon" onClick={() => onEditIconAction(el)} title="Редактировать"/>
                <IoCloseCircleSharp className="delete-icon" onClick={() => onDeleteIconAction(el)} title="Удалить"/>
            </td>
        </tr>
    )
}

export default Aircraft;