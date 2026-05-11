import { observable, action } from 'mobx';
import { persist } from 'mobx-persist';

class UserStore {
  @persist @observable creditAccountId  = null;
  @persist @observable status           = null;


  @action
  setStudent(student) {
    this.creditAccountId                = student.CreditAccountId;
    this.status                         = student.Status;
  }


  clearStore() {
    this.creditAccountId                = null;
    this.status                         = null;
  }

}

const userStore = new UserStore();

export default userStore;
export { UserStore };
