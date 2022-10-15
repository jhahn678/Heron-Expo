import uuid from 'react-native-uuid'
export const makeFragmentId = () => uuid.v4().toString().split('-').join('')