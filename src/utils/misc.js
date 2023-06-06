import h from 'react-hyperscript'
import { api as router } from 'abyssa'

export const pxToRem = val => {
  const toRem = parseInt(val, 10) / 16
  return `${toRem}rem`
}

export const pxToRemDims = val => ({
  width: pxToRem(val),
  height: pxToRem(val)
})

export const link = (url, content, className, title) => {
  return h(
    `a.${className}`,
    { href: url, target: '_blank', rel: 'noreferrer', title },
    content
  )
}

export const href = dest => {
  return router.link(`app.${dest === '/' ? 'index' : dest}`)
}

export const addClass = (className, ...nodeList) => {
  nodeList.forEach(item => item.classList.add(className))
}

export const removeClass = (className, ...nodeList) => {
  nodeList.forEach(item => item.classList.remove(className))
}

export const className = classNameString =>
  classNameString.replace(/\.?\b(false)|(undefined)/g, '')

export const handleStickyClassOnScroll = ({
  node,
  targetNode,
  threshold = 0,
  isBottomValue,
  className
}) => {
  const { top, bottom } = node.getBoundingClientRect()
  !isBottomValue && (node.style.height = `${targetNode.offsetHeight}px`)
  return (isBottomValue ? bottom : top) <= threshold
    ? targetNode.classList.add(className)
    : targetNode.classList.remove(className)
}

export const debounce = (func, wait, immediate) => {
  let timeout
  return function() {
    const context = this
    const args = arguments
    const later = function() {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}

export function throttle(
  func,
  wait,
  options = { leading: true, trailing: true }
) {
  const context = null
  // handle case when an empty object is passed
  if (Object.keys(options).length === 0) {
    options = {
      leading: true,
      trailing: true
    }
  }
  let args
  let result
  let timeout = null
  let previous = 0

  const later = function() {
    previous = options.leading === false ? 0 : Date.now()
    timeout = null
    result = func.apply(context, args)
    if (!timeout) args = null
  }

  return function() {
    const now = Date.now()
    if (!previous && options.leading === false) previous = now
    const remaining = wait - (now - previous)
    args = arguments
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      result = func.apply(context, args)
      if (!timeout) args = null
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining)
    }

    return result
  }
}
