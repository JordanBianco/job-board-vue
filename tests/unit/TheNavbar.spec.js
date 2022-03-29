import { mount, createLocalVue } from '@vue/test-utils'
import TheNavbar from '@/components/Layout/TheNavbar'
import DropdownMenu from '@/components/User/DropdownMenu'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('TheNavbar', () => {

   let wrapper
   let store
   let state

   beforeEach(() => {
      state = {
         is_auth: true
      }

      store = new Vuex.Store({
         modules: {
            auth: {
               namespaced: true,
               state
            }
         }
      })

      wrapper = mount(TheNavbar, {
         localVue,
         store,
         stubs: ['router-link', 'DropdownMenu']
      })
   })

   test('site name is visible', () => {
      expect(wrapper.find('h1').text()).toMatch('Workfinder')
   })

   test('DropdownMenu component is visbile if logged in', () => {
      expect(wrapper.findComponent(DropdownMenu).exists()).toBeTruthy()
   })
})