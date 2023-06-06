import h from 'react-hyperscript'

import { TextBlock } from 'layouts/textBlock'
import { IconHeader } from 'reusableComponents/iconHeader'
import { Heart } from 'svg'
import {
  clMusic,
  clTVMovies,
  clMisc,
  clPeople
} from 'collections/CollapsibleCollection'
import { settings } from 'settings'

import styles from './whatIDo.css'

const { grey } = settings

export const Likes = () =>
  h('div', [
    h(IconHeader, { icon: Heart, size: 20, color: grey, text: 'My Likes' }),
    h(TextBlock, [
      h(
        'p',
        `While we're at it, why not get a glance about some stuff I heart...`
      )
    ]),
    h(`div.${styles.container}`, [
      h(`div.${styles.left}`, [
        h('div', { 'data-divider': true }, clMusic),
        h('div', { 'data-divider': true }, clTVMovies)
      ]),
      h(`div.${styles.right}`, [
        h('div', { 'data-divider': true }, clPeople),
        h('div', {}, clMisc)
      ])
    ])
  ])
