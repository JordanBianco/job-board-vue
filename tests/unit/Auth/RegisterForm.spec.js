import { mount, createLocalVue } from '@vue/test-utils'
import RegisterForm from '@/components/Auth/RegisterForm'
import Vuex from 'vuex'
import flushPromises from 'flush-promises';

const localVue = createLocalVue()
localVue.use(Vuex)

describe('RegisterForm', () => {

   let store
   let actions
   let getters
   let wrapper

   beforeEach(() => {
      getters = {
         errors: () => { return [] }
      }

      actions = {
         register: jest.fn()
      }

      store = new Vuex.Store({
         modules: {
            auth: {
               namespaced: true,
               actions,
               getters
            }
         }
      })

      wrapper = mount(RegisterForm, {
         localVue,
         store,
         stubs: ['ErrorMessages', 'router-link']
      })
   })

   test('first name field may only contain alphabetic characters', async () => {
      await wrapper.find('#first_name').setValue('test 01')

      await flushPromises();

      const error = wrapper.find('#first_name_error').text()

      expect(error).toBeTruthy()
      expect(error).toContain('può contenere solo caratteri alfabetici');
   })

   test('password field must have the same value as the password confirmation field.', async () => {
      await wrapper.find('#password').setValue('password')
      await wrapper.find('#password_confirmation').setValue('password10') 

      await flushPromises();

      const error = wrapper.find('#password_error').text()

      expect(error).toBeTruthy()
      expect(error).toContain('avere lo stesso valore');
   })

   // test('action register gets dispatched', async () => {
   //    await wrapper.find('#email').setValue('test@email.com')
   //    await wrapper.find('#password').setValue('password')

   //    await wrapper.find('form').trigger('submit.prevent')

   //    await flushPromises();

   //    expect(actions.login).toHaveBeenCalled()
   // })
})