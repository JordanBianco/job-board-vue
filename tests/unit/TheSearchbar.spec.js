import { mount } from '@vue/test-utils'
import TheSearchbar from '@/components/Job/TheSearchbar'

describe('TheSearchbar', () => {

   test('emit event when user click search button', async () => {
      const wrapper = mount(TheSearchbar)

      await wrapper.find('input').setValue('test')
      await wrapper.find('button').trigger('click')

      expect(wrapper.emitted().searchJobs).toBeTruthy()
   })

   test('emit event when user press enter', async () => {
      const wrapper = mount(TheSearchbar)
      const input = wrapper.find('input')
      await input.setValue('test')
      await input.trigger('keydown.enter')

      expect(wrapper.emitted().searchJobs).toBeTruthy()
   })
})