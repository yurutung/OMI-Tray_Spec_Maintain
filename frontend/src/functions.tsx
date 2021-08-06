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

const errAlert = Swal.mixin({
    icon: 'error',
    title: 'Oops...',
    text: 'something wrong',
})

const clickById = (id: string) => {
    (document.getElementById(id) as HTMLInputElement).click()
}

const setTitleBar = (title: string) => {
    const title_bar = document.getElementById('title_bar') as HTMLElement
    if (title_bar)
        title_bar.innerText = title
}

export { toastMixin, errAlert, clickById, setTitleBar }