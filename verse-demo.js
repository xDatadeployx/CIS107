import Verse from './verse.js';

const Counter = Verse.component({
  state: { count: 0 },

  methods: {
    increment() {
      this.setState({ count: this.state.count + 1 });
    },
    decrement() {
      this.setState({ count: this.state.count - 1 });
    },
    reset() {
      this.setState({ count: 0 });
    },
  },

  render() {
    const { count } = this.state;
    const color = count > 0 ? '#2e7d32' : count < 0 ? '#c62828' : '#555';
    return `
      <div class="verse-counter">
        <button class="verse-btn verse-btn-outline" v-on="decrement">&#8722;</button>
        <span class="verse-count" style="color: ${color}">${count}</span>
        <button class="verse-btn verse-btn-outline" v-on="increment">&#43;</button>
        <button class="verse-btn verse-btn-ghost" v-on="reset">Reset</button>
      </div>
    `;
  },
});

const TodoList = Verse.component({
  state: {
    todos: [
      { id: 1, text: 'Learn HTML', done: true },
      { id: 2, text: 'Learn CSS', done: true },
      { id: 3, text: 'Build Verse.js', done: false },
    ],
    input: '',
  },

  methods: {
    addTodo() {
      const input = this.el.querySelector('#todo-input');
      const text = input ? input.value.trim() : '';
      if (!text) return;
      const todos = [
        ...this.state.todos,
        { id: Date.now(), text, done: false },
      ];
      this.setState({ todos, input: '' });
    },
    toggle(e) {
      const id = parseInt(e.currentTarget.getAttribute('data-id'));
      const todos = this.state.todos.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      );
      this.setState({ todos });
    },
    remove(e) {
      const id = parseInt(e.currentTarget.getAttribute('data-id'));
      const todos = this.state.todos.filter((t) => t.id !== id);
      this.setState({ todos });
    },
  },

  render() {
    const { todos } = this.state;
    const items = todos
      .map(
        (t) => `
        <li class="todo-item ${t.done ? 'done' : ''}">
          <button class="todo-check" v-on="toggle" data-id="${t.id}" v-event="click">
            ${t.done ? '&#10003;' : ''}
          </button>
          <span class="todo-text">${t.text}</span>
          <button class="todo-remove" v-on="remove" data-id="${t.id}" v-event="click">&#10005;</button>
        </li>
      `
      )
      .join('');

    const remaining = todos.filter((t) => !t.done).length;

    return `
      <div class="verse-todo">
        <div class="todo-input-row">
          <input id="todo-input" type="text" placeholder="Add a new task..." class="todo-input" />
          <button class="verse-btn verse-btn-primary" v-on="addTodo">Add</button>
        </div>
        <ul class="todo-list">${items}</ul>
        <p class="todo-footer">${remaining} task${remaining !== 1 ? 's' : ''} remaining</p>
      </div>
    `;
  },
});

const ColorPicker = Verse.component({
  state: {
    hue: 200,
    saturation: 70,
    lightness: 50,
  },

  methods: {
    updateHue(e) {
      this.setState({ hue: parseInt(e.target.value) });
    },
    updateSaturation(e) {
      this.setState({ saturation: parseInt(e.target.value) });
    },
    updateLightness(e) {
      this.setState({ lightness: parseInt(e.target.value) });
    },
  },

  render() {
    const { hue, saturation, lightness } = this.state;
    const hsl = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    const textColor = lightness > 55 ? '#222' : '#fff';

    return `
      <div class="verse-color-picker">
        <div class="color-preview" style="background: ${hsl}; color: ${textColor}">
          <span>${hsl}</span>
        </div>
        <div class="color-sliders">
          <label>Hue <span>${hue}</span>
            <input type="range" min="0" max="360" value="${hue}" v-on="updateHue" v-event="input" />
          </label>
          <label>Saturation <span>${saturation}%</span>
            <input type="range" min="0" max="100" value="${saturation}" v-on="updateSaturation" v-event="input" />
          </label>
          <label>Lightness <span>${lightness}%</span>
            <input type="range" min="0" max="100" value="${lightness}" v-on="updateLightness" v-event="input" />
          </label>
        </div>
      </div>
    `;
  },
});

Verse.mount(Counter, '#counter-app');
Verse.mount(TodoList, '#todo-app');
Verse.mount(ColorPicker, '#color-app');
