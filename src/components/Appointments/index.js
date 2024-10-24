// Write your code here
import {Component} from 'react'
import './index.css'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem/index'

class Appointments extends Component {
  state = {appointmentList: [], title: '', date: '', starredBtnClick: false}
  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }

        return eachAppointment
      }),
    }))
  }

  onClickStarredButton = () => {
    this.setState(prevState => ({
      starredBtnClick: !prevState.starredBtnClick,
    }))
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    const formatDate = format(new Date(date), 'dd MMMM yyyy, EEEE')
    const newAppointment = {
      id: uuidv4(),
      title,
      date: formatDate,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      title: '',
      date: '',
    }))
  }

  getFilteredAppointments = () => {
    const {appointmentList, starredBtnClick} = this.state
    if (starredBtnClick) {
      return appointmentList.filter(
        eachAppointment => eachAppointment.isStarred === true,
      )
    }
    return appointmentList
  }

  render() {
    const {starredBtnClick, title, date} = this.state
    const filteredAppointments = this.getFilteredAppointments()

    return (
      <div className="app-container">
        <div className="main-container">
          <div className="upper-container w-100">
            <form className="form-container" onSubmit={this.onAddAppointment}>
              <h1 className="heading">Add Appointment</h1>
              <div className="input-container mb-4">
                <label className="mb-2 label" htmlFor="title">
                  Title
                </label>
                <input
                  placeholder="Title"
                  className="pl-2 p-2 title-input"
                  value={title}
                  onChange={this.onChangeTitle}
                  id="title"
                />
              </div>
              <div className="input-container mb-4">
                <label className="label" htmlFor="date">
                  Date
                </label>
                <input
                  placeholder="dd/mm/yyyy"
                  type="date"
                  className="pl-2 p-2 date-input"
                  onChange={this.onChangeDate}
                  value={date}
                  id="date"
                />
              </div>
              <button className="add-btn" type="submit">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointment-img"
            />
          </div>
          <hr className="hr-line" />
          <div className="lower-container w-100">
            <div className="lower-heads-starred-btn-container">
              <h1 className="lower-heading">Appointments</h1>
              <button
                className={`starred-button ${starredBtnClick ? 'active' : ''}`}
                onClick={this.onClickStarredButton}
              >
                Starred
              </button>
            </div>
            <ul className="appointment-list-container mt-4">
              {filteredAppointments.map(eachAppointment => (
                <AppointmentItem
                  key={eachAppointment.id}
                  appointmentDetails={eachAppointment}
                  toggleIsStarred={this.toggleIsStarred}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
