import UserNotLoggedInException from "../exception/UserNotLoggedInException";
import User from "../user/User";
import UserSession from "../user/UserSession";
import Trip from "./Trip";
import TripDAO from "./TripDAO";

export default class TripService {
    public getTripsByUser(user: User): Trip[] {
        let tripList: Trip[] = [];
        const loggedUser: User = this.getLoggedInUser();
        let isFriend: boolean = false;

        if (loggedUser != null) {
            for (const friend of user.getFriends()) {
                if (friend === loggedUser) {
                    isFriend = true;
                    break;
                }
            }

            if (isFriend) {
                tripList = this.getTripsForUser( user);
            }

            return tripList;
        } else {
            throw new UserNotLoggedInException();
        }
    }

    protected getTripsForUser( user: User) {
        return TripDAO.findTripsByUser(user);
    }

    protected getLoggedInUser(): User {
        return UserSession.getLoggedUser();
    }
}
