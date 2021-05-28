import Vue from 'vue'

export default () => {
  Vue.directive('hasButton', {
    inserted (el, binding, vnode) {
      let _value = el.innerText
      if (_value === '') {
        _value = binding.value
      }
      const permissionBtn = vnode.context.$route.meta.btn

      if (permissionBtn && Array.isArray(permissionBtn) && permissionBtn.length > 0) {
        if (!permissionBtn.includes(_value)) {
          el.parentNode.removeChild(el)
        }
      } else {
        el.parentNode.removeChild(el)
      }
    }
  })
}
