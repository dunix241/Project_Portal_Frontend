import { useCallback, useEffect, useState } from 'react';

export type SelectionProps = {
  onDeselectAll: () => void,
  onDeselectOne: (id: any) => void,
  onSelectAll: () => void,
  onSelectOne: (id: any) => void,
  selected: any[]
}
export const useSelection = (items = []): SelectionProps => {
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    setSelected([]);
  }, [items]);

  const onSelectAll = useCallback(() => {
    setSelected([...items]);
  }, [items]);

  const onSelectOne = useCallback((item) => {
    setSelected((prevState) => [...prevState, item]);
  }, []);

  const onDeselectAll = useCallback(() => {
    setSelected([]);
  }, []);

  const onDeselectOne = useCallback((item) => {
    setSelected((prevState) => {
      return prevState.filter((_item) => _item !== item);
    });
  }, []);

  return {
    onDeselectAll,
    onDeselectOne,
    onSelectAll,
    onSelectOne,
    selected
  };
};
