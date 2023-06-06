import h from 'react-hyperscript'

import { TextBlock } from 'layouts/textBlock'
import { IconHeader } from 'reusableComponents/iconHeader'
import { Icon } from 'reusableComponents/icon'
import { PersonPin, Github, Codepen, Cube } from 'svg'
import { link } from 'utils/misc'
import { settings } from 'settings'

import styles from './whereToFindMe.css'

const { email, grey } = settings

export const WhereToFindMe = () => {
  const emailClassName = `${styles.email}.${'u-underlineLeft'}`

  return h('div', [
    h(IconHeader, {
      icon: PersonPin,
      size: 20,
      color: grey,
      text: 'Finding me'
    }),
    h(TextBlock, { background: true }, [
      h('p', ['You can find me wandering in the streets of  Paris.']),
      h('p', [
        'But since that could take a while before you randomly bump into me, feel free to send me an email :',
        h('br'),
        h(`a.${emailClassName}`, { href: `mailto:${email}` }, email)
      ]),
      h('span', 'Wanna take a peek?'),
      h(`div.${styles.buttons}`, [
        link(
          'https://github.com/Alx-l',
          h(Icon, {
            svg: Github,
            color: '#fff',
            size: 35,
            className: 'u-block'
          }),
          'btn-icon',
          'github'
        ),
        link(
          'https://codesandbox.io/u/Alx-l/sandboxes',
          h(Icon, {
            svg: Cube,
            color: '#fff',
            size: 35,
            className: 'u-block'
          }),
          'btn-icon',
          'codesandbox'
        ),
        link(
          'https://codepen.io/AlxL',
          h(Icon, {
            svg: Codepen,
            color: '#fff',
            size: 35,
            className: 'u-block'
          }),
          'btn-icon',
          'codepen'
        )
      ])
    ])
  ])
}
