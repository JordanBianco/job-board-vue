import { mount, createLocalVue } from '@vue/test-utils'
import LoginForm from '@/components/Auth/LoginForm'
import Vuex from 'vuex'
import flushPromises from 'flush-promises';

const localVue = createLocalVue()
localVue.use(Vuex)

describe('LoginForm', () => {

   let store
   let actions
   let getters
   let wrapper

   beforeEach(() => {
      getters = {
         errors: () => { return [] }
      }

      actions = {
         login: jest.fn()
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

      wrapper = mount(LoginForm, {
         localVue,
         store,
         stubs: ['ErrorMessages', 'router-link']
      })
   })

   test('email field is required', async () => {
      await wrapper.find('#email').setValue('')

      await flushPromises();

      const error = wrapper.find('#email_error').text()

      expect(error).toBeTruthy()
      expect(error).toContain('obbligatorio');
   })

   test('password field length must be at least 8 char', async () => {
      await wrapper.find('#password').setValue('pass')

      await flushPromises();

      const error = wrapper.find('#password_error').text()

      expect(error).toBeTruthy()
      expect(error).toContain('8 caratteri');
   })

   // test('action login gets dispatched', async () => {
   //    await wrapper.find('#email').setValue('test@email.com')
   //    await wrapper.find('#password').setValue('password')

   //    await wrapper.find('form').trigger('submit.prevent')

   //    await flushPromises();

   //    expect(actions.login).toHaveBeenCalled()
   // })
})