export type PsalmVerse = {
  verseNumber: number
  text: string
}

export type Psalm = {
  number: number
  verses: PsalmVerse[]
}
