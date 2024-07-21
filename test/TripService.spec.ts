import UserNotLoggedInException from '../src/exception/UserNotLoggedInException';
import Trip from '../src/trip/Trip';
import TripDAO from '../src/trip/TripDAO';
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
    let tripDAO: TripDAO;
    beforeEach(() => {
        tripDAO = new TripDAO();
        tripService = new TripService(tripDAO);
    });

    describe('getTripsByUser should', () => {
        it('should thow an exception when user is not logged', () => {
            expect(() => {
                tripService.getFriendsTrips(UNUSED_USER, GUEST);
            }).toThrow(UserNotLoggedInException);
        });

        it('should not return any trip when users are not friends', () => {
            const friend: User = UserBuilder.aUser()
                .friendsWith(ANOTHER_USER)
                .withTrips(TO_BRAZIL)
                .build();

            const trips = tripService.getFriendsTrips(friend, REGISTERED_USER);

            expect(trips.length).toBe(0);
        });

        it('should return trips when users are friends', () => {
            const friend: User = UserBuilder.aUser()
                .friendsWith(ANOTHER_USER, REGISTERED_USER)
                .withTrips(TO_BRAZIL, TO_PARIS)
                .build();

            jest.spyOn(tripDAO, 'tripsBy').mockReturnValue(friend.getTrips());

            const trips = tripService.getFriendsTrips(friend, REGISTERED_USER);

            expect(trips.length).toBe(2);
        });
    });
});
