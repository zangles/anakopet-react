import Storage from './Storage.jsx';

const sessionUpdate = function (data) {
    return new Promise((resolve, reject) => {
        let s = new Storage('app');
        s.set('data', data);
        if (!s.get('previousUsers')) {
            s.set('previousUsers', []);
        }
        let prevUsers = s.get('previousUsers');
        let user = {
            userIdentity: data.userIdentity,
            userEmail: data.userEmail,
            userPicture: data.userPicture,
            userLoginPicture: data.userLoginPicture
        };
        s.set('previousUsers', [user].concat(prevUsers.filter(s => s.userEmail !== data.userEmail)))
        resolve(data);
    });
};

const sessionRetrieve = function (option) {
    return new Promise((resolve, reject) => {
        let s = new Storage('app');
        resolve(s.get(option));
    });
};

export { sessionUpdate, sessionRetrieve };
