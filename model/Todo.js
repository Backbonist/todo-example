// Our basic **Todo** model has `content`, `order`, and `done` attributes.
xx.model.Todo = Backbone.Model.extend({

  // Default attributes for the todo.
  defaults: {
    content: "empty todo...",
    done: false
  },

  // Ensure that each todo created has `content`.
  initialize: function() {
    if (!this.get("content")) {
      this.set({"content": this.defaults.content});
    }
  },

  // Toggle the `done` state of this todo item.
  toggle: function() {
    this.save({done: !this.get("done")});
  },

  // Remove this Todo from *localStorage* and delete its view.
  clear: function() {
    this.destroy();
  }

});

// Todo Collection
// ---------------

// The collection of todos is backed by *localStorage* instead of a remote
// server.
xx.model.Todos = Backbone.Collection.extend({

  // Reference to this collection's model.
  model: xx.model.Todo,

  // Save all of the todo items under the `"todos"` namespace.
  localStorage: new Backbone.Store("todos-backbone"),

  // Filter down the list of all todo items that are finished.
  done: function() {
    return this.filter(function(todo){ return todo.get('done'); });
  },

  // Filter down the list to only todo items that are still not finished.
  remaining: function() {
    return this.without.apply(this, this.done());
  },

  // We keep the Todos in sequential order, despite being saved by unordered
  // GUID in the database. This generates the next order number for new items.
  nextOrder: function() {
    if (!this.length) return 1;
    return this.last().get('order') + 1;
  },

  // Todos are sorted by their original insertion order.
  comparator: function(todo) {
    return todo.get('order');
  }

});

// Create our global collection of **Todos**.
xx.model.todos = new xx.model.Todos();
