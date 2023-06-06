import PropTypes from 'prop-types'
import h from 'react-hyperscript'

import { className } from 'utils/misc'

import styles from './textBlock.css'

const propTypes = {
  background: PropTypes.bool
}

export const TextBlock = props => {
  const rootClassName = className(
    `${styles.root}.${props.background && styles.background}`
  )

  return h(`div.${rootClassName}`, [props.children])
}

TextBlock.propTypes = propTypes
