const getDateString = (date: Date) => {
  return date.toISOString().slice(0, 10)
}

export default getDateString
