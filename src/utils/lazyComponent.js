import LoadingComponent from '@/components/LoadingComponent'
import ErrorComponent from '@/components/ErrorComponent'

export function lazyComponent (component) {
  const AsyncHandler = () => ({
    component: component,
    loading: LoadingComponent,
    error: ErrorComponent,
    delay: 200,
    timeout: 10000
  })
  return Promise.resolve({
    functional: true,
    render (h, { data, children }) {
      return h(AsyncHandler, data, children)
    }
  })
}
