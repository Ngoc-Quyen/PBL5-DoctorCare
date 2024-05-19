function loadNewPatientsForUser() {
    $.ajax({
        url: `${window.location.origin}/user/get-patients-for-user`,
        method: 'POST',
        success: function(data) {
            console.log(data);
            let countNew = data.object.newPatients.length;
            let countPending = data.object.pendingPatients.length;
            let countConfirmed = data.object.confirmedPatients.length;
            let countCanceled = data.object.canceledPatients.length;
            console.log('0');
            console.log(countPending);
            console.log(countConfirmed);
            console.log(countCanceled);
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
                    <td> ${patient.name}</td>
                    <td> ${patient.dateBooking}     </td>
                    <td> ${patient.timeBooking}  </td>
                    <td> 
                    <button type="button" data-patient-id="${patient.id}" class="ml-3 btn btn-primary btn-new-patient-ok1"> Chi tiết</button>
                    <button  type="button" data-patient-id="${patient.id}" class="ml-3 btn btn-danger btn-new-patient-cancel"> Hủy </button>
                    </td>
                </tr>
                `;
            });
            // đổ dữ liệu chỗ đã chấp nhận
            data.object.pendingPatients.forEach((patient) => {
                htmlPending += `
                <tr>
                <td> ${patient.name}     </td>
                <td> ${patient.dateBooking}     </td>
                <td> ${patient.timeBooking}   </td>
                    <td> 
                    <button  type="button" data-patient-id="${patient.id}"  class="ml-3 btn btn-info btn-confirmed-patient"> Thông tin</button>
                    </td>
                </tr>
                `;
            });
            // Đổ dữ liệu chỗ đã khám
            data.object.confirmedPatients.forEach((patient) => {
                htmlConfirmed += `
                <tr>
                <td> ${patient.name}     </td>
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
                <td> ${patient.name}     </td>
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
        error: function(error) {
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

function handleCancelAppointment() {
    // Đảm bảo chỉ gắn sự kiện một lần
    if (!$.data(document, 'handleCancelAppointment')) {
        $.data(document, 'handleCancelAppointment', true);

        $('.btn.btn-noclick').on('click', function(e) {
            if (confirm('Xác nhận hủy lịch hẹn này?')) {
                let formData = new FormData($('form#formCancelBooking')[0]);
                let data = {};
                let text = '';
                for (let pair of formData.entries()) {
                    data[pair[0]] = pair[1];
                }

                if (data.reasonCancel === 'reason7') {
                    if (!$('#otherReason').val()) {
                        alert('Vui lòng điền thêm thông tin vì lý do khác');
                        return;
                    }
                    text = `Lý do khác: ${$('#otherReason').val()} `;
                } else if (data.reasonCancel === 'reason2') {
                    text = 'Bệnh nhân hủy lịch hẹn';
                } else {
                    text = 'Lịch hẹn không đúng';
                }

                let patientId = $(this).attr('data-patient-id');
                let type = $(this).attr('data-type');

                if (type === 'pending-patient-cancel') {
                    let countPending = +$('#count-need').text();
                    let countCancel = +$('#count-canceled').text();
                    countPending--;
                    countCancel++;
                    $('#tableNeedConfirmPatients tbody')
                        .find(`.btn-pending-patient-cancel[data-patient-id=${patientId}]`)
                        .closest('tr')
                        .remove();
                    $('#count-need').text(countPending);
                    $('#count-canceled').text(countCancel);
                } else {
                    let countNew = +$('#count-new').text();
                    let countCancel = +$('#count-canceled').text();
                    countNew--;
                    countCancel++;
                    $('#tableNewPatients tbody')
                        .find(`.btn-new-patient-cancel[data-patient-id=${patientId}]`)
                        .closest('tr')
                        .remove();
                    $('#count-new').text(countNew);
                    $('#count-canceled').text(countCancel);
                }

                $.ajax({
                    url: `${window.location.origin}/user/change-status-patient-for-user`,
                    method: 'POST',
                    data: { patientId: patientId, status: 'failed', reason: text },
                    success: function(data) {
                        let patient = data.patient;
                        addNewRowTableCanceled(patient);
                        alertify.success('Đã hủy lịch hẹn thành công');
                        setTimeout(function() {
                            window.location.href = '/InfoUser'; // Thay thế '/your-new-url' bằng đường dẫn mới bạn muốn tải lại
                        }, 2000);
                    },
                    error: function(error) {
                        console.log('Lỗi xảy ra đây nế:', error);
                        alertify.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
                    },
                });
            }
        });
    }
}

function handleBtnNewPatientCancel() {
    $('#tableNewPatients').on('click', '.btn-new-patient-cancel', function(e) {
        $('#btnCancelBookingPatient').attr('data-patient-id', $(this).data('patient-id'));
        $('#btnCancelBookingPatient').attr('data-type', 'new-patient-cancel');
        $('#modalCancelBooking').modal('show');
    });
}


// function handleBtnNewPatientCancel() {
//     $('#tableNewPatients').on('click', '.btn-new-patient-cancel', function(e) {
//         $('.btn.btn-noclick').attr('data-patient-id', $(this).data('patient-id'));
//         $('.btn.btn-noclick').attr('data-type', 'new-patient-cancel');
//         // $('#modalCancelBooking').modal('show');
//     });
// }



function callAjaxRenderModalInfo(userId, option) {
    $.ajax({
        method: 'POST',
        url: `${window.location.origin}/cancel`,
        data: { userId: userId },
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
            $('#modalDetailPatient').modal('show');
        },
        error: function(err) {
            console.log(error);
            alertify.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
        },
    });
}

function handleBtnPendingPatient() {
    $('#tableNeedConfirmPatients').on('click', '.btn-pending-patient', function(e) {
        let patientId = $(this).data('patient-id');
        let option = false;
        callAjaxRenderModalInfo(patientId, option);
    });
}

function handleViewInfoPatientBooked() {
    $('#tableConfirmedPatients').on('click', '.btn-confirmed-patient', function(e) {
        let patientId = $(this).data('patient-id');
        let option = true;
        callAjaxRenderModalInfo(patientId, option);
    });
}


function convertStringToDateClient(string) {
    return moment(Date.parse(string)).format('DD/MM/YYYY, HH:mm A');
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
    handleCancelAppointment(); // Gọi hàm để gắn sự kiện cho các nút 'Hủy'
    handleBtnNewPatientCancel();
    callAjaxRenderModalInfo();
})