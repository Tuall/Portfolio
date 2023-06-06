import { Component } from 'react'
import PropTypes from 'prop-types'
import h from 'react-hyperscript'
import anime from 'animejs'

import { Icon } from 'reusableComponents/icon'
import { Animate } from 'reusableComponents/Animate'
import { ToolTip } from 'reusableComponents/tooltip'
import { More, Close, Link, LinkOff } from 'svg'
import { link } from 'utils/misc'

import { settings } from '../../settings'

import styles from './cardReveal.css'

const propTypes = {
  iconColor: PropTypes.string,
  href: PropTypes.string,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  footerText: PropTypes.node,
  cat: PropTypes.string
}

export class CardReveal extends Component {
  state = { open: false }

  animeSettings = {
    duration: 225,
    easing: 'easeInOutQuad'
  }

  render() {
    const { cat, href, title, subTitle, footerText, iconColor } = this.props

    const renderLinkIcon = !href
      ? h(
          ToolTip,
          { hiddenText: '404 😪' },
          h(Icon, {
            svg: LinkOff,
            color: settings.greyDarken,
            size: 24,
            className: 'u-block'
          })
        )
      : h('div', [
          link(
            href,
            h(Icon, {
              svg: Link,
              color: iconColor,
              size: 24,
              className: 'u-block'
            }),
            'u-block'
          )
        ])

    return h(`div.${styles.root}`, { 'data-cat': cat }, [
      h(`div.${styles.content}`, [
        h(`h3.${styles.title}`, title),
        subTitle && h(`span.${styles.subTitle}`, subTitle)
      ]),
      h(`div.${styles.footer}`, [
        h(`div.${styles.footerText}`, {}, footerText),
        h(`div.${styles.iconContainer}`, [
          h(
            'div',
            {
              onClick: this.handleClick,
              onKeyDown: this.handleKeyDown,
              tabIndex: '0'
            },
            h(Icon, {
              svg: More,
              size: 24,
              color: iconColor,
              className: 'u-block'
            })
          ),
          renderLinkIcon
        ])
      ]),
      this.renderInside()
    ])
  }

  renderInside() {
    const { open } = this.state
    const { iconColor, children } = this.props

    return h(
      Animate,
      {
        trigger: open,
        timeout: this.animeSettings.duration,
        onEnter: this.onEnter,
        onExit: this.onExit,
        className: styles.container
      },
      [
        h('div', [
          h(
            'div',
            {
              className: styles.insideIcon,
              onClick: this.handleClick,
              onKeyDown: this.handleKeyDown,
              tabIndex: '0'
            },
            h(Icon, { svg: Close, color: iconColor, size: 24 })
          ),
          h(`div.${styles.insideRoot}`, {}, children)
        ])
      ]
    )
  }

  onEnter = el => {
    anime({
      targets: el,
      translateY: { ...this.animeSettings, value: '-100%' }
    })
  }

  onExit = el => {
    anime({
      targets: el,
      translateY: { ...this.animeSettings, value: '100%' }
    })
  }

  handleClick = () => this.setState({ open: !this.state.open })

  handleKeyDown = e => {
    const keycode = e.which || e.keyCode
    return keycode === 13 && this.setState({ open: !this.state.open })
  }
}

CardReveal.propTypes = propTypes
CardReveal.defaultProps = {
  iconColor: '#fff',
  title: 'title',
  href: '',
  footerText: '',
  cat: ''
}
