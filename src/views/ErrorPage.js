import h from 'react-hyperscript'

import { TextBlock } from 'layouts/textBlock'
import { IconHeader } from 'reusableComponents/iconHeader'
import { Warning } from 'svg'
import { settings } from 'settings'

const { grey } = settings

export const ErrorPage = () =>
  h('div', [
    h(IconHeader, { icon: Warning, size: 20, color: grey, text: 'Oops' }),
    h(TextBlock, [h('p', {}, 'You lost homie?')])
  ])
