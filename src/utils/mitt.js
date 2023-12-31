export default function() {
  const all = new Map()
  const cached = {}
  
  return {
    emit(type, evt) {
      (all.get(type) || []).slice().map((handler) => {
        handler(evt)
      })
      cached[type] = Array.prototype.slice.call(arguments, 1)
    },

    on(type, handler) {
      const handlers = all.get(type)
      const added = handlers && handlers.push(handler)
      if (!added) {
        all.set(type, [handler])
      }

      if (cached[type] instanceof Array) {
        handler.apply(null, cached[type])
      }
    },

    off(type, handler) {
      const handlers = all.get(type)
      if (handlers) {
        handlers.splice(handlers.indexOf(handler), 1)
      }
    }
  }
}
