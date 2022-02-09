import { call, select, takeLatest } from 'redux-saga/effects'
import { exportApp, selectApp, State } from '../reducers/app'

import { saveAs } from 'file-saver'

function* doExportApp() {
  const state: State = yield select(selectApp)

  const { url, versionedUrl, ...toSave } = state

  const dataStr =
    'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(toSave))

  yield call(saveAs, dataStr, 'responsive-viewer.json')
}

export default function* rootSaga() {
  yield takeLatest(exportApp.toString(), doExportApp)
}
