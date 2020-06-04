import { MatchService } from './MatchService';
import { AuthService } from './AuthService';
import { PlayerService } from './PlayerService';

export default {
	matchService: new MatchService(),
	authService: new AuthService(),
	playerService: new PlayerService(),
};
