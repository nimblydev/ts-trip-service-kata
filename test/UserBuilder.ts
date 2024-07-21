import Trip from '../src/trip/Trip';
import User from '../src/user/User';

export default class UserBuilder {
    private user: User;

    static aUser(): UserBuilder {
        return new UserBuilder();
    }

    constructor() {
        this.user = new User();
    }

    friendsWith(...user: User[]): UserBuilder {
        user.forEach((friend) => this.user.addFriend(friend));
        return this;
    }

    withTrips(...trips: Trip[]): UserBuilder {
        trips.forEach((trip) => this.user.addTrip(trip));
        return this;
    }

    build(): User {
        return this.user;
    }
}
