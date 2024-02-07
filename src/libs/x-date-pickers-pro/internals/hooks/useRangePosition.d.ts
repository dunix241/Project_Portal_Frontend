import * as React from 'react';
import { FieldRef } from '@mui/x-date-pickers/models';
import { RangePosition } from '../models/range';
import { RangeFieldSection } from '../models/fields';
export interface UseRangePositionProps {
    /**
     * The position in the currently edited date range.
     * Used when the component position is controlled.
     */
    rangePosition?: RangePosition;
    /**
     * The initial position in the edited date range.
     * Used when the component is not controlled.
     * @default 'start'
     */
    defaultRangePosition?: RangePosition;
    /**
     * Callback fired when the range position changes.
     * @param {RangePosition} rangePosition The new range position.
     */
    onRangePositionChange?: (rangePosition: RangePosition) => void;
}
export interface UseRangePositionResponse {
    rangePosition: RangePosition;
    onRangePositionChange: (newPosition: RangePosition) => void;
    singleInputFieldRef: React.MutableRefObject<FieldRef<RangeFieldSection> | undefined>;
}
export declare const useRangePosition: (props: UseRangePositionProps) => UseRangePositionResponse;
