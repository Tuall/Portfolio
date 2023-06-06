import { Router } from 'abyssa'
import ReactState from './ReactState' // to use abyssa with React
import 'space-lift/es/all'

import { Main } from './components/main'

import { WhoAmI } from 'views/WhoAmI'
import { WhatIDo } from 'views/whatIDo'
import { WhatIveDone } from 'views/WhatIveDone'
import { WhereToFindMe } from 'views/WhereToFindMe'
import { ErrorPage } from 'views/ErrorPage'

import './global.css'

const state = ReactState(document.querySelector('#app'))

const router = Router({
  app: state('', Main, {
    index: state('', WhoAmI),
    whatido: state('whatido', WhatIDo),
    whativedone: state('whativedone', WhatIveDone),
    wheretofindme: state('wheretofindme', WhereToFindMe),
    notFound: state('notFound', ErrorPage)
  })
}).configure({
  urlSync: 'hash',
  notFound: 'app.notFound'
})

router.init()
