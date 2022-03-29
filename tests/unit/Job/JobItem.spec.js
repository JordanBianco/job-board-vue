import { mount, createLocalVue } from '@vue/test-utils'
import JobItem from '@/components/Job/JobItem'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('JobItem', () => {

   let store
   let state
   let actions
   let wrapper
   let job

   beforeEach(() => {
      job = {
         contract: {
            id: 1,
            name:' test contract'
         },
         user_id: 1,
         id: 1,
         title: 'test title',
         description: 'test description'
      }

      actions = {
         deleteJob: jest.fn()
      }

      state = {
         user: {
            id: 1,
            first_name: 'test'
         }
      }

      store = new Vuex.Store({
         modules: {
            auth: {
               namespaced: true,
               state,
            },
            userJobs: {
               namespaced: true,
               actions
            }
         }
      })

      wrapper = mount(JobItem, {
         localVue,
         store,
         propsData: {
            job
         },
         stubs: ['router-link'],
         mocks: {
            $moment: () => jest.requireActual('moment')('2020-01-01T00:00:00.000Z')
         }
      })
   })

   test('it receive a prop job gets dispatched', () => {
      expect(wrapper.vm.$props.job).toBe(job)
   })

   test('deleteJob action is dispatched if user confirm the alert box', async () => {
      global.confirm = jest.fn(() => true);

      await wrapper.find('#deleteJob').trigger('click')
      expect(actions.deleteJob).toHaveBeenCalled()
   })

   test('deleteJob action is not dispatched if user do not confirm the alert box', async () => {
      global.confirm = jest.fn(() => false);

      await wrapper.find('#deleteJob').trigger('click')
      expect(actions.deleteJob).not.toHaveBeenCalled()
   })
})