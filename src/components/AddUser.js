import React from "react"

class AddUser extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            firstname: '',
            lastname: '',
            bio: '',
            age: 1,
            isHappy: false
        }
    }

    userAdd = {}

    render() {
        return (
            <form ref={el => this.myForm = el}>
                <input placeholder="Имя" onChange={el => this.setState({first_name: el.target.value})}/>
                <input placeholder="Фамилия" onChange={el => this.setState({last_name: el.target.value})}/>
                <textarea placeholder="Биография" onChange={el => this.setState({bio: el.target.value})}/>
                <input placeholder="Возраст" onChange={el => this.setState({age: el.target.value})}/>
                <label htmlFor="isHappy">Счастлив ?</label>
                <input type="checkbox" id="isHappy" onChange={el => this.setState({isHappy: el.target.checked})}/>
                <button type="button" onClick={() => {
                    this.userAdd = {
                        first_name: this.state.first_name,
                        last_name: this.state.last_name,
                        bio: this.state.bio,
                        age: this.state.age,
                        isHappy: this.state.isHappy
                    }
                    if (this.props.user)
                        this.userAdd.id = this.props.user.id
                    this.props.onAdd(this.userAdd)
                    this.myForm.reset()
                }
                }>Добавить</button>
            </form>
        )
    }
}

export default AddUser