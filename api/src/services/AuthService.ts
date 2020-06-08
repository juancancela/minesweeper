import { props } from '../common/utils';

type LoginResponseType = {
	success: boolean;
	token?: string;
	playerId?: string;
};

const {
	testUserEmail,
	testUserPassword,
	testUserToken,
	testPlayerId,
	testPlayerId1,
	testUserEmail1,
	testUserPassword1,
} = props;

/**
 * Authentication Service.
 * For the sake of simplicity, it just mocks two users provided through system environment vars
 */
export class AuthService {
	async login(email: string, password: string): Promise<LoginResponseType> {
		const isValid =
			(email === testUserEmail && password === testUserPassword) ||
			(email === testUserEmail1 && password === testUserPassword1);
		if (isValid) {
			return {
				success: true,
				token: testUserToken,
				playerId: email === testUserEmail ? testPlayerId : testPlayerId1,
			};
		} else {
			return {
				success: false,
			};
		}
	}
}
