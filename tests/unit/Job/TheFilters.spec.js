import { mount, createLocalVue } from '@vue/test-utils'
import TheFilters from '@/components/Job/TheFilters'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('TheFilters', () => {

   let store
   let actions
   let getters
   let wrapper

   beforeEach(() => {
      actions = {
         toggleFilters: jest.fn(),
         getContracts: jest.fn(),
         getTags: jest.fn()
      }

      getters = {
         contracts: () => { 
            return [
               {
                  id: 1,
                  name: 'Stage'
               },
               {
                  id: 2,
                  name: 'Tirocinio'
               },
            ]
         },
         tags: () => { 
            return [
               {
                  id: 1,
                  name: 'Laravel'
               },
               {
                  id: 2,
                  name: 'Vue'
               },
            ]
         },
         showFilters: () => { return true },
      }

      store = new Vuex.Store({
         modules: {
            contracts: {
               namespaced: true,
               actions,
               getters
            },
            tags: {
               namespaced: true,
               actions,
               getters
            },
            jobs: {
               namespaced: true,
               actions,
               getters
            }
         }
      })

      wrapper = mount(TheFilters, {
         localVue,
         store
      })
   })

   test('filtri is visibile', () => {
      expect(wrapper.find('h3').text()).toMatch('Filtri')
   })

   test('user can remove all applied filters', async () => {
      await wrapper.find('#selectedContracts').setChecked()
      expect(wrapper.vm.$data.filters.selectedContracts).toEqual([1])

      await wrapper.find('#clear').trigger('click')
      expect(wrapper.vm.$data.filters.selectedContracts).toEqual([])
   })

   // In the mounted hook, call a method that dispatch an action, to get all the type of contracts
   test('getContracts action get dispatched', () => {
      expect(actions.getContracts).toHaveBeenCalled()
   })

   // In the mounted hook, call a method that dispatch an action, to get all the tags
   test('getTags action get dispatched', () => {
      expect(actions.getTags).toHaveBeenCalled()
   })

   test('if user select a value from the contract type section, event gets emitted', async () => {
      await wrapper.find('#selectedContracts').setChecked()
      expect(wrapper.emitted().applyFilters).toBeTruthy()
   })

   test('if user select a value from the working day section, event gets emitted', async () => {
      await wrapper.find('#working_day').setChecked()
      expect(wrapper.emitted().applyFilters).toBeTruthy()
   })

   test('if user select a value from the remote working section, event gets emitted', async () => {
      await wrapper.find('#remote_working').setChecked()
      expect(wrapper.emitted().applyFilters).toBeTruthy()
   })

   test('user can toggle keyword from the selectedKeywords array', async () => {
      expect(wrapper.vm.$data.filters.selectedTags).toEqual([])

      await wrapper.find('#keyword').trigger('click')
      expect(wrapper.vm.$data.filters.selectedTags).toEqual([1])

      await wrapper.find('#keyword').trigger('click')
      expect(wrapper.vm.$data.filters.selectedTags).toEqual([])
   })

   test('event gets emitted when user select a keyword', async () => {
      await wrapper.find('#keyword').trigger('click')
      expect(wrapper.emitted().applyFilters).toBeTruthy()
   })

   test('toggle Filters sidebar', async () => {
      await wrapper.find('#toggleFilters').trigger('click')
      expect(actions.toggleFilters).toHaveBeenCalled()
   })
})
