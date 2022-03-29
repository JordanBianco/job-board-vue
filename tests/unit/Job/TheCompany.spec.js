import { mount } from '@vue/test-utils'
import TheCompany from '@/components/Job/Form/TheCompany'

describe('TheCompany', () => {

   let wrapper

   beforeEach(() => {
      wrapper = mount(TheCompany, {
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
})