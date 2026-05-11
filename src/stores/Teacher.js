import { observable, action } from 'mobx';
import { persist } from 'mobx-persist';

class UserStore {
    @persist @observable creditAccountId  = null;
    @persist('object') @observable status = null;
    @persist('object') @observable city   = null;
    @persist @observable availability     = null;
    @persist @observable address          = null;
    @persist @observable userName         = null;
    @persist @observable weeklyTimaTable  = null;
    @persist @observable coveredDistricts = null;
    @persist @observable brief            = null;
    @persist @observable description      = null;
    @persist @observable degree           = null;
    @persist @observable fieldOfStudy     = null;

  @action
  setTeacher(teacher) {
    this.creditAccountId                  = teacher.CreditAccountId;
    this.status                           = teacher.Status;
    this.city                             = teacher.City;
    this.availability                     = teacher.Availability;
    this.address                          = teacher.Address;
    this.userName                         = teacher.UserName;
    this.weeklyTimaTable                  = teacher.WeeklyTimaTable;
    this.coveredDistricts                 = teacher.CoveredDistricts;
    this.brief                            = teacher.Brief;
    this.description                      = teacher.Description;
    this.degree                           = teacher.Degree;
    this.fieldOfStudy                     = teacher.FieldOfStudy;
  }

  @action
  clearStore() {
    this.creditAccountId                  = null;
    this.status                           = null;
    this.city                             = null;
    this.availability                     = null;
    this.address                          = null;
    this.userName                         = null;
    this.weeklyTimaTable                  = null;
    this.coveredDistricts                 = null;
    this.brief                            = null;
    this.description                      = null;
    this.degree                           = null;
    this.fieldOfStudy                     = null;
  }
}

const userStore = new UserStore();

export default userStore;
export { UserStore };
