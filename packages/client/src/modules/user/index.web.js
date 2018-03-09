import jwt from './modules/jwt'; // eslint-disable-line
import session from './modules/session'; // eslint-disable-line
import commonResolvers from './common/resolvers';

import Feature from '../connector';

const commonFeature = new Feature({ resolver: commonResolvers });

export default new Feature(commonFeature, jwt);