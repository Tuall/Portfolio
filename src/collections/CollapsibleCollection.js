import h from 'react-hyperscript'

import { Collapsible } from 'reusableComponents/collapsible'
import {
  BackEnd,
  CSS,
  FrontEnd,
  JS,
  Movie,
  Music,
  Pencil,
  People,
  SupaHappy,
  ThumbUp,
  TV
} from 'svg'
import { link } from 'utils/misc'
import { settings } from 'settings'

const { greyDarken } = settings

const li = text => h('li', {}, text)

export const clFrontEnd = h(
  Collapsible,
  {
    titleIcon: FrontEnd,
    iconColor: greyDarken,
    titleIconSize: 35,
    title: 'Front-end',
    popOut: true
  },
  [
    h('ul', [
      li('HTML5 / CSS3'),
      li('Jade (I mean Pug 🐶...)'),
      li([
        'JSS ',
        link(
          'https://emotion.sh/docs/introduction',
          '(Emotion)',
          'u-linkSweep'
        )
      ]),
      li('SCSS / Less / Stylus'),
      li('PostCSS')
    ]),
    h(
      Collapsible,
      {
        titleIcon: CSS,
        iconColor: greyDarken,
        titleIconSize: 35,
        title: 'CSS'
      },
      h('ul', [
        li([
          link(
            'https://sass-guidelin.es/#the-7-1-pattern',
            '7-1 pattern folder architecture',
            'u-linkSweep'
          )
        ]),
        li([
          link(
            'https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md',
            'SUIT CSS Naming convention',
            'u-linkSweep'
          )
        ])
      ])
    ),
    h(
      Collapsible,
      {
        titleIcon: JS,
        iconColor: greyDarken,
        titleIconSize: 35,
        title: 'JS'
      },
      h('ul', [
        li('TypeScript'),
        li('ES6 & beyond'),
        li('Flux-like architectures'),
        li('Functional programming (still dabbling though)')
      ])
    ),
    h(
      Collapsible,
      {
        titleIcon: Pencil,
        iconColor: greyDarken,
        titleIconSize: 35,
        title: 'Design'
      },
      h('ul', [li('Figma'), li('Sketch')])
    )
  ]
)

export const clBackEnd = h(
  Collapsible,
  {
    titleIcon: BackEnd,
    iconColor: greyDarken,
    titleIconSize: 35,
    title: 'Back-end',
    popOut: true
  },
  [h('ul', [li('Node.js / Express'), li('MongoDB')])]
)

export const clTools = h(
  Collapsible,
  {
    titleIcon: ThumbUp,
    iconColor: greyDarken,
    titleIconSize: 30,
    title: 'Tools I like',
    popOut: true
  },
  [
    h('ul', [
      li('iTerm2'),
      li('npm'),
      li([
        link(
          'https://poi.js.org/',
          'Poi',
          'u-linkSweep'
        )
      ]),
      li('Prettier'),
      li('ESLint'),
      li('Postman'),
      li('Homebrew 🍺'),
      li(`Git (Sublime Merge doesn't hurt ;)`)
    ]),
    h('p', [
      'And if you must know, I work on a ',
      h('span.u-highlight', 'MacBook Pro '),
      'using ',
      h('span.u-highlight', 'Visual Studio Code '),
      'as my code editor.'
    ])
  ]
)

export const clMusic = h(
  Collapsible,
  {
    titleIcon: Music,
    iconColor: greyDarken,
    titleIconSize: 35,
    title: 'Music',
    popOut: true
  },
  [
    h(
      'p',
      `Music is so many things, it can soothe you, move you, make you move, annoy you or even make you fall asleep, it's just fundamental :)`
    ),
    h(Collapsible, { iconColor: greyDarken, title: 'Rap' }, [
      h('p', 'Of course this is not an exhaustive list :'),
      h('ul', [
        li('Kendrick Lamar'),
        li('ASAP Rocky'),
        li(`ASAP Ferg`),
        li('Evidence'),
        li(`Sean Price`),
        li('Drake'),
        li(
          `Cam'ron, The Notorious B.I.G The Wu-Tang Clan...(don't forget what time it is ;)`
        )
      ])
    ]),
    h(Collapsible, { iconColor: greyDarken, title: 'B-Side' }, [
      h(
        'p',
        'All right, now get ready for the dummy mix, no rules, just me, my taste and no filter :'
      ),
      h('ul', [
        li('Jhené Aiko'),
        li('TroyBoi'),
        li('Frank Ocean'),
        li('SZA'),
        li(
          `Blink-182`
        ),
        li('A-Trak'),
        li('...')
      ])
    ])
  ]
)

export const clTVMovies = h(
  Collapsible,
  {
    titleIcon: TV,
    iconColor: greyDarken,
    titleIconSize: 35,
    title: 'Netflix & ...',
    popOut: true
  },
  [
    h('p', 'Another non exhaustive list :'),
    h('ul', [
      li('Stranger Things'),
      li('Black Mirror'),
      li('Daredevil'),
      li('Atlanta'),
      li('The Man in the High Castle'),
      li('GoT'),
      li('Narcos'),
      li('...')
    ]),
    h(
      Collapsible,
      {
        titleIcon: Movie,
        iconColor: greyDarken,
        titleIconSize: 35,
        title: 'Movies'
      },
      [
        h(
          'p',
          `Maybe not my favorites of all time, but the ones that pop into my head as I'm writing this.`
        ),
        h('ul', [
          li('The Nice Guys'),
          li('End of watch'),
          li('Drive'),
          li('Logan'),
          li(`Kingsman`),
          li('22 Jump Street'),
          li('...')
        ])
      ]
    )
  ]
)

export const clPeople = h(
  Collapsible,
  {
    titleIcon: People,
    iconColor: greyDarken,
    titleIconSize: 35,
    title: 'Following',
    popOut: true
  },
  [
    h('p', 'Some devs I follow, look up to, and/or simply like :'),
    h('ul', [
      h('li', [
        link(
          'https://twitter.com/mpjme',
          'Mattias Petter Johansson',
          'u-linkSweep'
        )
      ]),
      h('li', [
        link('https://twitter.com/mariusschulz', 'Marius Schulz', 'u-linkSweep')
      ]),
      h('li', [
        link('https://twitter.com/sachagreif', 'Sacha Greif', 'u-linkSweep')
      ]),
      h('li', [link('https://twitter.com/una', 'Una Kravets', 'u-linkSweep')]),
      h('li', [
        link('https://twitter.com/philwalton', 'Philip Walton', 'u-linkSweep')
      ]),
      h('li', [
        link('https://twitter.com/pawelgrzybek', 'Pawel Grzybek', 'u-linkSweep')
      ])
    ])
  ]
)

export const clMisc = h(
  Collapsible,
  {
    titleIcon: SupaHappy,
    iconColor: greyDarken,
    titleIconSize: 35,
    title: 'Misc',
    popOut: true
  },
  [
    h('p', [
      'And of course, I like to have my ',
      h('span.u-highlight', '5 vegetables '),
      'a day (I mean, it feels good when I do...which is like once a month).'
    ]),
    h('p', [
      'And last but not least, I like people (well,',
      h('span.u-highlight', ` some of 'em, `),
      `sometimes..., my heart's not that big 😛), I mean music, tv series, your opinion about what's happening on the other side of the world and stuff is great...`
    ]),
    h(
      'p',
      `But what's greater is when you get to share (and disagree with) all that with someone else, otherwise, what's the point, right?`
    )
  ]
)
