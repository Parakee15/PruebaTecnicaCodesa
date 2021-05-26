import { Injectable } from '@angular/core';
import Swal, { SweetAlertOptions } from 'sweetalert2'


@Injectable()
export class AlertService {

    openSwal(data: SweetAlertOptions) {
        Swal.fire(
            `${data.title}`,
            `${data.text}`,
            data.icon
        );
    }


}