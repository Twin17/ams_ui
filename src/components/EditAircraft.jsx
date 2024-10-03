import React from "react"

function EditAircraft ({onAdd, onEdit, aircraft, setModalActive, isAdd}) {

    return (
        <div className="param-conteiner">
            <h2>Параметры</h2>
            {/* <form className="param-form" ref={el => editForm = el}> */}
            {/* <form id="edit-form" className="param-form" method="post"> */}
            <form id="edit-form" className="param-form">
            {/* <form className="param-form" ref={el => setEditForm(el)}> */}
                <input id="in_id" type="hidden"/>
                <input id="in_model" placeholder="Модель" required className="param-input"/>
                <input id="in_manuf" placeholder="Производитель" required className="param-input"/>
                <input id="in_year" placeholder="Год выпуска" required type="number" className="param-input"/>
                <input id="in_seats" placeholder="Количество мест" required type="number" className="param-input"/>
                <input id="in_status" placeholder="Статус" required className="param-input"/>
                {/* <button id="reg-btn">Сохранить</button> */}
                <button type="submit" id="reg-btn" onClick={() => {
                    let aircraftEdit = {
                        model: document.querySelector('#in_model').value, 
                        manufacturer: document.querySelector('#in_manuf').value, 
                        releaseYear: document.querySelector('#in_year').value, 
                        seats: document.querySelector('#in_seats').value, 
                        status: document.querySelector('#in_status').value
                    }
                    if (isAdd) {
                        console.log('add call')
                        onAdd(aircraftEdit)
                    } else {
                        aircraftEdit.id = aircraft.id
                        // aircraftEdit.id = document.querySelector('#in_id').value
                        // console.log('in_id = ', document.querySelector('#in_id').value)
                        console.log('edit_id = ', aircraftEdit.id)
                        onEdit(aircraftEdit)
                    }
                    //editForm.reset()
                    //this.form.reset()
                    setModalActive(false)
                }
                }>Сохранить</button>
            </form>
        </div>
    )
}

export default EditAircraft;