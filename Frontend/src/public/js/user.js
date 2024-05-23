function loadNewPatientsForUser() {
    $.ajax({
        url: `${window.location.origin}/user/get-patients-for-user`,
        method: 'POST',
        success: function(data) {
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
                    <div style="display: flex; align-items: center; margin-bottom: 10px;">
                    <button type="button" data-patient-id="${patient.id}" class="ml-3 btn btn-primary btn-new-patient-ok1"> <i class="fa fa-info" aria-hidden="true"></i></button>
                    <button type="button" data-patient-id="${patient.id}" class="ml-3 btn btn-danger btn-new-patient-cancel1"> Hủy </button>
                </div>
                    
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
                    
                    <button type="button"  data-patient-id="${patient.id}" class="ml-3 btn btn-primary btn-new-patient-ok2"> Chi tiết</button>
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
                    <button type="button"  data-patient-id="${patient.id}" class="ml-3 btn btn-primary btn-new-patient-ok3"> Chi tiết</button>
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
                    }"  class="ml-3 btn btn-primary btn-new-patient-ok4"> Thông tin</button>
                    </td>
                </tr>
                `;
    $('#tableConfirmedPatients tbody').prepend(htmlConfirmed);
}


// function handleCancelAppointment() {
//     // Đảm bảo chỉ gắn sự kiện một lần
//     if (!$.data(document, 'handleCancelAppointment')) {
//         $.data(document, 'handleCancelAppointment', true);

//         $('.btn.btn-noclick').on('click', function(e) {
//             if (confirm('Xác nhận hủy lịch hẹn này?')) {
//                 let formData = new FormData($('form#formCancelBooking')[0]);
//                 let data = {};
//                 let text = '';
//                 for (let pair of formData.entries()) {
//                     data[pair[0]] = pair[1];
//                 }

//                 if (data.reasonCancel === 'reason7') {
//                     if (!$('#otherReason').val()) {
//                         alert('Vui lòng điền thêm thông tin vì lý do khác');
//                         return;
//                     }
//                     text = `Lý do khác: ${$('#otherReason').val()} `;
//                 } else if (data.reasonCancel === 'reason2') {
//                     text = 'Bệnh nhân hủy lịch hẹn';
//                 } else {
//                     text = 'Lịch hẹn không đúng';
//                 }

//                 let patientId = $(this).attr('data-patient-id');
//                 let type = $(this).attr('data-type');

//                 if (type === 'pending-patient-cancel') {
//                     let countPending = +$('#count-need').text();
//                     let countCancel = +$('#count-canceled').text();
//                     countPending--;
//                     countCancel++;
//                     $('#tableNewPatients tbody')
//                         .find(`.btn-pending-patient-cancel[data-patient-id=${patientId}]`)
//                         .closest('tr')
//                         .remove();
//                     $('#count-need').text(countPending);
//                     $('#count-canceled').text(countCancel);
//                 } else {
//                     let countNew = +$('#count-new').text();
//                     let countCancel = +$('#count-canceled').text();
//                     countNew--;
//                     countCancel++;
//                     $('#tableNewPatients tbody')
//                         .find(`.btn-new-patient-cancel[data-patient-id=${patientId}]`)
//                         .closest('tr')
//                         .remove();
//                     $('#count-new').text(countNew);
//                     $('#count-canceled').text(countCancel);
//                 }

//                 $.ajax({
//                     url: `${window.location.origin}/user/change-status-patient-for-user`,
//                     method: 'POST',
//                     data: { patientId: patientId, status: 'failed', reason: text },
//                     success: function(data) {
//                         let patient = data.patient;
//                         addNewRowTableCanceled(patient);
//                         alertify.success('Đã hủy lịch hẹn thành công');
//                         setTimeout(function() {
//                             window.location.href = '/InfoUser'; // Thay thế '/your-new-url' bằng đường dẫn mới bạn muốn tải lại
//                         }, 2000);
//                     },
//                     error: function(error) {
//                         console.log('Lỗi xảy ra đây nế:', error);
//                         alertify.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
//                     },
//                 });
//             }
//         });
//     }
// }

function callAjaxRenderModalInfo(patientId, option, modalId) {
    $.ajax({
        method: 'POST',
        url: `${window.location.origin}/api/get-detail-patient-by-id`,
        data: { patientId: patientId },
        success: function(data) {
            // Xác định modal hiện tại
            let modal = $(modalId);
            // Hàm formatDate
            function formatDate(dateString) {
                let date = new Date(dateString);
                let day = date.getDate();
                let month = date.getMonth() + 1; // Tháng được tính từ 0-11
                let year = date.getFullYear();
                let hours = date.getHours();
                let minutes = date.getMinutes();
                let seconds = date.getSeconds();

                // Đảm bảo định dạng 2 chữ số cho ngày, tháng, giờ, phút, giây
                day = day < 10 ? '0' + day : day;
                month = month < 10 ? '0' + month : month;
                hours = hours < 10 ? '0' + hours : hours;
                minutes = minutes < 10 ? '0' + minutes : minutes;
                seconds = seconds < 10 ? '0' + seconds : seconds;

                return `${day}/${month}/${year} (${hours}:${minutes}:${seconds})`;
            }
            // Đặt dữ liệu vào các trường trong modal
            modal.find('#patientName').val(data.name);
            modal.find('#btn-confirm-patient-done').attr('data-patient-id', data.id);
            modal.find('#patientPhone').val(data.phone);
            modal.find('#patientEmail').val(data.email);
            modal.find('#patientDate').val(data.dateBooking);
            modal.find('#patientTime').val(data.timeBooking);
            modal.find('#patientReason').val(data.description);
            modal.find('#patientAddress').text(data.address);
            let formattedDate = formatDate(data.updatedAt);
            modal.find('#patientTimeUpdate').val(formattedDate);
            // modal.find('#patientTimeUpdate').val(data.updatedAt);

            if (data.ExtraInfo) {
                modal.find('#patientHistoryBreath').text(data.ExtraInfo.historyBreath);
                modal.find('#patientMoreInfo').text(data.ExtraInfo.moreInfo);
            }

            if (option) {
                modal.find('#btn-confirm-patient-done').css('display', 'none');
                modal.find('#btn-cancel-patient').text('OK');
            }

            modal.modal('show'); // Chỉ hiển thị modal xác định
        },
        error: function(err) {
            console.log(err);
            alertify.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
        },
    });
}

function formatDate(dateString) {
    let parts = dateString.split('-');
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

function handleBtnNewPatientOk1() {
    $('#tableNewPatients').on('click', '.btn-new-patient-ok1', function(e) {
        let patientId = $(this).data('patient-id');
        let option = false;
        callAjaxRenderModalInfo(patientId, option, '#modalDetailPatient1');
    });
}

function handleBtnNewPatientOk2() {
    $('#tableNeedConfirmPatients').on('click', '.btn-new-patient-ok2', function(e) {
        let patientId = $(this).data('patient-id');
        let option = true;
        callAjaxRenderModalInfo(patientId, option, '#modalDetailPatientConfirmed');
    });
}

function handleBtnNewPatientOk3() {
    $('#tableConfirmedPatients').on('click', '.btn-new-patient-ok3', function(e) {
        let patientId = $(this).data('patient-id');
        let option = true;
        callAjaxRenderModalInfo(patientId, option, '#modalCancelBooking');
    });
}

function handleBtnNewPatientCancel1() {
    $('#tableNewPatients').on('click', '.btn-new-patient-cancel1', function(e) {
        let patientId = $(this).data('patient-id');
        let option = true;
        callAjaxRenderModalInfo(patientId, option, '#modalCancelBooking');
    });
}



function reserModal1() {
    $(`#modalDetailPatient1`).on('hidden.bs.modal', function(e) {
        $(this)
            .find('input,textarea,select')
            .val('')
            .end()
            .find('input[type=checkbox], input[type=radio]')
            .prop('checked', '')
            .end();
    });
    $(`#modalDetailPatientConfirmed`).on('hidden.bs.modal', function(e) {
        $(this)
            .find('input,textarea,select')
            .val('')
            .end()
            .find('input[type=checkbox], input[type=radio]')
            .prop('checked', '')
            .end();
    });

}


