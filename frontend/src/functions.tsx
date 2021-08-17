import Swal from 'sweetalert2'

const toastMixin = Swal.mixin({
    toast: true,
    icon: 'success',
    title: 'General Title',
    // animation: false,
    position: 'top-right',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

const warnAlert = Swal.mixin({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
    heightAuto: false
})

const errAlert = Swal.mixin({
    icon: 'error',
    title: 'Oops...',
    text: 'something wrong',
    heightAuto: false
})

const clickById = (id: string) => {
    (document.getElementById(id) as HTMLInputElement).click()
}

const setTitleBar = (title: string) => {
    const title_bar = document.getElementById('title_bar') as HTMLElement
    if (title_bar)
        title_bar.innerText = title
}

const getInvalidMsg = (invlaidType: string): string => {
    const msg: any = {
        required: 'Please input this item.',
        maxLength: 'It is too long.',
        valueAsNumber: 'Please input a number!'
    }
    if (invlaidType in msg)
        return msg[invlaidType]
    return ''
}

/**
 * set save data
 * 1. change null string to null
 * 2. if is string, then trim
 * @param data 
 * @returns object
 */
const setObjectFormat = (data: { [key: string]: any }) => {
    Object.entries(data).forEach(([key, value]: any) => {
        if (typeof value == 'string') {
            value = value.trim()
        }
        if (value == '') {
            value = null
        }
        data[key] = value
    })
    return data
}

export { toastMixin, errAlert, warnAlert, clickById, setTitleBar, getInvalidMsg, setObjectFormat }