classyJS
========

Just For funsies !
(inspired by winjs)

- class
- inheritance
- private members (buggy)
- accessors

Hopefully something like that:

**Creating a class**
```javascript
var Foo = My.Class.define(
  // contructor
  function Foo_ctor(...) { ... },
  // instance members
  {
    ...
  },
  // class members
  {
    ...
  }
);

var leFoo = new Foo(...);

```

**Extend**
```javascript
var Bar = My.Class.derive(Foo,
  // contructor
  function Bar_ctor(...) { ... },
  // instance members
  {
    ...
  },
  // class members
  {
    ...
  }
);

var leBar = new Bar(...);

```

**Other Stuff**
```javascript
var Foo = My.Class.define(
  ...,
  // instance members
  {
    // private
    _melon : "fruit",
    // accessors
    bar : {
      get: function () { return this._melon; },
      set: function(value) { this._melon = value; }
    }
  },
  ...
);


```
