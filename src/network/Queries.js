import {fetchFactory} from '../utils';
import {persistStore} from '../stores';

const NETWORK_ERROR_STRING = 'خطا در برقراری ارتباط';

const role = 'Teacher';
const type = {signUp: 'SignUp', signIn: 'SignIn'};

export async function getAllLessonsList(filter) {
  try {
    const response = await fetchFactory(
        `/api/lessons/getalllessons?filter=${filter}`,
        {
          method: 'GET',
        },
    );
    console.warn('*****getAllLessonsList response: ', response);

    if (response.ok) {
      return await response.json();
    } else {
      return false;
    }
  } catch (e) {
    console.warn('queries getAllLessonsList catch error: ', e);
    return false;
  }
}

export async function getTeacherLessonsList() {
  try {
    const response = await fetchFactory(
        `/api/teachers/getteacherlessons`,
        {
          method: 'GET',
        },
    );
    console.warn('*****getTeacherLessonsList response: ', response);

    if (response.ok) {
      return await response.json();
    } else {
      return false;
    }
  } catch (e) {
    console.warn('queries getTeacherLessonsList catch error: ', e);
    return false;
  }
}

export async function setTeacherLessonsList(list) {
  try {
    const response = await fetchFactory(
        `/api/teachers/setteacherlessons`,
        {
          method: 'POST',
          body: list,
        },
    );
    console.warn('*****setTeacherLessonsList response: ', response);

    if (response.ok) {
      return await response.json();
    } else {
      return false;
    }
  } catch (e) {
    console.warn('queries setTeacherLessonsList catch error: ', e);
    return false;
  }
}

export async function setTeacherAvailability(state) {
  try {
    const response = await fetchFactory(
        `/api/teachers/setavailability?towhat=${state}`,
        {
          method: 'POST',
        },
    );
    console.warn('*****setTeacherAvailability response: ', response);

    if (response.ok) {
      return await response.json();
    } else {
      return false;
    }
  } catch (e) {
    console.warn('queries setTeacherAvailability catch error: ', e);
    return false;
  }
}

export async function getTeacherHours() {
  try {
    const response = await fetchFactory(
        `/api/teachers/getteacherhours`,
        {
          method: 'GET',
        },
    );
    console.warn('*****getTeacherHours response: ', response);

    if (response.ok) {
      return await response.json();
    } else {
      return false;
    }
  } catch (e) {
    console.warn('queries getTeacherHours catch error: ', e);
    return false;
  }
}

export async function setTeacherHours(hoursList) {
  try {
    const response = await fetchFactory(
        `/api/teachers/setteacherhours`,
        {
          method: 'POST',
          body: hoursList,
        },
    );
    console.warn('*****getTeacherHours response: ', response);

    if (response.ok) {
      return await response.json();
    } else {
      return false;
    }
  } catch (e) {
    console.warn('queries getTeacherHours catch error: ', e);
    return false;
  }
}

export async function getTeacherDistricts() {
  try {
    const response = await fetchFactory(
        `/api/teachers/getteachercovereddistricts`,
        {
          method: 'GET',
        },
    );
    console.warn('*****getTeacherDistricts response: ', response);

    if (response.ok) {
      return await response.json();
    } else {
      return false;
    }
  } catch (e) {
    console.warn('queries getTeacherDistricts catch error: ', e);
    return false;
  }
}

export async function setTeacherDistricts(districtsList) {
  try {
    const response = await fetchFactory(
        `/api/teachers/setteachercovereddistricts`,
        {
          method: 'POST',
          body: districtsList,
        },
    );
    console.warn('*****setTeacherDistricts response: ', response);

    if (response.ok) {
      return await response.json();
    } else {
      return false;
    }
  } catch (e) {
    console.warn('queries setTeacherDistricts catch error: ', e);
    return false;
  }
}

export async function setTeacherBrief(brief, description) {
  try {
    const response = await fetchFactory(
        `/api/teachers/setteacherinfo`,
        {
          method: 'POST',
          body: {
            Brief: brief,
            Description: description,
          },
        },
    );
    console.warn('*****setTeacherDistricts response: ', response);

    if (response.ok) {
      return await response.json();
    } else {
      return false;
    }
  } catch (e) {
    console.warn('queries setTeacherDistricts catch error: ', e);
    return false;
  }
}

export async function getOTPforSignUp(mobile) {
  try {
    const response = await fetchFactory(
      `/api/user/getotp/?type=${type.signUp}&mobile=${mobile}&role=${role}`,
      {
        method: 'GET',
      },
    );
    console.warn('*****getOTPforSignUp response: ', response);

    return response.ok;
  } catch (e) {
    console.warn('queries getOTPforSignUp catch error: ', e);
    return false;
  }
}

export async function checkOTPforSignUp(otp, mobile) {
  try {
    const response = await fetchFactory(
      `/api/user/checkotp/?type=${
        type.signUp
      }&mobile=${mobile}&role=${role}&otp=${otp}`,
      {
        method: 'GET',
      },
    );
    console.warn('*****getOTPforSignUp response: ', response);

    if (response.ok) {
      return await response.json();
    } else {
      return false;
    }
  } catch (e) {
    console.warn('queries getOTPforSignUp catch error: ', e);
    return false;
  }
}

export async function getOTPforSignIn(mobile) {
  try {
    const response = await fetchFactory(
      `/api/user/getotp/?type=${type.signIn}&mobile=${mobile}&role=${role}`,
      {
        method: 'GET',
      },
    );
    console.warn('*****getOTPforSignIn response: ', response);

    return response.ok;
  } catch (e) {
    console.warn('queries getOTPforSignIn catch error: ', e);
    return false;
  }
}

export async function checkOTPforSignIn(otp, mobile) {
  try {
    const response = await fetchFactory(
      `/api/user/checkotp/?type=${
        type.signIn
      }&mobile=${mobile}&role=${role}&otp=${otp}`,
      {
        method: 'GET',
      },
    );
    console.warn('*****checkOTPforSignIn response: ', response);

    if (response.ok) {
      let token = await response.json();
      persistStore.setToken(token);
      await getInfo();

      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.warn('queries checkOTPforSignIn catch error: ', e);
    return false;
  }
}

export async function signUp(guid, user) {
  try {
    const response = await fetchFactory(
      `/api/user/signup?guid=${guid}&role=${role}`,
      {
        method: 'POST',
        body: user,
      },
    );

    if (response.ok) {
      persistStore.setToken(await response.json());
      await this.getInfo();

      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.warn('queries signUp catch error: ', e);
    return false;
  }
}

export async function getInfo() {
  try {
    const response = await fetchFactory(
        `/api/user/getinfo`,
        {
          method: 'GET',
        },
    );

    if (response.ok) {
      let user = await response.json();
      await persistStore.setUser(user);
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.warn('queries signUp catch error: ', e);
    return false;
  }
}
