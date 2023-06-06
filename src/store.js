import { Container } from 'unstated'
import lift from 'space-lift'

export class FilterStore extends Container {
  state = {
    filters: []
  }

  updateFilters(key) {
    const keyIndex = lift(this.state.filters)
      .findIndex(k => k === key)
      .getOrElse(-1)

    this.setState({
      filters:
        keyIndex > -1
          ? lift(this.state.filters)
              .removeAt(keyIndex)
              .value()
          : lift(this.state.filters)
              .append(key)
              .value()
    })
  }
}

export const filterStore = new FilterStore()
