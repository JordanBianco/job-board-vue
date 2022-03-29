import { mount } from '@vue/test-utils'
import ErrorMessages from '@/components/ErrorMessages'

describe('ErrorMessages', () => {

   test('it receive a errors props', () => {
      const wrapper = mount(ErrorMessages, {
         propsData: {
            errors: [],
         },
      })

      expect(wrapper.vm.$props.errors).toEqual([])
   })
})