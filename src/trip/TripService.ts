import UserNotLoggedInException from '../exception/UserNotLoggedInException';
import User from '../user/User';
import UserSession from '../user/UserSession';
import Trip from './Trip';
import TripDAO from './TripDAO';

export default class TripService {
    public getTripsByUser(user: User): Trip[] {
        if (this.getLoggedInUser() === null) {
            throw new UserNotLoggedInException();
        }

        return user.isFriendsWith(this.getLoggedInUser())
            ? this.getTripsForUser(user)
            : this.noTrips();
    }

    private noTrips(): Trip[] {
        return [];
    }

    protected getTripsForUser(user: User) {
        return TripDAO.findTripsByUser(user);
    }

    protected getLoggedInUser(): User {
        return UserSession.getLoggedUser();
    }
}
