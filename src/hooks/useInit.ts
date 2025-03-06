import { useEffect } from 'react'
import { useAppDispatch } from '@/store/store'
import { setAppConfig } from '@/store/appConfig.slice'
import { type IMessage, IDataAction, queryMessage } from '@/models/base'
import { pureSessionConfig } from '@/store/sessionConfig.slice'

// init app data and add listener for data update
// should only be called exactly once in root app
export function useInit() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    const listener = (message: IMessage) => {
      if (message.type === IDataAction.UPDATED) {
        dispatch(setAppConfig(message.data.searchConfig))
        dispatch(pureSessionConfig(message.data.searchConfig))
      }
    }
    browser.runtime.onMessage.addListener(listener)
    return () => browser.runtime.onMessage.removeListener(listener)
  }, [dispatch])

  useEffect(() => {
    browser.runtime.sendMessage(queryMessage()).then(
      (res) => {
        console.log(res)
      },
      (reason) => {
        console.error(reason)
      }
    )
  }, [])
}
