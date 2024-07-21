import UserNotLoggedInException from '../exception/UserNotLoggedInException';
import User from '../user/User';
import Trip from './Trip';
import TripDAO from './TripDAO';

export default class TripService {
    public constructor(private tripDAO: TripDAO) {
        this.tripDAO = tripDAO;
    }
    public getFriendsTrips(user: User, loggedInUser: User): Trip[] {
        this.validate(loggedInUser);

        return user.isFriendsWith(loggedInUser)
            ? this.tripsBy(user)
            : this.noTrips();
    }

    private validate(loggedInUser: User) {
        if (loggedInUser === null) {
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
