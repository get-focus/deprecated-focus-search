import 'babel-polyfill';

export const loadUserFinance = async ({id}) => {
    const response = await fetch(`http://localhost:9999/x/complex/${id}`)
    const data = await response.json();
    return data;
}

export const saveUserFinance = async ({user}) => {
    await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, 1500);
    });
    return {...finance};

}
