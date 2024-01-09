import { useCallback, useEffect, useState } from 'react';

export const useSelection = (items = []) => {
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
