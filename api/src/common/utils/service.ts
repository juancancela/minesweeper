import { errorMsg } from './logger';

export class ServiceResponse {
	constructor(public response: any, public success: boolean = true) {
		this.response = response;
		this.success = success;
	}
}

export const responseError = (msg: string) => new ServiceResponse(errorMsg(msg), false);

export const responseOk = (data: any, success: boolean = true) => new ServiceResponse(data, success);
