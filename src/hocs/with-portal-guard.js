import { PortalGuard } from '../guards/portal-guard';

export const withPortalGuard = (Component) => (props) => {
    return <PortalGuard>
      <Component {...props}/>
    </PortalGuard>
}