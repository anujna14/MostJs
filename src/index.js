import { qs } from "../commonValue";

import { newDefaultScheduler } from '@most/scheduler'
import { hashchange } from '@most/dom-event'
import { createAdapter } from '@most/adapter'
import * as ReactDOM from 'react-dom'
import { handleFilterChange, runAction } from './action'
import { skipRepeats, map, merge, scan, tap, runEffects } from '@most/core'
import { emptyApp } from "./model";
import { View } from './view.jsx'




const appNode = qs('.todoapp', document)
const appState = emptyApp

const scheduler = newDefaultScheduler()
const [addAction, todoActions] = createAdapter()
const updateFilter = map(handleFilterChange, hashchange(window))


const actions = merge(todoActions, updateFilter)
const stateUpdates = skipRepeats(scan(runAction, appState, actions))
const viewUpdates = tap(rel => ReactDOM.render(rel, appNode), map(View(addAction), stateUpdates))

runEffects(viewUpdates, scheduler)