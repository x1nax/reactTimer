import './TasksFilter.css';
import { Component } from 'react/cjs/react.production.min';

import TasksFilterBtn from '../TasksFilterBtn/TasksFilterBtn';

export default class TaskFilter extends Component {
  state = {
    btns: [
      {
        id: 0,
        func: this.props.notModesOn,
        selected: false,
        lable: 'All',
      },
      {
        id: 1,
        func: this.props.activeModOn,
        selected: false,
        lable: 'Active',
      },
      {
        id: 2,
        func: this.props.complitedModOn,
        selected: false,
        lable: 'Completed',
      },
    ],
  };

  select = (id) => {
    const { btns } = this.state;
    btns.map((btn) => {
      btn.selected = false;
      if (btn.id === id) {
        btn.selected = true;
      }
      return btn;
    });
    this.setState({ btns });
  };

  render() {
    const { btns } = this.state;
    const elements = btns.map((btn) => (
      <TasksFilterBtn
        key={btn.id}
        id={btn.id}
        func={btn.func}
        selected={btn.selected}
        lable={btn.lable}
        select={this.select}
      />
    ));

    return <ul className="filters">{elements}</ul>;
  }
}