function handleCancelBtnForUser() {
    $('#btnCancelBookingPatient1').on('click', function(e) {
        let formData = new FormData($('form#formCancelBooking')[0]);
        let data = {};
        let text = '';
        for (let pair of formData.entries()) {
            data[pair[0]] = pair[1];
        }

        if (data.reasonCancel === 'reason') {
            if (!$('#otherReason').val()) {
                alert('Vui lòng điền thêm thông tin vì lý do khác');
                return;
            }
            text = `Lý do khác: ${$('#otherReason').val()}`;
        } else if (data.reasonCancel === 'reason1') {
            text = 'Tôi muốn đi khám gấp nên không cần đặt lịch nữa';
        } else if (data.reasonCancel === 'reason2') {
            text = 'Tôi muốn tham khảo thêm nhiều cơ sở y tế khác';
        } else if (data.reasonCancel === 'reason3') {
            text = 'Chưa sắp xếp được thời gian, tôi sẽ đặt lại lịch sau';
        } else if (data.reasonCancel === 'reason4') {
            text = 'Tôi muốn đổi thời gian đặt lịch';
        } else if (data.reasonCancel === 'reason5') {
            text = 'Tôi muốn xem thêm thông tin';
        } else if (data.reasonCancel === 'reason6') {
            text = 'Tôi không muốn đặt lịch khám nữa';
        } else {
            text = 'Lý do hủy lịch không xác định';
        }

        let patientId = $('#btnCancelBookingPatient1').attr('data-patient-id');

        let type = $('#btnCancelBookingPatient1').attr('data-type');

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
                .find(`.btn-new-patient-cancel1[data-patient-id=${patientId}]`)
                .closest('tr')
                .remove();
            $('#count-new').text(countNew);
            $('#count-canceled').text(countCancel);
        }

        $('#modalCancelBooking').modal('hide');

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
                console.log(error);
                alertify.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
            },
        });
    });
}



$(document).ready(function(e) {
    handleCancelBtnForUser();
    reserModal1();
    handleBtnNewPatientOk3();
    handleBtnNewPatientOk2();
    handleBtnNewPatientOk1();
    loadNewPatientsForUser();
    addNewRowTableConfirmed();
    callAjaxRenderModalInfo();
    formatDate(dateString);
    handleBtnNewPatientCancel1();

})