import h from 'react-hyperscript'

import { TextBlock } from 'layouts/textBlock'
import { IconHeader } from 'reusableComponents/iconHeader'
import { Tool } from 'svg'
import {
  clFrontEnd,
  clBackEnd,
  clTools
} from 'collections/CollapsibleCollection'
import { settings } from 'settings'

import styles from './whatIDo.css'

const { grey } = settings

export const Skillz = () =>
  h('div', [
    h(IconHeader, { icon: Tool, size: 20, color: grey, text: 'My skillz' }),
    h(TextBlock, [h('p', `Let's find out what I can do, shall we?`)]),
    h(`div.${styles.container}`, [
      h(`div.${styles.left}`, [
        h('div', { 'data-divider': true }, clFrontEnd),
        h('div', { 'data-divider': true }, clBackEnd)
      ]),
      h(`div.${styles.right}`, [h('div', {}, clTools)])
    ])
  ])
