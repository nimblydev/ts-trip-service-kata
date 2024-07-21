import UserNotLoggedInException from '../src/exception/UserNotLoggedInException';
import Trip from '../src/trip/Trip';
import TripService from '../src/trip/TripService';
import User from '../src/user/User';
import UserBuilder from './UserBuilder';

const GUEST: User = null;
const UNUSED_USER: User = null;
const REGISTERED_USER = new User();
const ANOTHER_USER = new User();
const TO_BRAZIL = new Trip();
const TO_PARIS = new Trip();

describe('TripService', () => {
    let tripService: TripService;
    let loggedInUser: User;

    beforeEach(() => {
        tripService = new TestableTripService();
    });

    describe('getTripsByUser should', () => {
        it('should thow an exception when user is not logged', () => {
            expect(() => {
                tripService.getTripsByUser(UNUSED_USER, GUEST);
            }).toThrow(UserNotLoggedInException);
        });

        it('should not return any trip when users are not friends', () => {
            const friend: User = UserBuilder.aUser()
                .friendsWith(ANOTHER_USER)
                .withTrips(TO_BRAZIL)
                .build();

            const trips = tripService.getTripsByUser(friend, REGISTERED_USER);

            expect(trips.length).toBe(0);
        });

        it('should return trips when users are friends', () => {
            const friend: User = UserBuilder.aUser()
                .friendsWith(ANOTHER_USER, REGISTERED_USER)
                .withTrips(TO_BRAZIL, TO_PARIS)
                .build();

            const trips = tripService.getTripsByUser(friend, REGISTERED_USER);

            expect(trips.length).toBe(2);
        });
    });

    class TestableTripService extends TripService {
        protected getTripsForUser(user: User): Trip[] {
            return user.getTrips();
        }
    }
});
