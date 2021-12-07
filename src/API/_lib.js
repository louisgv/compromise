


/** add words to assume by prefix in typeahead */

/** log the decision-making to console */
const verbose = function (set) {
  let env = typeof process === 'undefined' ? self.env : process.env //use window, in browser
  env.DEBUG_TAGS = set === 'tagger' || set === true ? true : ''
  env.DEBUG_MATCH = set === 'match' || set === true ? true : ''
  env.DEBUG_CHUNKS = set === 'chunker' || set === true ? true : ''
  return this
}

/** pre-compile a list of matches to lookup */
const compile = function (input) {
  return this().compile(input)
}
export { verbose, compile }