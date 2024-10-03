import {IoCloseCircleSharp, IoDocument} from 'react-icons/io5'

function Aircraft ({el, onEdit, onDelete, setAircraft, setModalActive, setIsAdd}) {

    return (
        <tr>
            <td>
                <img src="https://reqres.in/img/faces/9-image.jpg" alt="" className="row-image"/>
            </td>
            <td>{el.model}</td>
            <td>{el.manufacturer}</td>
            <td>{el.releaseYear}</td>
            <td>{el.seats}</td>
            <td>{el.status}</td>
            <td>
                <IoDocument className="edit-icon" onClick={() => {
                    document.querySelector('#in_id').value = el.id;
                    document.querySelector('#in_model').value = el.model;
                    document.querySelector('#in_manuf').value = el.manufacturer;
                    document.querySelector('#in_year').value = el.releaseYear;
                    document.querySelector('#in_seats').value = el.seats;
                    document.querySelector('#in_status').value = el.status;
                    setAircraft(el);
                    setIsAdd(false);
                    setModalActive(true);
                    }
                } title="Редактировать"/>
                <IoCloseCircleSharp className="delete-icon" onClick={() => onDelete(el.id)} title="Удалить"/>
            </td>
        </tr>
    )
}

export default Aircraft;