export interface Term {
  text: string,
  pre: string,
  post: string,
  normal: string,

  // in /two
  tags?: Set<string>,
  index?: [n?: number, start?: number],
  id?: string,
  chunk?: string,
  dirty?: boolean

  // other things you may find...
  syllables?: string[],
}

export type Document = Term[][]

export type Pointer = [n?: number, start?: number, end?: number, startId?: string, endId?: string]

export type Groups = object


// possible values to .json()
export interface JsonProps {
  /**  a perfect copy of the input text */
  text?: boolean
  /** normalized whitespace, case, unicode, punctuation */
  normal?: boolean
  /** lowercase, trimmed, contractions expanded. */
  reduced?: boolean
  /** cleanup whitespace */
  trim?: boolean
  /** character-position where this begins */
  offset?: boolean
  /** frequency of this match in the document */
  count?: boolean
  /**  remove duplicate results*/
  unique?: boolean
  /** starting term # in document */
  index?: boolean
  /** options for each term */
  terms?: {
    text?: boolean
    normal?: boolean
    clean?: boolean
    implicit?: boolean
    tags?: boolean
    whitespace?: boolean
    id?: boolean
    offset?: boolean
    bestTag?: boolean
  }
}

export type outMethods = 'text' | 'normal' | 'offset' | 'terms' | 'topk' | 'json' | 'tags' | 'array' | 'debug'

// a key-value object of words, terms
export interface Lexicon {
  [key: string]: string
}

export interface Plugin {
  methods?: object,
  model?: object,
  compute?: object,
  hooks?: string[],
  tags?: object,
  words?: object,
  lib?: () => object,
  api?: (view: Function) => void,  //should be View
  mutate?: (world: object) => void,
}