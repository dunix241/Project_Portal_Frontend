import { CmsGuard } from '../guards/cms-guard';

export const withCmsGuard = (Component) => (props) => {
    return <CmsGuard>
      <Component {...props}/>
    </CmsGuard>
}