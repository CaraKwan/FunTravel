import { useSelector as useReduxSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "./store";


//self define useSelector with type RootState added, help decouple store and component
export const useSelector : TypedUseSelectorHook<RootState> = useReduxSelector;