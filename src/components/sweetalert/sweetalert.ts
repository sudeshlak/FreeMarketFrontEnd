import Swal, {SweetAlertIcon} from "sweetalert2";

export const toast = (title: string, text: string, icon: SweetAlertIcon) => {
  Swal.fire({
    position: 'top-end',
    icon: icon,
    title: title,
    text: text,
    showConfirmButton: false,
    timer: 3000,
    toast: true
  }).then();
}

export const DetailBox = (title: string, text: string[], icon: SweetAlertIcon) => {
  let html: string = '';
  for (let errorMessage of text) {
    html += errorMessage + "<br>"
  }
  Swal.fire({
    icon: icon,
    title: title,
    html: html,
    showConfirmButton: true,
  }).then();
}

export const confirmationBox = async (message: string,
                                      confirmButtonText: string,
                                      denyButtonText: string,
                                      text: string,
                                      icon: SweetAlertIcon) => {
  return await Swal.fire({
    icon: icon,
    title: message,
    text: text,
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: confirmButtonText,
    denyButtonText: denyButtonText,
  });
}