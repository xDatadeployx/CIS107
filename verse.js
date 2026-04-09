const Verse = (() => {
  function createInstance(definition, el) {
    const instance = {
      el,
      state: { ...(definition.state || {}) },
      methods: {},

      setState(newState) {
        this.state = { ...this.state, ...newState };
        this._render();
      },

      _render() {
        const html = definition.render.call(this);
        this.el.innerHTML = html;
        this._bindEvents();
      },

      _bindEvents() {
        const nodes = this.el.querySelectorAll('[v-on]');
        nodes.forEach((node) => {
          const methodName = node.getAttribute('v-on');
          const eventType = node.getAttribute('v-event') || 'click';
          if (this.methods[methodName]) {
            node.addEventListener(eventType, (e) => {
              e.preventDefault();
              this.methods[methodName].call(this, e);
            });
          }
        });
      },
    };

    if (definition.methods) {
      Object.keys(definition.methods).forEach((key) => {
        instance.methods[key] = definition.methods[key];
      });
    }

    if (definition.created) {
      definition.created.call(instance);
    }

    return instance;
  }

  return {
    component(definition) {
      return definition;
    },

    mount(definition, selector) {
      const el = typeof selector === 'string'
        ? document.querySelector(selector)
        : selector;

      if (!el) {
        console.warn(`Verse.mount: element "${selector}" not found`);
        return null;
      }

      const instance = createInstance(definition, el);
      instance._render();
      return instance;
    },
  };
})();

export default Verse;
