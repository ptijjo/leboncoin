import { useDispatch, useSelector, useStore } from 'react-redux'
import type { RootState, AppDispatch, Store } from './store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const Dispatch = useDispatch.withTypes<AppDispatch>()
export const Selector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<Store>()