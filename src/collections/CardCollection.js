import h from 'react-hyperscript'

import { CardReveal } from 'reusableComponents/cardReveal'
import { link } from 'utils/misc'
import { settings } from 'settings'

import styles from 'reusableComponents/cardReveal/cardReveal.css'

const { git } = settings

const li = text => h('li', {}, text)

export const PoiStarterKit = h(
  CardReveal,
  {
    cat: 'sideprojects',
    iconColor: '#000',
    href: git + 'poi-starter-kit-tsx',
    title: 'Poi Starter Kit',
    subTitle: 'homemade starter kit',
    footerText: `there's more inside`
  },
  [
    h('p.u-underline', 'Recipe :'),
    h('ul', [
      li([link('https://poi.js.org', 'Poi', 'u-linkSweep')]),
      li([
        link(
          'https://webpack.js.org/concepts/hot-module-replacement',
          'Hot Module Replacement',
          'u-linkSweep'
        )
      ]),
      li('TypeScript'),
      li('React / Flux architecture'),
      li([
        link('https://reach.tech/router', 'Reach Router', 'u-linkSweep')
      ]),
      li([
        link(
          'https://github.com/jamiebuilds/unstated',
          'Unstated',
          'u-linkSweep'
        )
      ]),
      li([
        link('https://emotion.sh/docs/introduction', 'Emotion', 'u-linkSweep')
      ])
    ]),
    h(
      'p',
      { className: styles.insideFooter },
      'I made this boilerplate to help me getting started with new projects easily.'
    )
  ]
)

export const BubblyBoilerplate = h(
  CardReveal,
  {
    cat: 'sideprojects',
    iconColor: '#000',
    href: git + 'bubbly-boilerplate',
    title: 'Bubbly Boilerplate',
    subTitle: 'homemade starter kit',
    footerText: `there's more inside`
  },
  [
    h('p.u-underline', 'Recipe :'),
    h('ul', [
      li('ES6'),
      li('React / Fluxx'),
      li('Jade'),
      li('PostCSS (cssnext)'),
      li('CSS Modules')
    ]),
    h(
      'p',
      { className: styles.insideFooter },
      'I made this boilerplate to help me getting started with new projects easily.'
    )
  ]
)

export const BubblyGrid = h(
  CardReveal,
  {
    cat: 'sideprojects',
    iconColor: '#000',
    href: git + 'bubbly-grid',
    title: 'Bubbly Grid',
    subTitle: 'homemade grid system',
    footerText: h('span', [
      'available on ',
      link(
        'https://www.npmjs.com/package/postcss-bubbly-grid',
        'npm',
        'u-linkSweep.u-highlight'
      )
    ])
  },
  [
    h('p.u-underline', 'Recipe :'),
    h('ul', [li('PostCSS')]),
    h('p', { className: styles.insideFooter }, [
      'This grid system is built with calc() and is inspired by ',
      link(
        'https://github.com/peterramsing/lost',
        'LostGrid',
        'u-highlight.u-linkSweep'
      )
    ])
  ]
)

export const Portefolio = h(
  CardReveal,
  {
    cat: 'sideprojects',
    iconColor: '#000',
    href: git + 'portfolio',
    title: 'Me',
    subTitle: 'myself and I',
    footerText: `there's more inside`
  },
  [
    h('p.u-underline', 'Recipe :'),
    h('ul', [
      h('li', [
        link(
          'https://github.com/alx-l/bubbly-boilerplate',
          'Bubbly Boilerplate',
          'u-linkSweep'
        )
      ])
    ])
  ]
)

export const VinylMinded = h(
  CardReveal,
  {
    cat: 'sideprojects',
    iconColor: '#000',
    title: 'Vinyl Minded',
    subTitle: 'fake e-commerce site',
    footerText: `there's more inside`
  },
  [
    h('p.u-underline', 'Recipe :'),
    h('ul', [
      li('Foundation Framework'),
      li('SCSS'),
      li('jQuery'),
      li('PHP / mySQL')
    ]),
    h(
      'p',
      { className: styles.insideFooter },
      'This site was made to obtain my certification as a web developer from IFOCOP.'
    )
  ]
)

export const PokemonYo = h(
  CardReveal,
  {
    cat: 'sideprojects',
    iconColor: '#000',
    href: 'http://pokemonyoisthename.herokuapp.com/',
    title: 'Pokemon Yo',
    subTitle: 'simple pokedex',
    footerText: `there's more inside`
  },
  [
    h('p.u-underline', 'Recipe :'),
    h('ul', [
      li('React / Fluxx'),
      h('li', [link('http://pokeapi.co/docsv2/', 'Pokeapi V2', 'u-linkSweep')]),
      li('ES6'),
      li('Stylus / PostCSS')
    ]),
    h('p', { className: styles.insideFooter }, [
      'Wanna see the ',
      link(`${git}pokemonyo`, 'repo?', 'u-linkSweep')
    ])
  ]
)

export const NrjMobile = h(
  CardReveal,
  {
    cat: 'jobs',
    iconColor: '#000',
    href: 'https://www.nrjmobile.fr/',
    title: 'NRJ Mobile',
    subTitle: '4 months during 2015',
    footerText: `there's more inside`
  },
  [
    h('p.u-underline', 'Tasks :'),
    h('ul', [li('Develop landing pages'), li('Code email newsletters')])
  ]
)

export const Zengularity = h(
  CardReveal,
  {
    cat: 'jobs',
    iconColor: '#000',
    href: 'https://zengularity.com',
    title: 'Zengularity',
    subTitle: 'Since October 2016',
    footerText: `there's more inside`
  },
  [
    h('p.u-underline', 'Tasks :'),
    h('ul', [li(`Build UI's for single page apps`)]),
    h('p.u-underline', 'Tools :'),
    h('ul', [li(`Bitbucket / Github`), li(`Jira`), li(`Taiga`)]),
    h('p.u-underline', 'Stack / libs :'),
    h('ul', [
      li('TypeScript'),
      h('li', [
        'React / ',
        link('https://github.com/AlexGalays/kaiju', 'Kaiju', 'u-linkSweep')
      ]),
      li('Flux-like architectures'),
      h('li', [
        link(
          'https://github.com/AlexGalays/spacelift',
          'spacelift',
          'u-linkSweep'
        )
      ]),
      li('CSS Modules'),
      li('Less / Stylus')
    ])
  ]
)
