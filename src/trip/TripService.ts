import UserNotLoggedInException from '../exception/UserNotLoggedInException';
import User from '../user/User';
import Trip from './Trip';
import TripDAO from './TripDAO';

export default class TripService {
    public constructor(private tripDAO: TripDAO) {
        this.tripDAO = tripDAO;
    }
    public getFriendsTrips(friend: User, loggedInUser: User): Trip[] {
        this.validate(loggedInUser);

        return friend.isFriendsWith(loggedInUser)
            ? this.tripsBy(friend)
            : this.noTrips();
    }

    private validate(loggedInUser: unknown): asserts loggedInUser is User {
        if (!(loggedInUser instanceof User)) {
            throw new UserNotLoggedInException();
        }
    }

    private noTrips(): Trip[] {
        return [];
    }

    protected tripsBy(user: User) {
        return this.tripDAO.tripsBy(user);
    }
}
