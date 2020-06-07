import { props } from '../common/utils';

type LoginResponseType = {
	success: boolean;
	token?: string;
	playerId?: string;
};

const { testUserEmail, testUserPassword, testUserToken, testPlayerId } = props;

export class AuthService {
	async login(email: string, password: string): Promise<LoginResponseType> {
		const isValid = email === testUserEmail && password === testUserPassword;
		if (isValid) {
			return {
				success: true,
				token: testUserToken,
				playerId: testPlayerId,
			};
		} else {
			return {
				success: false,
			};
		}
	}
}
