import React from 'react';
import { Route, NavLink } from 'react-router-dom';

import translate from '../../i18n';
import { MenuItem } from '../../modules/common/components/web';
import Subscription from './containers/Subscription';
import SubscribersOnly from './containers/SubscribersOnly';
import UpdateCard from './containers/UpdateCard';
import { SubscriberRoute } from './containers/Auth';
import reducers from './reducers';
import settings from '../../../../../settings';
import resources from './locales';
import Feature from '../connector';

const NavLinkWithI18n = translate('subscription')(({ t }) => (
  <NavLink to="/subscribers-only" className="nav-link" activeClassName="active">
    {t('navLink')}
  </NavLink>
));

export default new Feature({
  route: settings.subscription.enabled
    ? [
        <Route exact path="/subscription" component={Subscription} />,
        <SubscriberRoute exact role="user" path="/subscribers-only" component={SubscribersOnly} />,
        <SubscriberRoute exact role="user" path="/update-card" component={UpdateCard} />
      ]
    : [],
  navItem: settings.subscription.enabled ? (
    <MenuItem key="/subscribers-only">
      <NavLinkWithI18n />
    </MenuItem>
  ) : (
    []
  ),
  reducer: { subscription: reducers },
  scriptsInsert:
    settings.subscription.enabled && settings.subscription.stripePrivateKey ? 'https://js.stripe.com/v3/' : undefined,
  localization: { ns: 'subscription', resources }
});
