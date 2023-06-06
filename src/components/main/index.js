import h from 'react-hyperscript'

import { Nav } from '../nav'
import { Footer } from '../footer'
import { settings } from 'settings'

import styles from './main.css'

const { primaryColor } = settings

export const Main = props => {
  const { name } = props.route
  return h('.root', [
    h(Nav, {
      route: name,
      heading: 'Alex L',
      subHeading: 'front-end dev',
      backgroundColor: primaryColor
    }),
    h(`div.${styles.root}`, {}, props.children),
    h(Footer, { backgroundColor: primaryColor })
  ])
}
