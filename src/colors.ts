// https://flatuicolors.com/palette/de

const colors = [
  {
    name: 'Red',
    originalName: 'Fusion Red',
    value: '#fc5c65'
  },
  {
    name: 'Orange',
    originalName: 'Orange Hibiscus',
    value: '#fd9644'
  },
  {
    name: 'Yellow',
    originalName: 'Flirtatious',
    value: '#fed330'
  },
  {
    name: 'Green',
    originalName: 'Reptile Green',
    value: '#26de81'
  },
  {
    name: 'Teal',
    originalName: 'Maximum Blue Green',
    value: '#2bcbba'
  },
  {
    name: 'Light Blue',
    originalName: 'High Blue',
    value: '#45aaf2'
  },
  {
    name: 'Blue',
    originalName: 'C64 NTSC',
    value: '#4b7bec'
  },
  {
    name: 'Purple',
    originalName: 'Lighter Purple',
    value: '#a55eea'
  },
  {
    name: 'Gray',
    originalName: 'Twinkle Blue',
    value: '#d1d8e0'
  },
  {
    name: 'Blue Gray',
    originalName: 'Blue Grey',
    value: '#778ca3'
  }
]

export const dark = (color: string) => {
  switch (color) {
    case '#fc5c65':
      return '#eb3b5a'
    case '#fd9644':
      return '#fa8231'
    case '#fed330':
      return '#f7b731'
    case '#26de81':
      return '#20bf6b'
    case '#2bcbba':
      return '#0fb9b1'
    case '#45aaf2':
      return '#45aaf2'
    case '#4b7bec':
      return '#3867d6'
    case '#a55eea':
      return '#8854d0'
    case '#d1d8e0':
      return '#a5b1c2'
    case '#778ca3':
      return '#4b6584'
    default:
      return '#000'
  }
}

export default colors
