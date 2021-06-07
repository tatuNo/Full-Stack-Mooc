import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  const notificationStyle = {
    color: `${notification.color}`,
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if(!notification.message) {
    return null
  }

  return (
    <div style={notificationStyle}>
      {notification.message}
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.object
}

export default Notification