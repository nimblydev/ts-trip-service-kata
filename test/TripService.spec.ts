import UserNotLoggedInException from "../src/exception/UserNotLoggedInException";
import Trip from "../src/trip/Trip";
import TripService from "../src/trip/TripService";
import User from "../src/user/User";

const GUEST:User = null;
const UNUSED_USER:User = null;
const REGISTERED_USER = new User();
const ANOTHER_USER = new User();
const TO_BRAZIL = new Trip();
const TO_PARIS = new Trip();

describe("TripService", () => {

    let tripService: TripService;
    let loggedInUser: User;
    
    beforeEach(() => {
        tripService = new TestableTripService();
        loggedInUser = REGISTERED_USER;
    });
   

    describe("getTripsByUser should", () => {
        it("should thow an exception when user is not logged", () => {
            loggedInUser = GUEST;           
            expect(()=> {
                tripService.getTripsByUser(UNUSED_USER)
            }).toThrow(UserNotLoggedInException);

        });

        it("should not return any trip when users are not friends", () => {
             const friend = new User();
            friend.addFriend(ANOTHER_USER);
            friend.addTrip(TO_BRAZIL);

            const trips = tripService.getTripsByUser(friend);

            expect(trips.length).toBe(0);
        });

        it("should return trips when users are friends", () => {
            const friend = new User();
            friend.addFriend(ANOTHER_USER);
            friend.addFriend(REGISTERED_USER);
            friend.addTrip(TO_BRAZIL);
            friend.addTrip(TO_PARIS);

            const trips = tripService.getTripsByUser(friend);

            expect(trips.length).toBe(2);
        });
    });


    class TestableTripService extends TripService {
        /**
         * @Override
         **/
        protected getLoggedInUser() {
            return loggedInUser;
        }

        protected getTripsForUser(user: User): Trip[] {
            return user.getTrips();
        }
    }
});
