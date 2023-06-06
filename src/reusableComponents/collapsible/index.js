import { Component } from 'react'
import PropTypes from 'prop-types'
import h from 'react-hyperscript'
import anime from 'animejs'

import { Icon } from 'reusableComponents/icon'
import { Animate } from 'reusableComponents/Animate'
import { Expand } from 'svg'
import { className, switchClasses } from 'utils/misc'

import styles from './collapsible.css'

const propTypes = {
  title: PropTypes.string.isRequired,
  popOut: PropTypes.bool,
  iconSize: PropTypes.number,
  iconColor: PropTypes.string,
  titleIcon: PropTypes.func,
  titleIconSize: PropTypes.number
}

const animeSettings = { duration: 225, easing: 'easeOutQuart' }
const hrOffsetValue = '-120%'

export class Collapsible extends Component {
  state = { open: false }

  render() {
    const {
      state: { open },
      props: {
        popOut,
        title,
        titleIcon,
        iconSize,
        titleIconSize,
        iconColor,
        children
      },
      onEnter,
      onExit
    } = this

    const CollapsibleClassName = className(`${styles.root}
      .${popOut && styles.popOut}
      .${open && styles.isOpen}`)

    const expandIconClassName = className(
      `${styles.expandIcon}.${open && styles.isOpen}`
    )

    const renderIcon =
      titleIcon &&
      h(Icon, {
        svg: titleIcon,
        color: iconColor,
        className: styles.icon,
        size: titleIconSize
      })

    return h(`div.${CollapsibleClassName}`, { 'aria-expanded': open }, [
      h(
        `div.${styles.title}`,
        {
          onKeyDown: this.handleKeyDown,
          onClick: this.handleClick,
          tabIndex: '0'
        },
        [
          h(`div.${styles.titleLeft}`, [
            renderIcon,
            h(`span.${styles.text}`, title)
          ]),
          h(`div.${styles.titleRight}`, [
            h(
              `div.${expandIconClassName}`,
              {},
              h(Icon, {
                svg: Expand,
                size: iconSize,
                color: iconColor,
                className: 'u-block'
              })
            )
          ]),
          h(`hr.${styles.hr}`, {
            ref: hr => {
              this.hr = hr
            },
            style: { transform: `translateX(${ hrOffsetValue })` }
          })
        ]
      ),
      h(
        Animate,
        { trigger: open, onEnter, onExit, timeout: animeSettings.duration, className: styles.onEnter },
        h('div', { className: styles.body }, children)
      )
    ])
  }

  animateHr = isOpening => {
    const { hr } = this

    isOpening
      ? anime({ targets: hr, translateX: { ...animeSettings, value: '0%' } })
      : anime({
        targets: hr,
        translateX: { ...animeSettings, value: `${ hrOffsetValue }` }
      })
  }

  onEnter = el => {
    anime({
      targets: el,
      scaleY: { ...animeSettings, value: [0, 1] },
      opacity: { ...animeSettings, value: [0, 1] },
      run: (anim) =>
        !this.state.open && this.pauseAnimation(anim),
      complete: () => this.animateHr(true)
    })
  }

  onExit = el => {
    anime({
      begin: () => this.animateHr(false),
      run: (anim) =>
        this.state.open && this.pauseAnimation(anim),
      targets: el,
      scaleY: { ...animeSettings, value: [1, 0] },
      opacity: { ...animeSettings, value: [1, 0] }
    })
  }

  pauseAnimation = (anim) => anim.pause()

  handleClick = () => this.setState({ open: !this.state.open })


