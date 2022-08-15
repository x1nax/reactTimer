import propTypes from 'prop-types';
import Task from '../Task/Task';
import './TaskList.css';

export default function TaskList({ items, isComplited, onDelete, onEdit, timerOff, timerOn }) {
  const elements = items.map((item) => (
    <Task
      item={item.value}
      key={item.id}
      complite={item.complited}
      isComplited={isComplited}
      id={item.id}
      time={item.time}
      onDelete={onDelete}
      sec={item.sec}
      timerOff={timerOff}
      timerOn={timerOn}
      isHidden={item.isHidden}
      onEdit={onEdit}
    />
  ));
  return <ul className="todo-list">{elements}</ul>;
}
TaskList.defaultProps = {
  onDelete: () => {},
  onEdit: () => {},
  items: [],
};

TaskList.prototype = {
  onDelete: propTypes.func,
  onEdit: propTypes.func,
  items: propTypes.array,
};
