import { useContext } from 'react';
import CVContext from '../context/CVContextBase';

export function useCV() {
  const context = useContext(CVContext);

  if (!context) {
    throw new Error('useCV must be used within a CVProvider');
  }

  return context;
}
