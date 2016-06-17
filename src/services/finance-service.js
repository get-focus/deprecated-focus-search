import 'babel-polyfill';

export const loadFinance = async ({id}) => {
    const response = await fetch(`http://localhost:9999/x/complex/${id}`)
    const data = await response.json();
    return data.finance;
}

export const saveFinance = async ({user}) => {
    await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, 1500);
    });
    return {...finance};

}
