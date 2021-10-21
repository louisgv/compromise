const pst = 'PastTense'

export default {
  before: {
    Adverb: pst, //quickly detailed
    Pronoun: pst, //he detailed
    Noun: pst, //eye closed
    Auxiliary: pst,
  },
  after: {
    Possessive: pst, //hooked him
    Pronoun: pst, //hooked me
    Determiner: pst, //hooked the
  },
  beforeWords: {
    had: pst,
    has: pst,
    have: pst,
    been: pst,
  },
  afterWords: {
    by: pst, //damaged by
    back: pst, //charged back
    out: pst, //charged out
    in: pst, //crowded in
    up: pst, //heated up
    down: pst, //hammered down
  },
}