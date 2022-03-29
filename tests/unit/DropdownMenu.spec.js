import { mount, createLocalVue } from '@vue/test-utils'
import DropdownMenu from '@/components/User/DropdownMenu'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('DropdownMenu', () => {

   let wrapper
   let store
   let actions
   let state

   beforeEach(() => {
      state = {
         user: {
            first_name: 'username'
         }
      }

      actions = {
         logout: jest.fn()
      }

      store = new Vuex.Store({
         modules: {
            auth: {
               namespaced: true,
               actions,
               state
            }
         }
      })

      wrapper = mount(DropdownMenu, {
         localVue,
         store,
         stubs: ['router-link']
      })
   })

   test('click on avatar toggle dropdown menu', async () => {
      await wrapper.find('#avatar').trigger('click')
      expect(wrapper.find('#dropdown').isVisible()).toBeTruthy()
      expect(wrapper.vm.$data.showDropdown).toBeTruthy()

      await wrapper.find('#avatar').trigger('click')
      expect(wrapper.vm.$data.showDropdown).toBeFalsy()
   })

   test('dropdown menu contains the user name', async () => {
      await wrapper.find('#avatar').trigger('click')
      expect(wrapper.find('#username').text()).toMatch('username')
   })

   test('user can logout', async () => {
      await wrapper.find('#avatar').trigger('click')
      await wrapper.find('#logout').trigger('click')
      expect(actions.logout).toHaveBeenCalled()
   })
})