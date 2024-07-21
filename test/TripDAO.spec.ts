import CollaboratorCallException from '../src/exception/CollaboratorCallException';
import TripDAO from '../src/trip/TripDAO';
import User from '../src/user/User';

describe('TripDAO', () => {
    let testee: TripDAO;

    describe('TripDAO should', () => {
        it('should throw exception when retrieving user trips', () => {
            expect(() => {
                new TripDAO().tripsBy(new User());
            }).toThrow(CollaboratorCallException);
        });
    });
});
