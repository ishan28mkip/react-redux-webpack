import chai, { expect } from 'chai';
import { reducers } from '../index';
import Immutable from 'immutable';

import chaiImmutable from 'chai-immutable';
chai.use(chaiImmutable);

describe('Reducer Test', function() {
	it('basic', function() {
		expect(1).to.equal(1);
	});
});
