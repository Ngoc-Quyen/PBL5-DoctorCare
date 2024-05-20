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
                    <button type="button"  data-patient-id="${patient.id}" class="ml-3 btn btn-primary btn-new-patient-ok1"> Chi tiết</button>
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

function addNewRowTableConfirmed(patient) {
    let htmlConfirmed = `
                <tr>
                <td> ${patient.id} </td>
                <td> ${patient.email}     </td>
                <td> ${patient.dateBooking}     </td>
                    <td> ${convertStringToDateClient(patient.updatedAt)}     </td>
                    <td> 
                    <button  type="button" data-patient-id="${
                        patient.id
                    }"  class="ml-3 btn btn-info btn-confirmed-patient"> Thông tin</button>
                    </td>
                </tr>
                `;
    $('#tableConfirmedPatients tbody').prepend(htmlConfirmed);
}

function addNewRowTableCanceled(patient) {
    let htmlPending = `
                  <tr>
                    <td> ${patient.id} - ${patient.name}   </td>
                    <td> ${patient.phone}     </td>
                    <td> ${patient.email}     </td>
                    <td> ${convertStringToDateClient(patient.updatedAt)} </td>
                    <td> 
                    <button   data-patient-id="${
                        patient.id
                    }"  class="ml-3 btn btn-primary btn-history-cancel-patient">Lịch sử</button>
                    </td>
                </tr>
               
                `;
    $('#tableCancelPatients tbody').prepend(htmlPending);
}

function convertStringToDateClient(string) {
    return moment(Date.parse(string)).format('DD/MM/YYYY, HH:mm A');
}
<<<<<<< HEAD



$(document).ready(function(e) {
=======
>>>>>>> 739653c60a0c603a0a692e0957a28a1033a63a68


function callAjaxRenderModalInfo(patientId, option) {
    $.ajax({
        method: 'POST',
        url: `${window.location.origin}/api/get-detail-patient-by-id`,
        data: { patientId: patientId },
        success: function(data) {
            $('#patientName').val(data.name);
            $('#btn-confirm-patient-done').attr('data-patient-id', data.id);
            $('#patientPhone').val(data.phone);
            $('#patientEmail').val(data.email);
            $('#patientDate').val(data.dateBooking);
            $('#patientTime').val(data.timeBooking);
            $('#patientReason').text(data.description);
            $('#patientAddress').text(data.address);
            if (data.ExtraInfo) {
                $('#patientHistoryBreath').text(data.ExtraInfo.historyBreath);
                $('#patientMoreInfo').text(data.ExtraInfo.moreInfo);
            }
            if (option) {
                $('#btn-confirm-patient-done').css('display', 'none');
                $('#btn-cancel-patient').text('OK');
            }
            
            
            $('#modalDetailPatient1').modal('show');
        },
        error: function(err) {
            console.log(err);
            alertify.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
        },
    });
}

function handleBtnNewPatientOk1() {
    $('#tableNewPatients').on('click', '.btn-new-patient-ok1', function(e) {
        let patientId = $(this).data('patient-id');
        let option = true;
        callAjaxRenderModalInfo(patientId, option);
    });
}
$(document).ready(function(e) {
    handleBtnNewPatientOk1();
    loadNewPatientsForUser();
    addNewRowTableConfirmed();
    addNewRowTableCanceled();
    convertStringToDateClient();
<<<<<<< HEAD
    

=======
    callAjaxRenderModalInfo();
>>>>>>> 739653c60a0c603a0a692e0957a28a1033a63a68
})
