import axios from "axios"
import { AppThunk } from "../../../featuresStore"
import { 
  setSharedKey,
  select,
} from "../../../Shared"
import { getFeaturesStore } from "../../../../";
import { 
  setBannersAsync,
  read,  
} from "../../";

const start = (dispatch: any) => {
  dispatch(setBannersAsync({ key: 'message', value: `updating...` }))
  dispatch(setBannersAsync({ key: 'updating', value: true }))
  dispatch(setBannersAsync({ key: 'updated', value: false }))
}

const finish = (dispatch: any) => {
  dispatch(setBannersAsync({ key: 'message', value: "" }));
  dispatch(setBannersAsync({ key: 'updating', value: false }));
  dispatch(setBannersAsync({ key: 'updated', value: true }));
  dispatch(read());
}

export const update = (): AppThunk => async (dispatch: any) => {
  
  try {
    start(dispatch);
    const {shared} = getFeaturesStore().getState()
    const {bannersEndpoints} = shared.fakeData;
    const endpoint = bannersEndpoints.update.url
    const {editing} = shared
    const {displayName} = editing.item.meta;
    dispatch(select(null, ""));

    const payload = {
      ...editing.item,
      meta:{
        ...editing.item.meta,
        updated: Date.now(),
      },
    };
    // console.log ("payload", payload)
    axios
      .post(endpoint, payload)
      .then(function (res) {
        dispatch(setSharedKey({ key: 'notifying', value: {
          severity: "success",
          message: `"${displayName}" updated`,
        }}))
        finish(dispatch);
      })
      .catch(function (error) {
        dispatch(setSharedKey({ key: 'notifying', value: {
          severity: "warning",
          message: error.toString(),
        }}))
        finish(dispatch);
      })
      .then( function() {
        finish(dispatch);
      })
  } catch (error: any) {
    dispatch(setSharedKey({ key: 'notifying', value: {
      severity: "error",
      message: error.toString(),
    }}));
    finish(dispatch);
  }
}
