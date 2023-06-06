import PropTypes from 'prop-types'
import h from 'react-hyperscript'

import { Icon } from 'reusableComponents/icon'

import styles from './iconHeader.css'

const propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.func.isRequired,
  color: PropTypes.string,
  bg: PropTypes.string,
  size: PropTypes.number
}

export const IconHeader = props => {
  const { icon, size, bg, color, text } = props
  return h(
    `div.${styles.root}`,
    { style: { backgroundColor: bg } },
    h(`h2.${styles.heading}`, [
      h(Icon, { svg: icon, color, size, className: styles.icon }),
      h(`span.${styles.text}`, text)
    ])
  )
}

IconHeader.propTypes = propTypes
IconHeader.defaultProps = {
  color: '#000',
  bg: '#fff',
  size: 35
}
