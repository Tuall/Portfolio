import PropTypes from 'prop-types'
import Transition from 'react-transition-group/Transition'
import h from 'react-hyperscript'

const propTypes = {
  onEnter: PropTypes.func.isRequired,
  onExit: PropTypes.func.isRequired,
  trigger: PropTypes.bool.isRequired,
  timeout: PropTypes.number.isRequired,
  className: PropTypes.string,
  customStyle: PropTypes.objectOf(PropTypes.string)
}

export const Animate = props => {
  const {
    trigger,
    onEnter,
    onExit,
    timeout,
    children,
    className,
    customStyle
  } = props

  return h(
    Transition,
    {
      in: trigger,
      onEnter,
      onExit,
      timeout,
      mountOnEnter: true,
      unmountOnExit: true,
      style: { ...customStyle }
    },
    h('div', { className }, children)
  )
}

Animate.propTypes = propTypes
