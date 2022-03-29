import { mount } from '@vue/test-utils'
import Breadcrumb from '@/components/Layout/Breadcrumb'

describe('Breadcrumb', () => {

   test('it receive a current and routes props', () => {
      const wrapper = mount(Breadcrumb, {
         propsData: {
            current: 'current test',
            routes: []
         },
      })

      expect(wrapper.find('#current').text()).toMatch('current test')
   })

})