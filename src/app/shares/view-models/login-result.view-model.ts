export class LoginResultViewModel {
  constructor(
    /*
     * Token that is used for accessing to protected sources in system.
     * */
    public accessToken: string,

    /*
     * Token which is used for refreshing the access token.
     * */
    public refreshToken: string,

    /*
     * How many seconds the token can live.
     * */
    public expiredTime: number,

    /**
     * user information
     */
    public userInformation: any
  ) {

    this.accessToken = accessToken;
    this.expiredTime = expiredTime;
    this.refreshToken = refreshToken;
    this.userInformation = userInformation
  }
}
