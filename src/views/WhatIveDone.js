import lift from 'space-lift'
import h from 'react-hyperscript'
import { Subscribe, Provider } from 'unstated'

import { filterStore, FilterStore } from '../store'

import { TextBlock } from 'layouts/textBlock'
import { BtnFilter } from 'widgets/btnFilter'
import { IconHeader } from 'reusableComponents/iconHeader'
import { History } from 'svg'
import { CardList } from '../components/cardlist'
import * as Cards from '../collections/CardCollection'
import { settings } from 'settings'

import styles from './whatIveDone.css'

const { grey } = settings
const CardCollection = lift(Cards)
  .values()
  .value()

const Content = props =>
  h(Subscribe, {
    to: [FilterStore],
    children: filter => {
      const renderBtnFilter = (text, dataAttr) => {
        const { filters } = filter.state
        const isActive = lift(filters)
          .find(f => f === dataAttr)
          .isDefined()

        return h(BtnFilter, {
          onClick: () => filter.updateFilters(dataAttr),
          isActive,
          dataAttr,
          text
        })
      }

      return h('div', [
        h(IconHeader, {
          icon: History,
          size: 20,
          color: grey,
          text: 'My work'
        }),
        h(TextBlock, [h('p', `Here is what I've done so far :`)]),
        h(`div.${styles.filters}`, [
          h('span', 'show :'),
          renderBtnFilter('side projects', 'sideprojects'),
          renderBtnFilter('jobs', 'jobs')
        ]),
        h(CardList, {
          sortBy: 'title',
          collectionToRender: CardCollection,
          filters: filter.state.filters
        })
      ])
    }
  })

export const WhatIveDone = props =>
  h(Provider, {
    inject: [filterStore],
    children: Content(props)
  })
