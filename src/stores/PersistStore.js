import {action, observable} from 'mobx';
import {persist} from 'mobx-persist';
import {SERVER_ADDRESS} from '../../server_config';
import {userStore, teacherStore, studentStore} from './';

class PersistStore {
    @persist @observable token = null;

    @persist @observable selected = 0;

    @persist('list') @observable roles = [];

    @persist @observable username = null; // TODO : MUST BE DELETED

    @persist @observable serverUrl = SERVER_ADDRESS;

    @observable pushID = null;

    @persist paymentId = null;

    @action setToken(token){
        this.token = token;
    }

    @action setUser(user){
        userStore.setUser(user);
        if(user.Student){
            studentStore.setStudent(user.Student)
        }
        if(user.Teacher){
            teacherStore.setTeacher(user.Teacher)
        }
    }

    @action clearStore() {
        this.token = null;
        this.selected = 0;
        this.username = null;
        this.paymentId = null;

        userStore.clearStore();
        teacherStore.clearStore();
        studentStore.clearStore();
    }
}

const persistStore = new PersistStore();

export default persistStore;
export {PersistStore};
