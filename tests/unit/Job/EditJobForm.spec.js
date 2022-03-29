import { mount, createLocalVue } from '@vue/test-utils'
import EditJobForm from '@/components/Job/EditForm/EditJobForm'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('EditJobForm', () => {

   let store
   let actions
   let getters

   beforeEach(() => {
      actions = {
         clearErrors: jest.fn()
      }

      getters = {
         errors() { return [] }  
      }

      store = new Vuex.Store({
         modules: {
            userJobs: {
               namespaced: true,
               actions,
               getters
            }
         }
      })
   })

   test.only('it receive a job prop', () => {
      const job = {
         id: 1,
         slug: 'test'
      }
      
      const wrapper = mount(EditJobForm, {
         localVue,
         store,
         propsData: {
            job
         },
         stubs: ['ErrorMessages', 'TheAdvertisement', 'TheJob', 'TheCompany'],
      })

      expect(wrapper.vm.$props.job).toEqual(job)
   })

})