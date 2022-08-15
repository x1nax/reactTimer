import classNames from 'classnames';
import './TasksFilterBtn.css';
import propTypes from 'prop-types';

export default function TasksFilterBtn({ func, selected, lable, id, select }) {
  return (
    <li>
      <button
        type="button"
        className={classNames({ selected })}
        onClick={() => {
          func();
          select(id);
        }}
      >
        {lable}
      </button>
    </li>
  );
}

TasksFilterBtn.defaultProps = {
  func: () => {},
  selected: false,
  select: () => {},
};

TasksFilterBtn.propTypes = {
  func: propTypes.func,
  select: propTypes.func,
  selected: propTypes.bool,
};
