import { Http } from '../http/http.service';
import { HttpMethod, UsersApiPath, UserType, ApiPath } from 'common/enums';
import { IDoctorDetails, IUserTypeDoctor } from 'common/interfaces';

type Constructor = {
  http: Http;
  apiPrefix: string
};

class UserApi {
  #http: Http;
  #apiPrefix: string;
  constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  public getDoctors(): Promise<IUserTypeDoctor[]> {
    return this.#http.load(`${this.#apiPrefix}${ApiPath.USERS}${UsersApiPath.TYPE}/${UserType.DOCTOR}`, {
      method: HttpMethod.GET
    });
  }

  public getDoctorDetails(id:string): Promise<IDoctorDetails> {
    return this.#http.load(`${this.#apiPrefix}${ApiPath.USERS}/${id}`, {
      method: HttpMethod.GET
    });
  }
}
export { UserApi };
