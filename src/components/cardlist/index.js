import PropTypes from 'prop-types'
import h from 'react-hyperscript'
import lift from 'space-lift'
import anime from 'animejs'

import { GroupAnimate } from 'reusableComponents//GroupAnimate'

import styles from './cardlist.css'

const animeSettings = { duration: 250, easing: 'easeInOutQuad' }

const propTypes = {
  collectionToRender: PropTypes.arrayOf(PropTypes.node).isRequired,
  filters: PropTypes.arrayOf(PropTypes.string),
  sortBy: PropTypes.string
}

const onEnter = (el, index) => {
  anime({
    targets: el,
    delay: index * 50,
    translateY: { ...animeSettings, value: ['-20%', '0'] },
    opacity: { ...animeSettings, value: [0, 1] }
  })
}

const onExit = (el, index) => {
  anime({
    targets: el,
    delay: index * 50,
    translateY: { ...animeSettings, value: '-20%' },
    opacity: { ...animeSettings, value: 0 }
  })
}

export const CardList = props => {
  const getCardCollection = () => {
    const { collectionToRender, filters, sortBy: sortKey } = props
    const filtersAreSet = lift(filters).value().length > 0

    const isFilterSet = filterKey =>
      lift(filters)
        .find(f => f === filterKey)
        .isDefined()

    const filterByCat = card =>
      filtersAreSet ? isFilterSet(card.props.cat) : true

    return lift(collectionToRender)
      .filter(filterByCat)
      .sort({ by: card => card.props[sortKey], ignoreCase: true })
      .value()
  }

  return h(GroupAnimate, {
    list: getCardCollection(),
    onEnter,
    onExit,
    renderItem: _card => h(`div.${styles.item}`, {}, _card),
    computeKey: _card => _card.props.title,
    timeout: animeSettings.duration,
    classNames: {
      root: styles.root
    }
  })
}

CardList.propTypes = propTypes
