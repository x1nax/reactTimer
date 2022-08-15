import './Footer.css';
import propTypes from 'prop-types';

import TaskFilter from '../TasksFilter/TasksFilter';

export default function Footer({ complitedModOn, activeModOn, notModesOn, doneCount, clearComplited }) {
  return (
    <footer className="footer">
      <span className="todo-count">{doneCount} items left</span>
      <TaskFilter complitedModOn={complitedModOn} activeModOn={activeModOn} notModesOn={notModesOn} />
      <button className="clear-completed" onClick={() => clearComplited()} type="button">
        Clear completed
      </button>
    </footer>
  );
}

Footer.defaultProps = {
  complitedModOn: () => {},
  activeModOn: () => {},
  notModesOn: () => {},
  doneCount: 0,
  clearComplited: () => {},
};

Footer.propTypes = {
  complitedModOn: propTypes.func,
  activeModOn: propTypes.func,
  notModesOn: propTypes.func,
  clearComplited: propTypes.func,
  doneCount: propTypes.number,
};
