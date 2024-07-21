import User from '../src/user/User';
import UserBuilder from './UserBuilder';

const VALENTIN: User = new User();
const HOCINE = new User();
const ALEX = new User();
describe('User', () => {
    describe('User class', () => {
        it('should inform when user are not friend', () => {
            const user: User = UserBuilder.aUser()
                .friendsWith(VALENTIN)
                .build();
            expect(user.isFriendsWith(HOCINE)).toBeFalsy();
        });

        it('should inform when user are friend', () => {
            const user: User = UserBuilder.aUser()
                .friendsWith(VALENTIN, HOCINE)
                .build();

            expect(user.isFriendsWith(HOCINE)).toBeTruthy();
        });
    });
});
