import PropTypes from 'prop-types'
import h from 'react-hyperscript'
import anime from 'animejs'

import { Animate } from 'reusableComponents/Animate'

import { href, addClass, removeClass, className } from 'utils/misc'

import styles from './offCanvas.css'

const propTypes = {
  open: PropTypes.bool,
  route: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose: PropTypes.func
}

const animeSettings = { duration: 450, easing: 'easeOutQuint' }
let contentRef = null

export const OffCanvas = props => {
  const html = document.querySelector('html')
  const body = document.body
  const { top } = body.getBoundingClientRect()
  const makeBodyUnscrollable = () => {
    addClass('u-noscroll', html, body)
    html.style.top = `${top}px`
  }
  const makeBodyScrollable = () => {
    removeClass('u-noscroll', html, body)
    window.scroll(0, top * -1)
  }

  props.open ? makeBodyUnscrollable() : makeBodyScrollable()

  const renderItems = () => {
    const { items, route } = props

    return items.map(item => {
      const isActive =
        route === item.dest || (route === 'index' && item.isIndex)
      const className = `${styles.item}.${isActive ? styles.isActive : ''}`

      return h(
        `li.${className}`,
        {},
        h(
          `a.${styles.link}`,
          {
            'data-nav': 'ignore',
            tabIndex: '-1',
            href: href(item.dest)
          },
          item.text
        )
      )
    })
  }

  const onClick = e =>
    !e.target.classList.contains(styles.content) && props.onClose()

  const onEnter = () => {
    anime({
      targets: contentRef,
      translateX: { ...animeSettings, value: ['-100%', 0] }
    })
  }

  const onExit = () => {
    anime({
      targets: contentRef,
      translateX: { ...animeSettings, value: '-100%' }
    })
  }

  const rootClassName = className(
    `${styles.root}.${props.open && styles.isOpen}`
  )

  return h(
    Animate,
    { trigger: props.open, onEnter, onExit, timeout: animeSettings.duration },
    h(`div.${rootClassName}`, { onClick }, [
      h(`div.${styles.overlay}`),
      h(
        `div.${styles.content}`,
        {
          ref: content => {
            contentRef = content
          }
        },
        h('ul', {}, renderItems())
      )
    ])
  )
}

OffCanvas.propTypes = propTypes
