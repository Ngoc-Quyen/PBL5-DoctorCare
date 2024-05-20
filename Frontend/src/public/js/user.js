function loadNewPatientsForUser() {
    $.ajax({
        url: `${window.location.origin}/user/get-patients-for-user`,
        method: 'POST',
        success: function (data) {
            let countNew = data.object.newPatients.length;
            let countPending = data.object.pendingPatients.length;
            let countConfirmed = data.object.confirmedPatients.length;
            let countCanceled = data.object.canceledPatients.length;
            $('#count-new').text(`${countNew}`);
            $('#count-need').text(`${countPending}`);
            $('#count-confirmed').text(`${countConfirmed}`);
            $('#count-canceled').text(`${countCanceled}`);

            let htmlNew,
                htmlPending,
                htmlConfirmed,
                htmlCanceled = '';
            // Đổ dữ liệu ở lịch hẹn mới   // <td> ${patient.doctorName}     </td>
            data.object.newPatients.forEach((patient) => {
                htmlNew += `
                <tr>
                    <td> ${patient.id} </td>
                    <td> ${patient.name}</td>
                    <td> ${patient.dateBooking}     </td>
                    <td> ${patient.timeBooking}  </td>
                    <td> 
                    <button type="button"  data-patient-id="${patient.id}" class="ml-3 btn btn-primary btn-new-patient-ok"> Chi tiết</button>
                    <button  type="button" data-patient-id="${patient.id}" class="ml-3 btn btn-danger btn-new-patient-cancel"> Hủy </button>
                    </td>
                </tr>
                `;
            });
            // đổ dữ liệu chỗ đã chấp nhận
            data.object.pendingPatients.forEach((patient) => {
                htmlPending += `
                <tr>
                <td> ${patient.email}     </td>
                <td> ${patient.dateBooking}     </td>
                <td> ${patient.timeBooking}   </td>
                    <td> 
                    <button  type="button" data-patient-id="${patient.id}" class="ml-3 btn btn-danger btn-pending-patient-cancel"> Hủy </button>
                    </td>
                </tr>
                `;
            });
            // Đổ dữ liệu chỗ đã khám
            data.object.confirmedPatients.forEach((patient) => {
                htmlConfirmed += `
                <tr>
                <td> ${patient.email}     </td>
                <td> ${patient.dateBooking}     </td>
                <td> ${patient.timeBooking}   </td>
                    <td> 
                    <button  type="button" data-patient-id="${patient.id}"  class="ml-3 btn btn-info btn-confirmed-patient"> Thông tin</button>
                    </td>
                </tr>
                `;
            });
            // Đổ dữ liệu chỗ đã hủy
            data.object.canceledPatients.forEach((patient) => {
                htmlCanceled += `
                <tr>
                <td> ${patient.email}     </td>
                <td> ${patient.dateBooking}     </td>
                <td> ${patient.timeBooking}   </td>
                    <td> 
                    <button   data-patient-id="${patient.id}"  class="ml-3 btn btn-primary btn-history-cancel-patient">Lịch sử</button>
                    </td>
                </tr>
                `;
            });

            $('#tableNewPatients tbody').append(htmlNew);
            $('#tableNeedConfirmPatients tbody').append(htmlPending);
            $('#tableConfirmedPatients tbody').append(htmlConfirmed);
            $('#tableCancelPatients tbody').append(htmlCanceled);
        },
        error: function (error) {
            console.log(error);
            alertify.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
        },
    });
}

// function addNewRowTableConfirmed(patient) {
//     console.log('patient from user.js: ', patient);

//     let htmlConfirmed = `
//                 <tr>
//                 <td> ${patient.id} </td>
//                 <td> ${patient.email}     </td>
//                 <td> ${patient.dateBooking}     </td>
//                     <td> ${convertStringToDateClient(patient.updatedAt)}     </td>
//                     <td>
//                     <button  type="button" data-patient-id="${
//                         patient.id
//                     }"  class="ml-3 btn btn-info btn-confirmed-patient"> Thông tin</button>
//                     </td>
//                 </tr>
//                 `;
//     $('#tableConfirmedPatients tbody').prepend(htmlConfirmed);
// }

// function addNewRowTableCanceled(patient) {
//     let htmlPending = `
//                   <tr>
//                     <td> ${patient.id} - ${patient.name}   </td>
//                     <td> ${patient.phone}     </td>
//                     <td> ${patient.email}     </td>
//                     <td> ${convertStringToDateClient(patient.updatedAt)} </td>
//                     <td>
//                     <button   data-patient-id="${
//                         patient.id
//                     }"  class="ml-3 btn btn-primary btn-history-cancel-patient">Lịch sử</button>
//                     </td>
//                 </tr>

//                 `;
//     $('#tableCancelPatients tbody').prepend(htmlPending);
// }

// function convertStringToDateClient(string) {
//     return moment(Date.parse(string)).format('DD/MM/YYYY, HH:mm A');
// }
$(document).ready(function (e) {
    loadNewPatientsForUser();
    // addNewRowTableConfirmed();
    // addNewRowTableCanceled();
    // convertStringToDateClient();
});
