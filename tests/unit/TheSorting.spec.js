import { mount, createLocalVue } from '@vue/test-utils'
import TheSorting from '@/components/Job/TheSorting'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('TheSorting', () => {

   let store
   let actions
   let getters

   beforeEach(() => {
      actions = {
         toggleFilters: jest.fn()
      }

      getters = {
         showFilters() { return false }
      }

      store = new Vuex.Store({
         modules: {
            jobs: {
               namespaced: true,
               actions,
               getters
            }
         }
      })

      
   })

   test('it receive a jobs prop', () => {
      const jobs = [{ id: 1, title: 'test' }]

      const wrapper = mount(TheSorting, {
         localVue,
         store,
         propsData: {
            jobs
         }
      })

      expect(wrapper.vm.$props.jobs).toEqual(jobs)
   })

   test('it emit an event if user change the sort value', async () => {
      const jobs = [{ id: 1, title: 'test' }]

      const wrapper = mount(TheSorting, {
         localVue,
         store,
         propsData: {
            jobs
         }
      })
      
      const options = wrapper.find('select').findAll('option')

      await options.at(1).setSelected()

      expect(wrapper.find('option:checked').element.value).toBe('oldest')
      expect(wrapper.emitted().sort).toBeTruthy()
   })

   test('toggle filters sidebar', async () => {
      const jobs = [{ id: 1, title: 'test' }]

      const wrapper = mount(TheSorting, {
         localVue,
         store,
         propsData: {
            jobs
         }
      })
      
      await wrapper.find('#toggleFilters').trigger('click')
      expect(actions.toggleFilters).toHaveBeenCalled()
   })
})