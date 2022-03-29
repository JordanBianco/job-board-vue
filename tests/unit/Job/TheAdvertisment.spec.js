import { mount, createLocalVue } from '@vue/test-utils'
import TheAdvertisement from '@/components/Job/Form/TheAdvertisement'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('TheAdvertisement', () => {

   let store
   let actions
   let getters
   let wrapper

   beforeEach(() => {
      actions = {
         getTags: jest.fn(),
      }

      getters = {
         tags: () => { return [
            {
               id: 1,
               name: 'test'
            },
            {
               id: 2,
               name: 'tag2'
            }
         ] },
      }

      store = new Vuex.Store({
         modules: {
            tags: {
               namespaced: true,
               actions,
               getters
            }
         }
      })

      wrapper = mount(TheAdvertisement, {
         localVue,
         store,
         propsData: {
            job: {}
         }
      })
   })

   test('it receive a job prop', () => {
      expect(wrapper.vm.$props.job).toEqual({})
   })

   test('getTags gets dispatched on mounted', () => {
      expect(actions.getTags).toHaveBeenCalled()
   })

   test('nextPage event is emitted when user click on nextPage button', async () => {
      await wrapper.find('button').trigger('click')

      expect(wrapper.emitted().nextPage).toBeTruthy()
   })

   test('showTagList toggle', async () => {
      expect(wrapper.vm.$data.showTagsList).toBeFalsy()

      await wrapper.find('#toggleTagsListButton').trigger('click')

      expect(wrapper.vm.$data.showTagsList).toBeTruthy()
   })
})