# rex

Generate matching strings from regular expressions.

```bash
$ npm install rex [-g]
```

### Usage

```bash
rex <pattern[, pattern[, ...]]>
```

```javascript
var rex = require('rex');
var matches = rex(pattern[, pattern[, ...]]);
```

Arguments are automatically concatenated, so `rex a b` is equivalent to `rex ab`. The same applies when used as a module.

### Works for

* [x] **literals**,

```bash
$ rex "abcd"
["abcd"]
```

* [x] **character sets**

```bash
$ rex "[a-c][0-2]"
["a0","a1","a2","b0","b1","b2","c0","c1","c2"]
```

* [x] and **alternations**.

```bash
$ rex "(hi|bye) world"
["hi world","bye world"]
```

### Not yet implemented

* [ ] **quantifiers**,
* [ ] **special characters**,
* [ ] **backreferences** (?)
* [ ] and **lookaheads** (?).
