import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from "../../featuresStore"
import {gpxData} from "../gpxData"

export interface GPXReactSlice {
  error: any
  editing: any
  notifying: any
  confirming: any
  newItem: any
  newItemValue: string
  gpxData: any
}

const initialState: GPXReactSlice = {
  error: null,
  editing: null,
  confirming: null,
  notifying: null,
  newItem: null,
  newItemValue: "",
  gpxData,
}

export const gpxreactSlice = createSlice({
  name: 'gpxreact',
  initialState,
  reducers: {
    edit: (state, action: PayloadAction<any>) => {
      const { key, value, subKey } = action.payload;
      state.editing.pristine = false;
      if (subKey){
        // @ts-ignore
        state.editing.item[subKey][key] = value;
      } else {
        // @ts-ignore
        state.editing.item[key] = value;
      }
    },
    setGPXReactKey: (state, action: PayloadAction<any>) => {
      const { key, value } = action.payload
      // @ts-ignore
      state[key] = value
    },
  },
})

export const selectGPXReact = (state: RootState) => state.gpxreact;
export const { 
  setGPXReactKey,
  edit,
} = gpxreactSlice.actions;
export default gpxreactSlice.reducer;
