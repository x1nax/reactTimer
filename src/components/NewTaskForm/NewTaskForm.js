import { Component } from 'react';
import './NewTaskForm.css';
import propTypes from 'prop-types';

export default class NewTaskForm extends Component {
  state = {
    lable: '',
  };

  static defaultProps = {
    addTask: () => {},
  };

  static propTypes = {
    addTask: propTypes.func,
  };

  onLableChange = (e) => {
    this.setState({ lable: e.target.value });
  };

  onSubmitInput = (e) => {
    const { lable } = this.state;
    const { addTask } = this.props;
    if (e.key === 'Enter' && lable !== '') {
      addTask(lable);
      this.setState({ lable: '' });
    }
  };

  render() {
    const { lable } = this.state;

    return (
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        onChange={this.onLableChange}
        onKeyDown={this.onSubmitInput}
        value={lable}
      />
    );
  }
}
