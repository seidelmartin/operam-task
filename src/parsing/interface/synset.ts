export interface Synset {
  _attributes: {
    words: string
  }
  synset?: Synset | Synset[]
}
