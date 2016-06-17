import 'babel-polyfill';

export const loadUser = async ({id}) => {
    const response = await fetch(`http://localhost:9999/x/complex/${id}`)
    const data = await response.json();
    return data.user;
}

export const saveUser = async ({user}) => {
    await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, 1500);
    });
    return {...user, firstName: 'Name changed by the server mwahaha'};

}
