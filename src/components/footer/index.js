import PropTypes from 'prop-types'
import h from 'react-hyperscript'

import { Heart, Laptop, Music, Add } from 'svg'
import { Icon } from 'reusableComponents/icon'
import { settings } from 'settings'

import styles from './footer.css'

const { accentColor, black } = settings
const year = new Date().getFullYear()

const propTypes = {
  backgroundColor: PropTypes.string.isRequired
}

export const Footer = props =>
  h(`footer.${styles.root}`, { style: { background: props.backgroundColor } }, [
    h(`div.${styles.body}`, [
      h(
        'span',
        { style: { display: 'block', textTransform: 'uppercase' } },
        'Made with...'
      ),
      h(`div.${styles.icons}`, [
        h(Icon, {
          svg: Heart,
          className: styles.heart,
          color: accentColor,
          size: 40
        }),
        h(Icon, {
          svg: Add,
          customStyle: { margin: '0 0.2em' },
          color: black,
          size: 18
        }),
        h(Icon, { svg: Laptop, color: black, size: 45 })
      ]),
      h(`div.${styles.text}`, [
        h('div', [
          'While enjoying some',
          h(Icon, {
            svg: Music,
            size: 35,
            className: styles.music,
            color: black
          })
        ])
      ])
    ]),
    h(`div.${styles.overlay}`, {}, h('span', `© ${year} Alex L`))
  ])

Footer.propTypes = propTypes
