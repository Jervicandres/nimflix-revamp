
const CleanText = (phrase: string) => {
  return phrase.replace(/(<([^>]+)>)/gi, "")
}

export default CleanText