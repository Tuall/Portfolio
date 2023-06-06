import h from 'react-hyperscript'

import { Skillz } from './Skillz'
import { Likes } from './Likes'

export const WhatIDo = () => h('div', [h(Skillz), h(Likes)])
