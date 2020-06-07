export class ServiceResponse {
	constructor(public response: any, public success: boolean = true) {
		this.response = response;
		this.success = success;
	}
}
