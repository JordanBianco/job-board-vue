import { mount, createLocalVue } from '@vue/test-utils'
import CreateJobForm from '@/components/Job/Form/CreateJobForm'
import TheAdvertisement from '@/components/Job/Form/TheAdvertisement'
import TheJob from '@/components/Job/Form/TheJob'
import TheCompany from '@/components/Job/Form/TheCompany'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('CreateJobForm', () => {

   let store
   let getters
   let actions

   beforeEach(() => {
      actions = {
         clearErrors: jest.fn()
      }

      getters = {
         errors: () => { return [] },
      }

      store = new Vuex.Store({
         modules: {
            userJobs: {
               namespaced: true,
               actions,
               getters
            },
         },
      })
   })


   test('TheAdvertisement component exists on page 1', () => {
      const wrapper = mount(CreateJobForm, {
         localVue,
         store,
         stubs: ['ErrorMessages', 'TheAdvertisement', 'TheJob', 'TheCompany'],
         data() {
            return {
               page: 1
            }
         }
      })

      expect(wrapper.findComponent(TheAdvertisement).exists()).toBeTruthy()
   })

   test('TheJob component exists on page 2', () => {
      const wrapper = mount(CreateJobForm, {
         localVue,
         store,
         stubs: ['ErrorMessages', 'TheAdvertisement', 'TheJob', 'TheCompany'],
         data() {
            return {
               page: 2
            }
         }
      })

      expect(wrapper.findComponent(TheJob).exists()).toBeTruthy()
   })

   test('TheCompany component exists on page 3', () => {
      const wrapper = mount(CreateJobForm, {
         localVue,
         store,
         stubs: ['ErrorMessages', 'TheAdvertisement', 'TheJob', 'TheCompany'],
         data() {
            return {
               page: 3
            }
         }
      })

      expect(wrapper.findComponent(TheCompany).exists()).toBeTruthy()
   })
})