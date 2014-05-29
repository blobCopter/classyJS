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

**Stuff**
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
