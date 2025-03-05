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
    const listener = (
      message: IMessage,
      sender: chrome.runtime.MessageSender,
      sendResponse: () => void
    ): boolean | undefined => {
      if (message.type === IDataAction.UPDATED) {
        dispatch(setAppConfig(message.data.searchConfig))
        dispatch(pureSessionConfig(message.data.searchConfig))
      }
      sendResponse()
      return false
    }
    chrome.runtime.onMessage.addListener(listener)
    return () => chrome.runtime.onMessage.removeListener(listener)
  }, [dispatch])

  useEffect(() => {
    chrome.runtime.sendMessage(queryMessage()).then(
      (res) => {
        console.log(res)
      },
      (reason) => {
        console.error(reason)
      }
    )
  }, [])
}
