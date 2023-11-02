import { NavigationContext } from 'containers/navigation';
import { useContext } from 'react';

export default function useNavigation() {
  return useContext(NavigationContext);
}
