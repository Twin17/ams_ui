import React, {useState} from "react"

function EditAircraft ({onAdd, onEdit, aircraft, setModalActive, isAdd, imageUrl}) {
    const [image, setImage] = useState({
        preview: '',
        raw: ''
    });

    const handlePhotoChange = (el) => {
        if (el.target.files.length) {
            setImage({
                preview: URL.createObjectURL(el.target.files[0]),
                raw: el.target.files[0],
            });
        }
    };

    return (
        <div className="param-conteiner">
            <h2>Параметры техники</h2>
            <form id="edit-form" className="param-form">
                <input id="upload-button" name="image" type="file" style={{display: 'none'}} onChange={handlePhotoChange}/>
                <label htmlFor="upload-button">
                    {image.preview ? (
                        <div>
                            <img src={image.preview} alt="dummy" className="row-image"/>
                            <li>Upload Image</li>
                        </div>
                    ) : (
                        <div>
                            <img src={imageUrl.current} alt="dummy" className="row-image"/>
                            <li>Upload Image</li>
                        </div>
                    )}
                </label>
                <input id="in_id" type="hidden"/>
                <input id="in_model" placeholder="Модель" required className="param-input"/>
                <input id="in_manuf" placeholder="Производитель" required className="param-input"/>
                <input id="in_year" placeholder="Год выпуска" required type="number" className="param-input"/>
                <input id="in_seats" placeholder="Количество мест" required type="number" className="param-input"/>
                <input id="in_status" placeholder="Статус" required className="param-input"/>
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
                        onAdd(aircraftEdit, image)
                    } else {
                        aircraftEdit.id = aircraft.id
                        console.log('edit_id = ', aircraftEdit.id)
                        onEdit(aircraftEdit, image)
                    }
                    setModalActive(false)
                }
                }>Сохранить</button>
            </form>
        </div>
    )
}

export default EditAircraft;