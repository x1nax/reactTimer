import { Component } from 'react';

import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';
import NewTaskForm from '../NewTaskForm/NewTaskForm';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    // Не вызывайте здесь this.setState()!
    localStorage.getItem('state')
      ? (this.state = JSON.parse(localStorage.getItem('state')))
      : (this.state = {
          items: [
            {
              value: 'Learn Js',
              id: 1,
              complited: false,
              isHidden: false,
              time: Date.now(),
              sec: 0,
              timer: undefined,
            },
            {
              value: 'Learn React',
              id: 2,
              complited: false,
              isHidden: false,
              time: Date.now(),
              sec: 0,
              timer: undefined,
            },
            {
              value: 'Get a job',
              id: 3,
              complited: false,
              isHidden: false,
              time: Date.now(),
              sec: 0,
              timer: undefined,
            },
          ],
          maxID: 4,
          complitedMod: false,
          notModes: true,
        });
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.handleWindowBeforeUnload);
  }

  componentDidUpdate() {
    console.log('записываю в локал');
    console.log(this.state);
    localStorage.setItem('state', JSON.stringify(this.state));
  }

  handleWindowBeforeUnload = () => {
    const { items } = this.state;
    items.map((item) => {
      item.timer = clearInterval(item.timer);
      return item;
    });
    this.setState({ items });
  };

  isComplited = (id) => {
    const { items } = this.state;
    const { complitedMod } = this.state;
    const { notModes } = this.state;
    items.map((item) => {
      if (item.id === id) {
        item.complited = !item.complited;
        if (item.complited !== complitedMod && notModes === false) {
          item.isHidden = true;
        }
      }
      return item;
    });
    this.setState({ items });
  };

  onDelete = (id) => {
    let { items } = this.state;
    items.map((item) => {
      if (item.id === id) {
        item.timer = clearInterval(item.timer);
      }
      return item;
    });
    items = items.filter((item) => item.id !== id);
    this.setState({ items });
    console.log('удаляю');
  };

  clearComplited = () => {
    let { items } = this.state;
    items.map((item) => {
      if (item.complited) {
        item.timer = clearInterval(item.timer);
      }
      return item;
    });
    items = items.filter((item) => !item.complited);
    this.setState({ items });
  };

  complitedModOn = () => {
    const { items } = this.state;
    items.map((item) => {
      if (item.complited === false) {
        item.isHidden = true;
      } else item.isHidden = false;
      return item;
    });
    this.setState({ complitedMod: true });
    this.setState({ notModes: false });
    this.setState({ items });
  };

  activeModOn = () => {
    const { items } = this.state;
    items.map((item) => {
      if (item.complited === true) {
        item.isHidden = true;
      } else item.isHidden = false;
      return item;
    });
    this.setState({ complitedMod: false });
    this.setState({ notModes: false });
    this.setState({ items });
  };

  notModesOn = () => {
    const { items } = this.state;
    items.map((item) => {
      item.isHidden = false;
      return item;
    });
    this.setState({ complitedMod: false });
    this.setState({ notModes: true });
    this.setState({ items });
  };

  addTask = (label) => {
    let { maxID } = this.state;
    maxID++;
    const { complitedMod } = this.state;
    let { items } = this.state;
    items = [
      ...items,
      {
        value: label,
        id: maxID,
        complited: false,
        isHidden: complitedMod,
        time: Date.now(),
        sec: 0,
      },
    ];
    this.setState({ items });
    this.setState({ maxID });
  };

  onEdit = (newtask, id) => {
    const { items } = this.state;
    items.map((item) => {
      if (item.id === id) {
        item.value = newtask;
      }
      return item;
    });
    this.setState({ items });
  };

  timerOn = (id) => {
    const { items } = this.state;
    items.map((item) => {
      if (item.id === id && !item.timer) {
        item.timer = setInterval(() => {
          item.sec++;
          this.setState({ items });
        }, 1000);
      }
      return item;
    });
    this.setState({ items });
  };

  timerOff = (id) => {
    const { items } = this.state;
    items.map((item) => {
      if (item.id === id) {
        item.timer = clearInterval(item.timer);
      }
      return item;
    });
    this.setState({ items });
  };

  render() {
    let { items: doneCount } = this.state;
    doneCount = doneCount.filter((item) => !item.complited).length;
    const { items } = this.state;
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm addTask={this.addTask} />
        </header>
        <section className="main">
          <TaskList
            items={items}
            isComplited={this.isComplited}
            onDelete={this.onDelete}
            onEdit={this.onEdit}
            timerOff={this.timerOff}
            timerOn={this.timerOn}
          />
          <Footer
            complitedModOn={this.complitedModOn}
            activeModOn={this.activeModOn}
            notModesOn={this.notModesOn}
            doneCount={doneCount}
            clearComplited={this.clearComplited}
          />
        </section>
      </section>
    );
  }
}
