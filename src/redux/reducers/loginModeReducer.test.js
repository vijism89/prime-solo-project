import loginReducer from './loginModeReducer';

test('should have correct initial state', () => {

  let returnedState = loginReducer(undefined, {})
  expect(returnedState).toEqual('login');
})

test('should toggle to register mode', () => {
  let action = {
    type: 'SET_TO_REGISTER_MODE'
  }
  let returnedState = loginReducer(undefined, action)
  expect(returnedState).toEqual('register');
})
