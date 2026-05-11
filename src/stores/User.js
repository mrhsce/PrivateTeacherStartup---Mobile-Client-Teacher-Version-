import { observable, action } from 'mobx';
import { persist } from 'mobx-persist';

class UserStore {
  @persist @observable name             = null;
  @persist @observable family           = null;
  @persist @observable gender           = null;
  @persist @observable phoneNumber      = null;
  @persist @observable email            = null;


  @action
  setUser(user) {
    this.name                           = user.Name;
    this.family                         = user.Family;
    this.gender                         = user.Gender;
    this.phoneNumber                    = user.PhoneNumber;
    this.email                          = user.Email;
  }

  @action
  clearStore() {
    this.name                           = null;
    this.family                         = null;
    this.gender                         = null;
    this.phoneNumber                    = null;
    this.email                          = null;
  }
}

const userStore = new UserStore();

export default userStore;
export { UserStore };
