import PropTypes from 'prop-types'
import h from 'react-hyperscript'

import { pxToRemDims } from 'utils/misc'

import * as styles from './icon.css'

const propTypes = {
  svg: PropTypes.func.isRequired,
  size: PropTypes.number,
  className: PropTypes.string,
  customStyle: PropTypes.objectOf(PropTypes.string),
  color: PropTypes.string
}

export const Icon = props => {
  const { color, className = '', svg, size, customStyle } = props

  return h(
    `div.${styles.root}.${className}`,
    {
      style: { ...pxToRemDims(size), ...customStyle }
    },
    svg(color)
  )
}

Icon.propTypes = propTypes
Icon.defaultProps = {
  color: '#000'
}
