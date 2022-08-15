import './Task.css';
import classNames from 'classnames';
import { formatDistanceToNow } from 'date-fns';
import { Component } from 'react';

export default class Task extends Component {
  state = {
    editMode: false,
    value: this.props.item,
  };

  onLableChange = (e) => {
    this.setState({ value: e.target.value });
  };

  onSubmitInput = (e) => {
    const { id } = this.props;
    const { value } = this.state;
    const { onEdit } = this.props;
    if (e.key === 'Enter' && value !== '') {
      onEdit(value, id);
      this.setState({ editMode: false });
    }
  };

  currentTime = (seconds) => {
    const sec = seconds % 60 > 9 ? seconds % 60 : `0${seconds % 60}`;
    const min =
      Math.floor((seconds % 3600) / 60) > 9
        ? Math.floor((seconds % 3600) / 60)
        : `0${Math.floor((seconds % 3600) / 60)}`;
    const hour = Math.floor(seconds / 3600) > 9 ? Math.floor(seconds / 3600) : `0${Math.floor(seconds / 3600)}`;
    const str = hour > 0 ? `${hour}:${min}:${sec}` : `${min}:${sec}`;
    return str;
  };

  render() {
    const { editMode, value } = this.state;
    const { onDelete, complite, isHidden, time, item, id, isComplited, timerOff, timerOn, sec } = this.props;
    const elem = editMode ? (
      <input className="edit" onChange={this.onLableChange} onKeyDown={this.onSubmitInput} value={value} />
    ) : (
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          onClick={() => {
            isComplited(id);
          }}
        />
        <label>
          <span className="description">{item}</span>
          <section className="timer">
            <button
              type="button"
              className="icon icon-play"
              onClick={() => {
                timerOn(id);
              }}
            />
            <button
              type="button"
              className="icon icon-pause"
              onClick={() => {
                timerOff(id);
              }}
            />
            <span className="time">{this.currentTime(sec)}</span>
          </section>
          <span className="created">{formatDistanceToNow(time, { includeSeconds: true })}</span>
        </label>
        <section className="edit-buttons">
          <button
            type="button"
            className="icon icon-edit"
            onClick={() => {
              this.setState({ editMode: true });
            }}
          />
          <button
            type="button"
            className="icon icon-destroy"
            onClick={() => {
              onDelete(id);
            }}
          />
        </section>
      </div>
    );
    return <li className={classNames({ completed: complite, isHidden })}>{elem}</li>;
  }
}
