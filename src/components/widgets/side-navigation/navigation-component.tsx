import CollapsibleComponent from './components/collapsible-component';
import LinkComponent from './components/link-component';
import { MappedRoute } from './side-navigation';

interface Props {
  route: MappedRoute;
  depth: number;
}

export default function NavigationComponent(props: Props) {
  const { route, depth } = props;

  if (route.subNav) {
    return <CollapsibleComponent route={props.route} depth={depth} />;
  }
  return <LinkComponent route={props.route} depth={depth} />;
}
