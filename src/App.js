import React, { Component } from 'react'

class App extends Component {
  state = {
    startTime: undefined,
    endTime: undefined,
    timeLeft: undefined,
    countdown: undefined
  }
  render() {
    const { startTime, endTime, timeLeft, countdown } = this.state

    return (
      <div className="timer">
        <div className="timer__controls">
          <button onClick={this._startTimer.bind(this, 20)} className="timer__button">20 Secs</button>
          <button onClick={this._startTimer.bind(this, 300)} className="timer__button">Work 5</button>
          <button onClick={this._startTimer.bind(this, 900)} className="timer__button">Quick 15</button>
          <button onClick={this._startTimer.bind(this, 1200)} className="timer__button">Snack 20</button>
          <button onClick={this._startTimer.bind(this, 3600)} className="timer__button">Lunch Break</button>
          <form name="customTime" onSubmit={this._handleForm}>
            <input type="text" name="minutes" placeholder="Enter Minutes" />
          </form>
        </div>
        <div className="display">
          <h1 className="display__time-left">{ countdown && this._formatTimeLeft(timeLeft) }</h1>
          <p className="display__end-time">
            { countdown
              ? `Be Back At ${this._formatEndTime(endTime)}`
              : ``
            }
          </p>
        </div>
      </div>
    )
  }
  _startTimer = (seconds) => {
    clearInterval(this.state.countdown)

    const startTime = Date.now()
    const endTime = startTime + (seconds * 1000)
    const timeLeft = endTime - startTime

    const countdown = setInterval(() => {
      let { startTime, endTime } = this.state
      let timeLeft = endTime - Date.now()

      if (timeLeft < 0) {
        clearInterval(this.state.countdown)
        this.setState({ timeLeft: 0, countdown: undefined})
        return
      }

      this.setState({ timeLeft })
    }, 1000)

    this.setState({ startTime, endTime, timeLeft, countdown })
  }
  _handleForm = (e) => {
    e.preventDefault()

    let minutes = document.customTime.minutes.value

    this._startTimer(minutes * 60)
    document.customTime.reset()
  }
  _formatEndTime = (timestamp) => {
    const endTime = new Date(timestamp)
    const minutes = endTime.getMinutes()
    const hours = endTime.getHours()

    const adjustedHours = hours > 12 ? hours - 12 : hours

    return `${adjustedHours}:${minutes < 10 ? `0${minutes}` : minutes}`
  }
  _formatTimeLeft = (miliseconds) => {
    let hours = 0
    let minutes = 0
    let seconds = 0
    
    while (miliseconds > 0) {
      if (miliseconds >= 3600000) {
        hours++
        miliseconds -= 3600000
      } else if (miliseconds >= 60000) {
        minutes++
        miliseconds -= 60000
      } else {
        seconds++
        miliseconds -= 1000
      }
    }

    hours = hours > 0 ? hours + ":" : ""

    if (hours) {
      if (minutes < 10) {
        minutes = "0" + minutes
      }

      minutes += ":"
    } else {
      if (minutes === 0) {
        minutes = ""
      } else if (minutes < 10) {
        minutes = "0" + minutes + ":"
      } else {
        minutes += ":"
      }
    }
   
    seconds = seconds < 10 ? "0" + seconds : seconds
    return `${hours}${minutes}${seconds}`
  }
}

export default App
