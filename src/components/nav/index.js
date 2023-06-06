import { Component } from 'react'
import PropTypes from 'prop-types'
import h from 'react-hyperscript'

import {
  href,
  handleStickyClassOnScroll,
  className,
  throttle
} from 'utils/misc'

import { OffCanvas } from '../offCanvas'
import { Icon } from 'reusableComponents/icon'
import { Hamburger } from 'svg'

import styles from './nav.css'

const links = [
  { text: 'who am i', dest: '/', isIndex: true },
  { text: 'what i do', dest: 'whatido' },
  { text: `what i've done`, dest: 'whativedone' },
  { text: 'where to find me', dest: 'wheretofindme' }
]

const propTypes = {
  heading: PropTypes.string.isRequired,
  subHeading: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  menuIconSize: PropTypes.number,
  menuIconColor: PropTypes.string,
  route: PropTypes.string
}

export class Nav extends Component {
  constructor() {
    super()
    this.state = { showOffCanvas: false }
    this.lastScrollY = 0
    this.ticking = false
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll, { passive: true })
    window.addEventListener('resize', this.onResize)
  }

  onScroll = () => {
    this.lastScrollY = window.scrollY
    this.requestTick()
  }

  onResize = throttle(() => {
    this.requestTick()
  }, 400)

  requestTick = () => {
    if (!this.ticking) {
      requestAnimationFrame(this.handleRAF)
      this.ticking = true
    }
  }

  render() {
    const { backgroundColor, heading, subHeading, route } = this.props
    const { showOffCanvas } = this.state

    return h(
      `nav.${styles.root}`,
      {
        style: { backgroundColor },
        ref: root => {
          this.root = root
        }
      },
      [
        h(
          `div.${styles.avatar}`,
          {},
          h('img', { src: 'images/avatarpic.jpg', alt: 'avatar pic' })
        ),
        h(`h1.${styles.heading}`, heading),
        h(`div.${styles.subHeading}`, subHeading),
        h(
          `div.${styles.listContainer}`,
          {
            ref: listContainer => {
              this.listContainer = listContainer
            }
          },
          [
            h(
              `div.${styles.list}`,
              {
                ref: list => {
                  this.list = list
                }
              },
              h('ul', this.renderNavItems())
            )
          ]
        ),
        this.renderMenuIcon(),
        h(OffCanvas, {
          route,
          open: showOffCanvas,
          items: links,
          onClose: this.hideOffCanvas
        })
      ]
    )
  }

  renderNavItems = () => {
    const { route } = this.props

    return links.map(link => {
      const { dest, text, isIndex } = link
      const isActive = route === dest || (route === 'index' && isIndex)
      return h(
        `li.${className(`${isActive && styles.isActive}`)}`,
        {},
        h(
          `a.${styles.link}`,
          {
            'data-nav': 'ignore',
            href: href(dest)
          },
          text
        )
      )
    })
  }

  renderMenuIcon = () =>
    h(
      `div.${styles.iconContainer}`,
      {
        ref: iconContainer => {
          this.iconContainer = iconContainer
        }
      },
      [
        h(
          `div.${styles.icon}`,
          {
            onClick: this.showOffCanvas,
            ref: icon => {
              this.icon = icon
            }
          },
          h(Icon, { svg: Hamburger, size: 40, color: '#fff' })
        )
      ]
    )

  handleRAF = () => {
    const {
      height: listContainerHeight
    } = this.listContainer.getBoundingClientRect()
    const {
      height: iconContainerHeight
    } = this.iconContainer.getBoundingClientRect()

    if (
      window
        .getComputedStyle(this.listContainer, null)
        .getPropertyValue('display') !== 'none'
    ) {
      // above phone breakpoint
      handleStickyClassOnScroll({
        node: this.root,
        targetNode: this.list,
        threshold: listContainerHeight,
        isBottomValue: true,
        className: styles.hasBoxshadow
      })

      handleStickyClassOnScroll({
        node: this.listContainer,
        targetNode: this.list,
        className: styles.isFixed
      })
    } else {
      // below phone breakpoint
      handleStickyClassOnScroll({
        node: this.root,
        targetNode: this.icon,
        threshold: iconContainerHeight,
        isBottomValue: true,
        className: styles.hasBoxshadow
      })

      handleStickyClassOnScroll({
        node: this.iconContainer,
        targetNode: this.icon,
        className: styles.isFixed
      })
    }

    this.ticking = false
  }

  showOffCanvas = () => this.setState({ showOffCanvas: true })

  hideOffCanvas = () => this.setState({ showOffCanvas: false })
}

Nav.propTypes = propTypes
Nav.defaultProps = {
  heading: 'your name',
  subHeading: 'your job',
  menuIconSize: 40,
  menuIconColor: '#fff'
}
