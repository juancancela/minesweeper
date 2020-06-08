import { errorMsg } from './logger';

/**
 * Wrapper class to be used when returning a response to the client
 */
export class ServiceResponse {
	constructor(public response: any, public success: boolean = true) {
		this.response = response;
		this.success = success;
	}
}

/**
 * Helper function to simplify creation of an error response
 * @param msg error message
 */
export const responseError = (msg: string) => new ServiceResponse(errorMsg(msg), false);

/**
 * Helper function to simplify creation of a successful response
 * @param data data to be added to the service response
 * @param success whether or not the response is ok
 */
export const responseOk = (data: any, success: boolean = true) => new ServiceResponse(data, success);
