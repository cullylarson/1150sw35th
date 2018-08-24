import {responseData} from '@app/lib/request'

export function sendForm(apiUrl, data) {
    const query = data

    return fetch(`${apiUrl}`, {
        method: 'post',
        body: JSON.stringify(query),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(responseData)
        .then(({response, data}) => {
            if(response.ok) {
                return {
                    success: true,
                    account: data,
                }
            }
            else if(response.status === 400) {
                return {
                    success: false,
                    errors: data.validation.errors.length ? data.validation.errors : ['There were some problems with the values provided. Please see the error messages below.'],
                    paramErrors: data.validation.paramErrors,
                }
            }
            else {
                return {
                    success: false,
                    errors: data.errors,
                    paramErrors: [],
                }
            }
        })
}
