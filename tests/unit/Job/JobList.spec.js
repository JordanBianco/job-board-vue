import { mount, createLocalVue } from '@vue/test-utils'
import JobList from '@/components/Job/JobList'
import JobItem from '@/components/Job/JobItem'
import TheFilters from '@/components/Job/TheFilters'
import TheSearchbar from '@/components/Job/TheSearchbar'
import TheSorting from '@/components/Job/TheSorting'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('JobList', () => {

   let store
   let actions
   let state
   let getters
   let wrapper

   beforeEach(() => {
      state = {
         jobs: {
            data: [
               {
                  id: 1,
                  title: 'test title'   
               }
            ]
         }
      }
      
      actions = {
         getJobs: jest.fn()
      }

      getters = {
         showFilters() { return true }
      }

      store = new Vuex.Store({
         modules: {
            jobs: {
               namespaced: true,
               actions,
               state,
               getters
            }
         }
      })
   })

   test('getJobs action gets dispatched', () => {
      wrapper = mount(JobList, {
         localVue,
         store,
         stubs: ['router-link', 'JobItem', 'TheFilters', 'TheSearchbar', 'TheSorting']
      })
      expect(actions.getJobs).toHaveBeenCalled()
   })

   test('JobItem component is visible', () => {
      wrapper = mount(JobList, {
         localVue,
         store,
         stubs: ['router-link', 'JobItem', 'TheFilters', 'TheSearchbar', 'TheSorting']
      })
      expect(wrapper.findComponent(JobItem).exists()).toBeTruthy()
   })

   test('TheFilters component is visible', () => {
      wrapper = mount(JobList, {
         localVue,
         store,
         stubs: ['router-link', 'JobItem', 'TheFilters', 'TheSearchbar', 'TheSorting']
      })
      expect(wrapper.findComponent(TheFilters).exists()).toBeTruthy()
   })

   test('TheSorting component is visible', () => {
      wrapper = mount(JobList, {
         localVue,
         store,
         stubs: ['router-link', 'JobItem', 'TheFilters', 'TheSearchbar', 'TheSorting']
      })
      expect(wrapper.findComponent(TheSorting).exists()).toBeTruthy()
   })

   test('TheSearchbar component is visible', () => {
      wrapper = mount(JobList, {
         localVue,
         store,
         stubs: ['router-link', 'JobItem', 'TheFilters', 'TheSearchbar', 'TheSorting']
      })
      expect(wrapper.findComponent(TheSearchbar).exists()).toBeTruthy()
   })
})