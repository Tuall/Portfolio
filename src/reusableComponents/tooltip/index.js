import { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import h from 'react-hyperscript'
import anime from 'animejs'

import { Animate } from 'reusableComponents/Animate'
import { debounce, className } from 'utils/misc'

import styles from './tooltip.css'

const propTypes = {
  hiddenText: PropTypes.string,
  className: PropTypes.string
}

export class ToolTip extends Component {
  state = { visible: false }

  animeSettings = {
    duration: 225
  }

  render() {
    return h(
      `span.${styles.root}`,
      {
        onClick: this.handleClick,
        onMouseEnter: this.setVisible,
        onMouseLeave: this.unsetVisible,
        onKeyDown: this.handleKeyDown,
        tabIndex: '0'
      },
      [
        h(
          `span.${className(`${this.props.className}`)}`,
          {
            ref: visibleText => {
              this.visibleText = visibleText
            }
          },
          this.props.children
        ),
        ReactDOM.createPortal(
          this.renderToolTips(),
          document.querySelector('body')
        )
      ]
    )
  }

  renderToolTips() {
    const {
      onEnter,
      onExit,
      state: { visible },
      props
    } = this

    return h(
      Animate,
      {
        trigger: visible,
        onEnter,
        onExit,
        timeout: this.animeSettings.duration,
        className: styles.hiddenText,
        customStyle: { transform: 'scale(0)' }
      },
      h('div', props.hiddenText)
    )
  }

  onEnter = el => {
    const { scrollWidth: hiddenElWidth, scrollHeight: hiddenElHeight } = el
    const {
      width: visibleTextWidth,
      top: visibleTextTop,
      left: visibleTextLeft,
      right: visibleTextRight,
      height: visibleTextHeight
    } = this.visibleText.getBoundingClientRect()
    const distanceFromTop = visibleTextTop - hiddenElHeight
    const distanceFromRight =
      window.innerWidth - (visibleTextLeft + visibleTextWidth)

    el.style.top = this.computeTop({
      distanceFromTop,
      visibleTextTop,
      visibleTextHeight,
      hiddenElHeight
    })
    el.style.left = this.computeLeft({
      hiddenElWidth,
      distanceFromRight,
      visibleTextRight,
      visibleTextLeft
    })
    el.style.marginLeft = this.computeMarginLeft({
      hiddenElWidth,
      visibleTextWidth,
      visibleTextLeft,
      distanceFromRight
    })
    el.style.transformOrigin = this.computeTransformOrigin({
      distanceFromTop,
      distanceFromRight,
      hiddenElWidth,
      visibleTextLeft,
      visibleTextWidth
    })

    anime({
      begin: () => {
        this.lastScrollYPos = window.pageYOffset
      },
      targets: el,
      scale: {
        ...this.animeSettings,
        easing: [0.175, 0.885, 0.32, 1.275],
        value: 1
      },
      run: anim => {
        !this.state.visible && this.pauseAnimation(anim)
      },
      complete: () => this.handleScroll()
    })
  }

  onExit = el => {
    anime({
      targets: el,
      scale: { ...this.animeSettings, easing: 'easeInOutQuad', value: 0 },
      run: anim => {
        this.state.visible && this.pauseAnimation(anim)
      },
      complete: () =>
        window.removeEventListener('scroll', this.debouncedUnsetVisible, {
          passive: true
        })
    })
  }

  pauseAnimation = anim => anim.pause()

  setVisible = () => this.setState({ visible: true })

  unsetVisible = () => this.setState({ visible: false })

  debouncedUnsetVisible = debounce(() => this.unsetVisible(), 250, true)

  // to handle touch devices
  handleClick = () => this.setState({ visible: !this.state.visible })

  handleKeyDown = e => {
    const keycode = e.which || e.keyCode
    return keycode === 13 && this.setState({ visible: !this.state.visible })
  }

  handleScroll = () => {
    window.addEventListener('scroll', this.debouncedUnsetVisible, {
      passive: true
    })
  }

  computeMarginLeft = args => {
    const {
      hiddenElWidth,
      visibleTextWidth,
      visibleTextLeft,
      distanceFromRight
    } = args
    return (hiddenElWidth - visibleTextWidth) / 2 > visibleTextLeft ||
      hiddenElWidth > distanceFromRight
      ? '0px'
      : `${-(hiddenElWidth - visibleTextWidth) / 2}px`
  }

  computeTop = args => {
    const {
      distanceFromTop,
      visibleTextTop,
      visibleTextHeight,
      hiddenElHeight
    } = args
    return distanceFromTop > 0
      ? `${visibleTextTop - hiddenElHeight}px`
      : `${visibleTextTop + visibleTextHeight}px`
  }

  computeLeft = args => {
    const {
      hiddenElWidth,
      distanceFromRight,
      visibleTextRight,
      visibleTextLeft
    } = args
    return hiddenElWidth > distanceFromRight
      ? `${visibleTextRight - hiddenElWidth}px`
      : `${visibleTextLeft}px`
  }

  computeTransformOrigin = args => {
    const {
      distanceFromTop,
      distanceFromRight,
      hiddenElWidth,
      visibleTextLeft,
      visibleTextWidth
    } = args
    if (distanceFromTop > 0) {
      return hiddenElWidth > distanceFromRight
        ? 'right bottom 0'
        : (hiddenElWidth - visibleTextWidth) / 2 > visibleTextLeft
          ? 'left bottom 0'
          : 'center bottom 0'
    } else {
      return hiddenElWidth > distanceFromRight
        ? 'right top 0'
        : (hiddenElWidth - visibleTextWidth) / 2 > visibleTextLeft
          ? 'left top 0'
          : 'center top 0'
    }
  }
}

ToolTip.propTypes = propTypes
ToolTip.defaultProps = {
  hiddenText: 'add some text'
}
