// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleIsStarred} = props
  const {title, date, isStarred, id} = appointmentDetails

  const onClickFavoriteIcon = () => {
    toggleIsStarred(id)
  }

  const starImgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="appointment-list-item mr-3 mb-3">
      <div>
        <p className="title">{title}</p>
        <p className="date">Date: {date}</p>
      </div>
      <button
        onClick={onClickFavoriteIcon}
        className="fav-btn"
        data-testid="star"
      >
        <img src={starImgUrl} alt
        ="star" />
      </button>
    </li>
  )
}

export default AppointmentItem
