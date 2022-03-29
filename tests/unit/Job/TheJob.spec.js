import { mount, createLocalVue } from '@vue/test-utils'
import TheJob from '@/components/Job/Form/TheJob'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('TheJob', () => {

   let store
   let actions
   let getters
   let wrapper

   beforeEach(() => {
      actions = {
         getContracts: jest.fn(),
      }

      getters = {
         contracts: () => { return [
            {
               id: 1,
               name: 'stage'
            },
            {
               id: 2,
               name: 'tirocinio'
            }
         ] },
      }

      store = new Vuex.Store({
         modules: {
            contracts: {
               namespaced: true,
               actions,
               getters
            }
         }
      })

      wrapper = mount(TheJob, {
         localVue,
         store,
         propsData: {
            job: {},
         }
      })
   })

   test('it receive a job prop', () => {
      expect(wrapper.vm.$props.job).toEqual({})
   })

   test('prevPage event is emitted when user click on prevPage button', async () => {
      await wrapper.find('#prevPage').trigger('click')

      expect(wrapper.emitted().prevPage).toBeTruthy()
   })

   test('nextPage event is emitted when user click on nextPage button', async () => {
      await wrapper.find('#nextPage').trigger('click')

      expect(wrapper.emitted().nextPage).toBeTruthy()
   })

   test('getContracts gets dispatched on mounted', async () => {
      expect(actions.getContracts).toHaveBeenCalled()
   })

   test('user can select a type of contract', async () => {
      const options = wrapper.find('select').findAll('option')
      
      await options.at(1).setSelected()

      // 2 si riferisce al getters specificato nel test nel before each
      expect(wrapper.find('option:checked').element.value).toEqual('2')
   })
})