# rex

Generate matching strings from regular expressions.

### Works for

* [x] **literals**,
      $ rex "abcd"
      [ 'abcd' ]

* [x] **character sets** and
      $ rex "[a-c][0-2]"
      [ 'a0', 'a1', 'a2', 'b0', 'b1', 'b2', 'c0', 'c1', 'c2']

* [x] **alternation**.
      $ rex "(hi|bye)"
      [ 'hi', 'bye' ]

### Not yet implemented

* [ ] **quantifiers**,
* [ ] **backreferences (possible?)** and
* [ ] **lookaheads (possible?)**.
