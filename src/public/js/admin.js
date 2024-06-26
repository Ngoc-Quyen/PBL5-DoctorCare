var loadFile = function(event) {
    var output = $('#image-preview');
    if ($('#image-clinic').val()) {
        output.removeClass('d-none');
        output.addClass('d-block');
        output.attr('src', URL.createObjectURL(event.target.files[0]));
    }
};

function loadImageUserSetting() {
    var output = $('#img-user-setting');
    // var fileName = $('#img-user-value');
    // var uploadData = new FormData();
    if ($('#update-avatar').val()) {
        output.attr('src', URL.createObjectURL(event.target.files[0]));
        // fileName.attr('value', URL.createObjectURL(event.target.files[0]));
    }
    // uploadData.append('file', e.target.files[0], 'file');
    // // Thực hiện yêu cầu POST tới máy chủ
    // fetch('/users/update-user', {
    //     method: 'POST',
    //     body: uploadData,
    // })
    //     .then((response) => response.json())
    //     .then((data) => {
    //         console.log('Server response:', data);
    //         // Xử lý phản hồi từ máy chủ ở đây (nếu cần)
    //     })
    //     .catch((error) => {
    //         console.error('Error:', error);
    //         // Xử lý lỗi (nếu có)
    //     });
}

function createNewPost(markdown, converter) {
    $('#createNewPost').on('click', function(event) {
        let formData = new FormData($('form#formCreateNewPost')[0]);
        let contentMarkdown = markdown.value();
        let contentHTML = converter.makeHtml(contentMarkdown);
        formData.append('contentMarkdown', contentMarkdown);
        formData.append('contentHTML', contentHTML);
        formData.append('title', $('#title-post').val());

        let data = {};
        for (let pair of formData.entries()) {
            data[pair[0]] = pair[1];
        }
        $.ajax({
            method: 'POST',
            url: `${window.location.origin}/admin/manage/post/create`,
            data: data,
            success: function(data) {
                alert('Một bài đăng mới được tạo thành công!');
                window.location.href = `${window.location.origin}/admin/manage/posts`;
            },
            error: function(error) {
                alertify.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
                console.log(error);
            },
        });
    });
}

function deleteClinicById() {
    $('.delete-specific-clinic').bind('click', function(e) {
        e.preventDefault();
        if (!confirm('Xóa gói khám này?')) {
            return;
        }

        let id = $(this).data('clinic-id');
        let node = this;
        $.ajax({
            method: 'DELETE',
            url: `${window.location.origin}/admin/delete/clinic`,
            data: { id: id },
            success: function(data) {
                node.closest('tr').remove();
                alertify.success('Xóa thành công!');
            },
            error: function(err) {
                alertify.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
                console.log(err);
            },
        });
    });
}

function createNewClinic(markdownIntroClinic, converter) {
    $('#createNewClinic').on('click', function(e) {
        let formData = new FormData($('form#formCreateNewClinic')[0]);
        let contentMarkdown = markdownIntroClinic.value();
        let contentHTML = converter.makeHtml(contentMarkdown);

        //contain file upload
        if ($('#image-clinic').val()) {
            formData.append('introductionMarkdown', contentMarkdown);
            formData.append('introductionHTML', contentHTML);
            formData.append('image', document.getElementById('image-clinic').files[0]);
            handleCreateClinicNormal(formData);
        } else {
            // create without file upload
            let data = {
                introductionMarkdown: contentMarkdown,
                introductionHTML: contentHTML,
            };
            for (let pair of formData.entries()) {
                data[pair[0]] = pair[1];
            }
            handleCreateClinicWithoutFile(data);
        }
    });
}

function handleCreateClinicWithoutFile(data) {
    $.ajax({
        method: 'POST',
        url: `${window.location.origin}/admin/clinic/create-without-file`,
        data: data,
        success: function(data) {
            alert('Một gói khám mới được tạo thành công');
            window.location.href = `${window.location.origin}/users/manage/clinic`;
        },
        error: function(error) {
            alertify.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
            console.log(error);
        },
    });
}

function handleCreateClinicNormal(formData) {
    $.ajax({
        method: 'POST',
        url: `${window.location.origin}/admin/clinic/create`,
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function(data) {
            alert('Một gói khám mới được tạo thành công');
            window.location.href = `${window.location.origin}/users/manage/clinic`;
        },
        error: function(error) {
            alertify.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
            console.log(error);
        },
    });
}

function updateClinic(markdownIntroClinic, converter) {
    $('#btnUpdateClinic').on('click', function(e) {
        let clinicId = $('#btnUpdateClinic').data('clinic-id');
        let formData = new FormData($('form#formUpdateClinic')[0]);
        let contentMarkdown = markdownIntroClinic.value();
        let contentHTML = converter.makeHtml(contentMarkdown);

        //contain file upload
        if ($('#image-clinic').val()) {
            formData.append('introductionMarkdown', contentMarkdown);
            formData.append('introductionHTML', contentHTML);
            formData.append('image', document.getElementById('image-clinic').files[0]);
            formData.append('id', clinicId);
            handleUpdateClinicNormal(formData);
        } else {
            // create without file upload
            let data = {
                id: clinicId,
                introductionMarkdown: contentMarkdown,
                introductionHTML: contentHTML,
            };
            for (let pair of formData.entries()) {
                data[pair[0]] = pair[1];
            }
            handleUpdateClinicWithoutFile(data);
        }
    });
}

function handleUpdateClinicNormal(formData) {
    $.ajax({
        method: 'PUT',
        url: `${window.location.origin}/admin/clinic/update`,
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function(data) {
            alert('Cập nhật thành công');
            window.location.href = `${window.location.origin}/users/manage/clinic`;
        },
        error: function(error) {
            alertify.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
            console.log(error);
        },
    });
}

function handleUpdateClinicWithoutFile(data) {
    $.ajax({
        method: 'PUT',
        url: `${window.location.origin}/admin/clinic/update-without-file`,
        data: data,
        success: function(data) {
            alert('Cập nhật thành công');
            window.location.href = `${window.location.origin}/users/manage/clinic`;
        },
        error: function(error) {
            alertify.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
            console.log(error);
        },
    });
}

function showModalInfoClinic() {
    $('.info-specific-clinic').on('click', function(e) {
        e.preventDefault();
        let id = $(this).data('clinic-id');

        $.ajax({
            method: 'POST',
            url: `${window.location.origin}/api/get-info-clinic-by-id`,
            data: { id: id },
            success: function(data) {
                $('#imageClinic').empty();
                $('#name').val(data.clinic.name);
                if (data.clinic.phone) {
                    $('#phone').val(data.clinic.phone);
                } else {
                    $('#phone').val('Chưa cập nhật');
                }

                if (data.clinic.image) {
                    $('#imageClinic').prepend(
                        `<img class="img-info-clinic" src="/images/clinics/${data.clinic.image}" />`
                    );
                } else {
                    $('#imageClinic').text('Chưa cập nhật');
                }

                $('#modalInfoClinic').modal('show');
            },
            error: function(error) {
                alertify.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
                console.log(error);
            },
        });
    });
}

function showModalSettingUser() {
    $('.user-setting').on('click', function(e) {
        e.preventDefault();
        $('#modalSettingUser').modal('show');
    });
}

function createNewDoctor() {
    $('#createNewDoctor').on('click', function(e) {
        e.preventDefault();
        let formData = new FormData($('form#formCreateNewDoctor')[0]);
        let data = {};
        for (let pair of formData.entries()) {
            data[pair[0]] = pair[1];
        }
        $.ajax({
            method: 'POST',
            url: `${window.location.origin}/admin/doctor/create`,
            data: data,
            success: function(data) {
                alertify.success('Thêm Bác sĩ thành công');
                // Chờ 2 giây và sau đó tải lại trang với đường dẫn mới
                setTimeout(function() {
                    window.location.href = '/users/manage/doctor'; // Thay thế '/your-new-url' bằng đường dẫn mới bạn muốn tải lại
                }, 2000); // 2000 milliseconds = 2 giây
                // alert('Tạo một bác sĩ mới thành công');
                // window.location.href = `${window.location.origin}/users/manage/doctor`;
            },
            error: function(error) {
                alertify.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
                console.log(error);
            },
        });
    });
}

function deleteDoctorById() {
    $('.delete-doctor-info').on('click', function(e) {
        if (!confirm('Xóa bác sĩ này?')) {
            return;
        }

        let id = $(this).data('doctor-id');
        let node = this;
        $.ajax({
            method: 'DELETE',
            url: `${window.location.origin}/admin/delete/doctor`,
            data: { id: id },
            success: function(data) {
                node.closest('tr').remove();
                alertify.success('Xóa thành công');
                // Chờ 2 giây và sau đó tải lại trang với đường dẫn mới
                setTimeout(function() {
                    window.location.href = '/users/manage/doctor'; // Thay thế '/your-new-url' bằng đường dẫn mới bạn muốn tải lại
                }, 2000); // 2000 milliseconds = 2 giây
            },
            error: function(err) {
                alertify.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
                console.log(err);
            },
        });
    });
}

// hàm xóa doctor item
$(document).ready(function() {
    // Event delegation to handle click events for dynamically added elements
    $(document).on('click', '.delete-doctor-info', function(e) {
        if (!confirm('Xóa bác sĩ này?')) {
            return;
        }

        let id = $(this).data('doctor-id');
        let node = this;
        $.ajax({
            method: 'DELETE',
            url: `${window.location.origin}/admin/delete/doctor`,
            data: { id: id },
            success: function(data) {
                node.closest('tr').remove();
                alertify.success('Xóa thành công');
                // Chờ 2 giây và sau đó tải lại trang với đường dẫn mới
                setTimeout(function() {
                    window.location.href = '/users/manage/doctor'; // Thay thế '/your-new-url' bằng đường dẫn mới bạn muốn tải lại
                }, 2000); // 2000 milliseconds = 2 giây
            },
            error: function(err) {
                alertify.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
                console.log(err);
            },
        });
    });
});

// function deleteCustomerById() {
//     $('.delete-customer-info').on('click', function (e) {
//         if (!confirm('Xóa bệnh nhân này?')) {
//             return;
//         }

//         let id = $(this).data('customer-id');
//         let node = this;
//         $.ajax({
//             method: 'DELETE',
//             url: `${window.location.origin}/users/customer/delete`,
//             data: { id: id },
//             success: function (data) {
//                 node.closest('tr').remove();
//                 alertify.success('Xóa thành công');
//                 // Chờ 2 giây và sau đó tải lại trang với đường dẫn mới
//                 setTimeout(function () {
//                     window.location.href = '/users/manage/customer'; // Thay thế '/your-new-url' bằng đường dẫn mới bạn muốn tải lại
//                 }, 2000); // 2000 milliseconds = 2 giây
//             },
//             error: function (err) {
//                 alertify.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
//                 console.log(err);
//             },
//         });
//     });
// }
// hàm delete customer by Id
$(document).ready(function() {
    // Event delegation to handle click events for dynamically added elements
    $(document).on('click', '.delete-customer-info', function(e) {
        if (!confirm('Xóa bệnh nhân này?')) {
            return;
        }

        let id = $(this).data('customer-id');
        let node = this;
        $.ajax({
            method: 'DELETE',
            url: `${window.location.origin}/users/customer/delete`,
            data: { id: id },
            success: function(data) {
                node.closest('tr').remove();
                alertify.success('Xóa thành công');
                // Chờ 2 giây và sau đó tải lại trang với đường dẫn mới
                setTimeout(function() {
                    window.location.href = '/users/manage/customer'; // Thay thế '/your-new-url' bằng đường dẫn mới bạn muốn tải lại
                }, 2000); // 2000 milliseconds = 2 giây
            },
            error: function(err) {
                alertify.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
                console.log(err);
            },
        });
    });
});

function deleteScheduleByDate() {
    $('.delete-schedule-info').on('click', function(e) {
        if (!confirm('Xóa thời gian của lịch này?')) {
            return;
        }

        let day = $(this).data('schedule-day');
        let node = this;
        $.ajax({
            method: 'DELETE',
            url: `${window.location.origin}/doctor/delete/schedule`,
            data: { day: day },
            success: function(data) {
                node.closest('tr').remove();
                if (data.message === 'success') {
                    alertify.success('Xóa lịch hẹn thành công');
                    // Chờ 2 giây và sau đó tải lại trang với đường dẫn mới
                    setTimeout(function() {
                        window.location.href = '/doctor/manage/schedule'; // Thay thế '/your-new-url' bằng đường dẫn mới bạn muốn tải lại
                    }, 2000); // 2000 milliseconds = 2 giây
                } else {
                    alertify.error(data.message);
                    // Chờ 2 giây và sau đó tải lại trang với đường dẫn mới
                    setTimeout(function() {
                        window.location.href = '/doctor/manage/schedule'; // Thay thế '/your-new-url' bằng đường dẫn mới bạn muốn tải lại
                    }, 2000); // 2000 milliseconds = 2 giây
                }
            },
            error: function(err) {
                alertify.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
                console.log(err);
            },
        });
    });
}

function showModalInfoDoctor() {
    $('.show-doctor-info').on('click', function(e) {
        e.preventDefault();
        let id = $(this).data('doctor-id');

        $.ajax({
            method: 'POST',
            url: `${window.location.origin}/api/get-info-doctor-by-id`,
            data: { id: id },
            success: function(data) {
                $('#imageDoctor').empty();

                $('#nameDoctor').val(data.doctor.name);
                if (data.doctor.phone) {
                    $('#phoneDoctor').val(data.doctor.phone);
                } else {
                    $('#phoneDoctor').val('Chưa cập nhật');
                }
                if (data.doctor.address) {
                    $('#addressDoctor').val(data.doctor.address);
                } else {
                    $('#addressDoctor').val('Chưa cập nhật');
                }
                if (data.specializationName) {
                    $('#specializationDoctor12').val(data.specializationName);
                } else {
                    $('#specializationDoctor12').val('Chua cap nhat');
                }

                if (data.doctor.avatar) {
                    $('#imageDoctor').prepend(`<img class="img-info-clinic" src="${data.doctor.avatar}" />`);
                } else {
                    $('#imageDoctor').text('Chưa cập nhật');
                }

                $('#modalInfoDoctor').modal('show');
            },
            error: function(error) {
                alertify.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
                console.log(error);
            },
        });
    });
}
// hàm show doctor item
$(document).ready(function() {
    // Event delegation to handle click events for dynamically added elements
    $(document).on('click', '.show-doctor-info', function(e) {
        e.preventDefault();
        let id = $(this).data('doctor-id');
        $.ajax({
            method: 'POST',
            url: `${window.location.origin}/api/get-info-doctor-by-id`,
            data: { id: id },
            success: function(data) {
                $('#imageDoctor').empty();

                $('#nameDoctor').val(data.doctor.name);
                if (data.doctor.phone) {
                    $('#phoneDoctor').val(data.doctor.phone);
                } else {
                    $('#phoneDoctor').val('Chưa cập nhật');
                }
                if (data.doctor.address) {
                    $('#addressDoctor').val(data.doctor.address);
                } else {
                    $('#addressDoctor').val('Chưa cập nhật');
                }
                $('#specializationDoctor12').val(data.specializationName);

                if (data.doctor.avatar) {
                    $('#imageDoctor').prepend(`<img class="img-info-clinic" src="${data.doctor.avatar}" />`);
                } else {
                    $('#imageDoctor').text('Chưa cập nhật');
                }

                $('#modalInfoDoctor').modal('show');
            },
            error: function(error) {
                console.log(error);
                alertify.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
            },
        });
    });
});

// function showModalInfoCustomer() {
//     $('.show-customer-info').on('click', function (e) {
//         e.preventDefault();
//         let id = $(this).data('customer-id');
//         $.ajax({
//             method: 'POST',
//             url: `${window.location.origin}/get-info-customer-by-id`,
//             data: { id: id },
//             success: function (data) {
//                 $('#imageCustomer').empty();

//                 $('#nameCustomer').val(data.user.name);
//                 if (data.user.phone) {
//                     $('#phoneCustomer').val(data.user.phone);
//                 } else {
//                     $('#phoneCustomer').val('Chưa cập nhật');
//                 }
//                 if (data.user.address) {
//                     $('#addressCustomer').val(data.user.address);
//                 } else {
//                     $('#addressCustomer').val('Chưa cập nhật');
//                 }
//                 if (data.user.avatar) {
//                     $('#imageCustomer').prepend(`<img class="img-info-clinic" src="${data?.user?.avatar}" />`);
//                 } else {
//                     $('#imageCustomer').text('Chưa cập nhật');
//                 }
//                 $('#modalInfoCustomer').modal('show');
//             },
//             error: function (error) {
//                 console.log(error);
//                 alertify.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
//             },
//         });
//     });
// }

// hàm show customer item
$(document).ready(function() {
    // Event delegation to handle click events for dynamically added elements
    $(document).on('click', '.show-customer-info', function(e) {
        e.preventDefault();
        let id = $(this).data('customer-id');
        $.ajax({
            method: 'POST',
            url: `${window.location.origin}/get-info-customer-by-id`,
            data: { id: id },
            success: function(data) {
                $('#imageCustomer').empty();

                $('#nameCustomer').val(data.user.name);
                if (data.user.phone) {
                    $('#phoneCustomer').val(data.user.phone);
                } else {
                    $('#phoneCustomer').val('Chưa cập nhật');
                }
                if (data.user.address) {
                    $('#addressCustomer').val(data.user.address);
                } else {
                    $('#addressCustomer').val('Chưa cập nhật');
                }
                if (data.user.avatar) {
                    $('#imageCustomer').prepend(`<img class="img-info-clinic" src="${data?.user?.avatar}" />`);
                } else {
                    $('#imageCustomer').text('Chưa cập nhật');
                }
                $('#modalInfoCustomer').modal('show');
            },
            error: function(error) {
                console.log(error);
                alertify.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
            },
        });
    });
});

function updateCustomer() {
    $('#btnUpdateCustomer').on('click', function(e) {
        let doctorId = $('#btnUpdateCustomer').data('doctor-id');
        let data = {
            id: doctorId,
        };

        // Cập nhật URL với giá trị thực tế của doctorId
        let url = `${window.location.origin}/users/customer/edit/${doctorId}`;
        $.ajax({
            method: 'POST',
            url: url,
            data: data,
            success: function(data) {
                alert('Cập nhật thành công');
                window.location.href = `${window.location.origin}/users/manage/customer`;
            },
            error: function(error) {
                alertify.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
                console.log(error);
            },
        });
    });
}

function updateDoctorFinal() {
    $('#btnUpdateDoctor').on('click', function(e) {
        let doctorId = $('#btnUpdateDoctor').data('doctor-id');
        let data = {
            id: doctorId,
        };

        // Cập nhật URL với giá trị thực tế của doctorId
        let url = `${window.location.origin}/users/doctor/edit/${doctorId}`;
        $.ajax({
            method: 'POST',
            url: url,
            data: data,
            success: function(data) {
                alert('Cập nhật thành công');
                window.location.href = `${window.location.origin}/users/manage/doctor`;
            },
            error: function(error) {
                alertify.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
                console.log(error);
            },
        });
    });
}

function deleteSpecializationById() {
    $('.delete-specialization').on('click', function(e) {
        if (!confirm('Xóa chuyên khoa này?')) {
            return;
        }
        let id = $(this).data('specialization-id');
        let node = this;
        $.ajax({
            method: 'DELETE',
            url: `${window.location.origin}/admin/delete/specialization`,
            data: { id: id },
            success: function(data) {
                node.closest('tr').remove();
                alertify.success('Xóa thành công');
                // Chờ 2 giây và sau đó tải lại trang với đường dẫn mới
                setTimeout(function() {
                    window.location.href = '/users/manage/specialization'; // Thay thế '/your-new-url' bằng đường dẫn mới bạn muốn tải lại
                }, 2000); // 2000 milliseconds = 2 giây
            },
            error: function(err) {
                alertify.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
                console.log(err);
            },
        });
    });
}

function showPostsForAdmin() {
    let currentPage = 1;
    let total = $('#paginationForPost').data('total');
    if (total === 1) {
        $(' .li-next').addClass('disabled');
    }
    $('.page-post-next').on('click', function(e) {
        e.preventDefault();
        currentPage++;
        $(' .li-pre').removeClass('disabled');

        if (currentPage === total) {
            $(' .li-next').addClass('disabled');
        }
        if (currentPage > total) return;
        generateTablePostPagination(currentPage);
    });

    $('.page-post-pre').on('click', function(e) {
        e.preventDefault();
        currentPage--;
        $(' .li-next').removeClass('disabled');
        if (currentPage === 1) {
            $(' .li-pre').addClass('disabled');
        }
        if (currentPage === 0) return;
        generateTablePostPagination(currentPage);
    });
}

function generateTablePostPagination(page) {
    $.ajax({
        url: `${window.location.origin}/admin/pagination/posts?page=${page}`,
        method: 'GET',
        success: function(data) {
            $('#listPostsTable tbody').empty();
            let html = '';
            data.posts.rows.forEach((post) => {
                html += `
                 <tr>
                        <td> ${post.id}</td>
                        <td>${post.title}</td>
                        <td>${post.writerName}</td>
                        <td>${post.dateClient}</td>
                        <td class="">
                            <a class=" " href="/admin/post/edit/${post.id}" title="Edit info"><i class="fas fa-pen-square mx-3"></i></a>
                            <a class="delete-post" href="#" data-post-id="${post.id}" title="Delete"><i class="fas fa-trash"></i></a>
                        </td>
                   </tr>
                `;
            });
            $('#listPostsTable tbody').append(html);
        },
        error: function(err) {
            alertify.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
            console.log(err);
        },
    });
}

function deletePostById() {
    $('.delete-post').on('click', function(e) {
        if (!confirm('Delete this post?')) {
            return;
        }
        let id = $(this).data('post-id');
        let node = this;
        $.ajax({
            method: 'DELETE',
            url: `${window.location.origin}/admin/delete/post`,
            data: { id: id },
            success: function(data) {
                node.closest('tr').remove();
                alertify.success('Xóa thành công');
            },
            error: function(err) {
                alertify.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
                console.log(err);
            },
        });
    });
}

function updatePost(markdown, converter) {
    $('#btnUpdatePost').on('click', function(e) {
        let postId = $('#btnUpdatePost').data('post-id');
        let formData = new FormData($('form#formUpdatePost')[0]);
        let contentMarkdown = markdown.value();
        let contentHTML = converter.makeHtml(contentMarkdown);
        formData.append('contentMarkdown', contentMarkdown);
        formData.append('contentHTML', contentHTML);
        formData.append('title', $('#titlePost').val());

        let data = {
            id: postId,
        };
        for (let pair of formData.entries()) {
            data[pair[0]] = pair[1];
        }
        $.ajax({
            method: 'PUT',
            url: `${window.location.origin}/admin/post/update`,
            data: data,
            success: function(data) {
                alert('Cập nhật thành công');
                window.location.href = `${window.location.origin}/admin/manage/posts`;
            },
            error: function(error) {
                alertify.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
                console.log(error);
            },
        });
    });
}

function createScheduleByDoctor(scheduleArr) {
    $('#createNewScheduleDoctor').on('click', function() {
        if (scheduleArr.length === 0) {
            alertify.error('Have not selected a plan to save');
            return;
        }

        $.ajax({
            method: 'POST',
            url: `${window.location.origin}/doctor/manage/schedule/create`,
            data: { schedule_arr: scheduleArr },
            success: function(data) {
                if (data.status === 1) {
                    alertify.success('Thêm lịch hẹn thành công');
                }
                // Chờ 2 giây và sau đó tải lại trang với đường dẫn mới
                setTimeout(function() {
                    window.location.href = '/doctor/manage/schedule/create'; // Thay thế '/your-new-url' bằng đường dẫn mới bạn muốn tải lại
                }, 2000); // 2000 milliseconds = 2 giây
            },
            error: function(error) {
                alertify.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
                console.log(error);
            },
        });
    });
}

function handleBtnSchedule() {
    let scheduleArr = [];
    $('.btn-schedule')
        .unbind('click')
        .bind('click', function(e) {
            let idBtn = $(this).attr('id');
            $(`#${idBtn}`).toggleClass('btn btn-css');

            let time = $(`#${idBtn}`).attr('value');
            let date = $('#datepicker').val();

            //check có class thì add new row, else try to remove
            if ($(`#${idBtn}`).hasClass('btn-css')) {
                let item = {
                    date: date,
                    time: time,
                    id: `${idBtn}-${date}`,
                };
                scheduleArr.push(item);
                $('#tableCreateSchedule tbody').append(
                    ` <tr id="row-${idBtn}">
                         <td>${time}</td>
                         <td>${date}</td>
                  </tr>`
                );
            } else {
                let count = -1;
                let timeCheck = $(`#${idBtn}`).attr('value');
                let dateCheck = $('#datepicker').val();
                scheduleArr.forEach((x, index) => {
                    if (x.time === timeCheck && x.date === dateCheck) {
                        count = index;
                    }
                });
                if (count > -1) scheduleArr.splice(count, 1);

                $(`table#tableCreateSchedule tr#row-${idBtn}`).remove();
            }

            scheduleArr.sort(function(a, b) {
                return a.time.localeCompare(b.time);
            });
        });

    return scheduleArr;
}

let isHandlingChange = false;

function handleChangeDatePicker() {
    $('#datepicker')
        .datepicker({
            startDate: '+1d',
            endDate: '+7d'
        })
        .on('changeDate', function(event) {
            if (!isHandlingChange) {
                isHandlingChange = true;

                let selectedDate = event.date;


                let tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                tomorrow.setHours(0, 0, 0, 0);


                let endDate = new Date();
                endDate.setDate(tomorrow.getDate() + 6);
                endDate.setHours(0, 0, 0, 0);


                if (selectedDate > tomorrow && selectedDate <= endDate) {
                    $('.btn-schedule').removeClass('btn-css').addClass('btn');
                } else {
                    $('#datepicker').datepicker('setDate', tomorrow);
                    let formattedDate = formatDate(tomorrow);
                    alertify.error('Chỉ được chọn 6 ngày kế tiếp từ ngày ' + formattedDate);
                }

                isHandlingChange = false;
            }
        });
}

// Hàm để chuyển đổi ngày thành dạng ngày/tháng/năm
function formatDate(date) {
    let day = date.getDate();
    let month = date.getMonth() + 1; // Tháng bắt đầu từ 0 nên cần cộng thêm 1
    let year = date.getFullYear();
    return day + '/' + month + '/' + year;
}



function stringToDate(_date, _format, _delimiter) {
    let formatLowerCase = _format.toLowerCase();
    let formatItems = formatLowerCase.split(_delimiter);
    let dateItems = _date.split(_delimiter);
    let monthIndex = formatItems.indexOf('mm');
    let dayIndex = formatItems.indexOf('dd');
    let yearIndex = formatItems.indexOf('yyyy');
    let month = parseInt(dateItems[monthIndex]);
    month -= 1;
    return new Date(dateItems[yearIndex], month, dateItems[dayIndex]);
}

function loadNewPatientsForAdmin() {
    $.ajax({
        url: `${window.location.origin}/admin/get-patients-for-tabs`,
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
            // Đổ dữ liệu ở lịch hẹn mới
            data.object.newPatients.forEach((patient) => {
                htmlNew += `
                <tr>
                <td> ${patient.id} - ${patient.name}   </td>
                <td> ${patient.phone}     </td>
                <td> ${patient.email}     </td>
                <td>${patient.dateBooking} (${patient.timeBooking})   </td>
                    <td> 
                    <button type="button"  data-patient-id="${patient.id}" class="ml-3 btn btn-primary btn-new-patient-ok"> Chấp nhận</button>
                    <button  type="button" data-patient-id="${patient.id}" class="ml-3 btn btn-danger btn-new-patient-cancel"> Hủy </button>
                    </td>
                </tr>
                `;
            });
            // đổ dữ liệu chỗ đã chấp nhận
            data.object.pendingPatients.forEach((patient) => {
                htmlPending += `
                <tr>
                    <td> ${patient.id} - ${patient.name}   </td>
                    <td> ${patient.phone}     </td>
                    <td> ${patient.email}     </td>
                    <td>${patient.dateBooking} (${patient.timeBooking})   </td>
                    <td> 
                    <button  data-patient-id="${patient.id}"  class="ml-3 btn btn-warning btn-pending-patient">Xác nhận</button>
                    <button  type="button" data-patient-id="${patient.id}" class="ml-3 btn btn-danger btn-pending-patient-cancel"> Hủy </button>
                    </td>
                </tr>
                `;
            });
            // Đổ dữ liệu chỗ đã khám
            data.object.confirmedPatients.forEach((patient) => {
                htmlConfirmed += `
                <tr>
                    <td> ${patient.id} - ${patient.name}   </td>
                    <td> ${patient.phone}     </td>
                    <td> ${patient.email}     </td>
                    <td>${patient.dateBooking} (${patient.timeBooking})   </td>
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
                    <td> ${patient.id} - ${patient.name}   </td>
                    <td> ${patient.phone}     </td>
                    <td> ${patient.email}     </td>
                    <td>${patient.dateBooking} (${patient.timeBooking})   </td>
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

function loadPatientsByDate() {
    $('#btn_SearchBooking').on('click', function(e) {
        let dateSearch = $('#dateDoctorAppointment').val();
        console.log('dateSearch: ', $('#dateDoctorAppointment').val());
        $.ajax({
            url: `${window.location.origin}/admin/manage/booking-date`,
            method: 'POST',
            data: { dateSearch: dateSearch },
            success: function(data) {
                let countNew = data.object.newPatients.length;
                let countPending = data.object.pendingPatients.length;
                let countConfirmed = data.object.confirmedPatients.length;
                let countCanceled = data.object.canceledPatients.length;

                $('#count-new').text(`${countNew}`);
                $('#count-need').text(`${countPending}`);
                $('#count-confirmed').text(`${countConfirmed}`);
                $('#count-canceled').text(`${countCanceled}`);
                // Clear the table bodies before appending new data
                $('#tableNewPatients tbody').empty();
                $('#tableNeedConfirmPatients tbody').empty();
                $('#tableConfirmedPatients tbody').empty();
                $('#tableCancelPatients tbody').empty();
                let htmlNew,
                    htmlPending,
                    htmlConfirmed,
                    htmlCanceled = '';
                // Đổ dữ liệu ở lịch hẹn mới
                data.object.newPatients.forEach((patient) => {
                    htmlNew += `
                    <tr>
                        <td> ${patient.id} - ${patient.name}   </td>
                        <td> ${patient.phone}     </td>
                        <td> ${patient.email}     </td>
                        <td>${patient.dateBooking} (${patient.timeBooking})   </td>
                        <td> 
                        <button type="button"  data-patient-id="${patient.id}" class="ml-3 btn btn-primary btn-new-patient-ok"> Chấp nhận</button>
                        <button  type="button" data-patient-id="${patient.id}" class="ml-3 btn btn-danger btn-new-patient-cancel"> Hủy </button>
                        </td>
                    </tr>
                    `;
                });
                // đổ dữ liệu chỗ đã chấp nhận
                data.object.pendingPatients.forEach((patient) => {
                    htmlPending += `
                    <tr>
                        <td> ${patient.id} - ${patient.name}   </td>
                        <td> ${patient.phone}     </td>
                        <td> ${patient.email}     </td>
                        <td>${patient.dateBooking} (${patient.timeBooking})   </td>
                        <td> 
                        <button  data-patient-id="${patient.id}"  class="ml-3 btn btn-warning btn-pending-patient">Xác nhận</button>
                        <button  type="button" data-patient-id="${patient.id}" class="ml-3 btn btn-danger btn-pending-patient-cancel"> Hủy </button>
                        </td>
                    </tr>
                    `;
                });
                // Đổ dữ liệu chỗ đã khám
                data.object.confirmedPatients.forEach((patient) => {
                    htmlConfirmed += `
                    <tr>
                        <td> ${patient.id} - ${patient.name}   </td>
                        <td> ${patient.phone}     </td>
                        <td> ${patient.email}     </td>
                        <td>${patient.dateBooking} (${patient.timeBooking})   </td>
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
                        <td> ${patient.id} - ${patient.name}   </td>
                        <td> ${patient.phone}     </td>
                        <td> ${patient.email}     </td>
                        <td>${patient.dateBooking} (${patient.timeBooking})   </td>
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
    });
}

function handleBtnNewPatientOk() {
    $('#tableNewPatients').on('click', '.btn-new-patient-ok', function(e) {
        if (!confirm('Bạn có muốn xác nhận lịch hẹn của bệnh nhân này?')) {
            return;
        }
        let countNew = +$('#count-new').text();
        let countPending = +$('#count-need').text();
        let patientId = $(this).data('patient-id');
        this.closest('tr').remove();
        countNew--;
        countPending++;
        $('#count-new').text(countNew);
        $('#count-need').text(countPending);

        $.ajax({
            url: `${window.location.origin}/admin/change-status-patient`,
            method: 'POST',
            data: { patientId: patientId, status: 'pending' },
            success: function(data) {
                let patient = data.patient;
                addNewRowTablePending(patient);
                alertify.success('Đã xác nhận lịch hẹn thành công');
                setTimeout(function() {
                    window.location.href = '/admin/get-new-patients'; // Thay thế '/your-new-url' bằng đường dẫn mới bạn muốn tải lại
                }, 2000);
            },
            error: function(error) {
                console.log(error);
                alertify.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
            },
        });
    });
}

function handleBtnNewPatientCancel() {
    $('#tableNewPatients').on('click', '.btn-new-patient-cancel', function(e) {
        $('#btnCancelBookingPatient').attr('data-patient-id', $(this).data('patient-id'));
        $('#btnCancelBookingPatient').attr('data-type', 'new-patient-cancel');
        $('#modalCancelBooking').modal('show');
    });
}

function callAjaxRenderModalInfo(patientId, option) {
    $.ajax({
        method: 'POST',
        url: `${window.location.origin}/api/get-detail-patient-by-id`,
        data: { patientId: patientId },
        success: function(data) {
            $('#patientName').val(data.patient.name);
            $('#btn-confirm-patient-done').attr('data-patient-id', data.patient.id);
            $('#patientPhone').val(data.patient.phone);
            $('#patientEmail').val(data.patient.email);
            $('#patientDate').val(data.patient.dateBooking);
            $('#patientTime').val(data.patient.timeBooking);
            $('#patientReason').val(data.patient.description);
            $('#patientAddress').val(data.patient.address);
            if (data.ExtraInfo) {
                $('#patientHistoryBreath').val(data.ExtraInfo.historyBreath);
                $('#patientMoreInfo').val(data.ExtraInfo.moreInfo);
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

function handleBtnPendingCancel() {
    $('#tableNeedConfirmPatients').on('click', '.btn-pending-patient-cancel', function(e) {
        $('#btnCancelBookingPatient').attr('data-patient-id', $(this).data('patient-id'));
        $('#btnCancelBookingPatient').attr('data-type', 'pending-patient-cancel');
        $('#modalCancelBooking').modal('show');
    });
}

function addNewRowTablePending(patient) {
    let htmlPending = `
                 <tr>
                    <td> ${patient.id} - ${patient.name}   </td>
                    <td> ${patient.phone}     </td>
                    <td> ${patient.email}     </td>
                    <td> ${patient.dateBooking} (${patient.timeBooking})     </td>
                    <td> 
                    <button  data-patient-id="${patient.id}"  class="ml-3 btn btn-warning btn-pending-patient">Xác nhận</button>
                    <button  type="button" data-patient-id="${patient.id}" class="ml-3 btn btn-danger btn-pending-patient-cancel"> Hủy </button>
                    </td>
                </tr>
               
                `;
    $('#tableNeedConfirmPatients tbody').prepend(htmlPending);
}

function addNewRowTableConfirmed(patient) {
    let htmlConfirmed = `
                <tr>
                    <td> ${patient.id} - ${patient.name}   </td>
                    <td> ${patient.phone}     </td>
                    <td> ${patient.email}     </td>
                    <td> ${patient.dateBooking} (${patient.timeBooking})     </td>
                    <td> 
                    <button  type="button" data-patient-id="${patient.id}"  class="ml-3 btn btn-info btn-confirmed-patient"> Thông tin</button>
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
                    <td> ${patient.dateBooking} (${patient.timeBooking}) </td>
                    <td> 
                    <button   data-patient-id="${patient.id}"  class="ml-3 btn btn-primary btn-history-cancel-patient">Lịch sử</button>
                    </td>
                </tr>
               
                `;
    $('#tableCancelPatients tbody').prepend(htmlPending);
}

function convertStringToDateClient(string) {
    return moment(Date.parse(string)).format('DD/MM/YYYY, HH:mm A');
}

function handleAfterCallingPatient() {
    $('#btn-confirm-patient-done').on('click', function(e) {
        if (!confirm('Bạn chắc chắn xác nhận kết thúc lịch hẹn?')) {
            return;
        }
        let countPending = +$('#count-need').text();
        let countConfirmed = +$('#count-confirmed').text();
        countPending--;
        countConfirmed++;
        $('#modalDetailPatient').modal('hide');
        let patientId = $('#btn-confirm-patient-done').attr('data-patient-id');
        // Lấy dữ liệu từ textarea
        let patientHistoryBreath = $('#patientHistoryBreath').val();
        let patientMoreInfo = $('#patientMoreInfo').val();
        $('#tableNeedConfirmPatients tbody')
            .find(`.btn-pending-patient[data-patient-id=${patientId}]`)
            .closest('tr')
            .remove();
        $('#count-need').text(countPending);
        $('#count-confirmed').text(countConfirmed);
        $.ajax({
            url: `${window.location.origin}/admin/change-status-patient`,
            method: 'POST',
            data: {
                patientId: patientId,
                status: 'confirmed',
                historyBreath: patientHistoryBreath,
                moreInfo: patientMoreInfo,
            },
            success: function(data) {
                let patient = data.patient;
                addNewRowTableConfirmed(patient);
                alertify.success('Xác nhận thành công!');
                setTimeout(function() {
                    window.location.href = '/admin/get-new-patients'; // Thay thế '/your-new-url' bằng đường dẫn mới bạn muốn tải lại
                }, 2000);
            },
            error: function(error) {
                console.log(error);
                alertify.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
            },
        });
    });
}

function handleViewInfoPatientBooked() {
    $('#tableConfirmedPatients').on('click', '.btn-confirmed-patient', function(e) {
        let patientId = $(this).data('patient-id');
        let option = true;
        callAjaxRenderModalInfo(patientId, option);
    });
}

function handleCancelBtn() {
    $('#btnCancelBookingPatient').on('click', function(e) {
        let formData = new FormData($('form#formCancelBooking')[0]);
        let data = {};
        let text = '';
        for (let pair of formData.entries()) {
            data[pair[0]] = pair[1];
        }

        if (data.reasonCancel === 'reason3') {
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

        let patientId = $('#btnCancelBookingPatient').attr('data-patient-id');

        let type = $('#btnCancelBookingPatient').attr('data-type');

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

        $('#modalCancelBooking').modal('hide');

        $.ajax({
            url: `${window.location.origin}/admin/change-status-patient`,
            method: 'POST',
            data: { patientId: patientId, status: 'failed', reason: text },
            success: function(data) {
                let patient = data.patient;
                addNewRowTableCanceled(patient);
                alertify.success('Đã hủy lịch hẹn thành công');
                setTimeout(function() {
                    window.location.href = '/admin/get-new-patients'; // Thay thế '/your-new-url' bằng đường dẫn mới bạn muốn tải lại
                }, 2000);
            },
            error: function(error) {
                console.log(error);
                alertify.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
            },
        });
    });
}

function handleBtnViewHistory() {
    $('#tableCancelPatients').on('click', '.btn-history-cancel-patient', function() {
        let patientId = $(this).data('patient-id');
        $('#btn-view-history').attr('data-patient-id', patientId);
        $.ajax({
            url: `${window.location.origin}/admin/get-logs-patient`,
            method: 'POST',
            data: { patientId: patientId },
            success: function(data) {
                $('#contentHistory').empty();

                let html = '';
                data.forEach((log) => {
                    html += `
                     <div class="form-row mb-3">
                            <div class="col-6">
                                <input type="text"  class="form-control" id="historyStatus" value="${log.content}">
                            </div>
                            <div class="col-3">
                                <input type="text"  class="form-control" id="personDone" value="${log.adminName}">
                            </div>
                            <div class="col-3">
                                <input type="text"  class="form-control" id="timeDone" value="${convertStringToDateClient(
                                    log.createdAt
                                )} ">
                            </div>
                        </div>
                    
                    `;
                });
                $('#contentHistory').append(html);
                $('#modalHistoryBooking').modal('show');
            },
            error: function(error) {
                console.log(error);
                alertify.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
            },
        });
    });
}

function handleDoctorViewInfoPatient() {
    $('.doctor-view-detail').on('click', function(e) {
        let patientId = $(this).attr('data-patient-id');
        $.ajax({
            method: 'POST',
            url: `${window.location.origin}/api/get-detail-patient-by-id`,
            data: { patientId: patientId },
            success: function(data) {
                $('#imageOldForms').empty();
                $('#patientName').val(data.name);
                $('#patientPhone').val(data.phone);
                $('#patientEmail').val(data.email);
                $('#patientDate').val(data.dateBooking);
                $('#patientTime').val(data.timeBooking);
                $('#patientReason').text(data.description);
                $('#patientAddress').text(data.address);
                if (data.ExtraInfo) {
                    $('#patientHistoryBreath').text(data.ExtraInfo.historyBreath);
                    $('#patientMoreInfo').text(data.ExtraInfo.moreInfo);
                    if (data.ExtraInfo.oldForms) {
                        let images = JSON.parse(data.ExtraInfo.oldForms);
                        let html = '';
                        for (let [key, value] of Object.entries(images)) {
                            html += `
                              <a href="/images/patients/${value}" class="mr-3" target="_blank" title="Nhấn vào đây để hiển thị hình ảnh">
                                <span>${value}</span>
                              </a>
                            `;
                        }

                        $('#imageOldForms').append(html);
                    } else {
                        $('#imageOldForms').append(`<span>Không có thông tin</span>`);
                    }
                }

                $('#modalDetailPatientForDoctor').modal('show');
            },
            error: function(err) {
                console.log(error);
                alertify.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
            },
        });
    });
}

function showModalSendForms() {
    $('.doctor-send-forms').on('click', function(e) {
        let patientId = $(this).attr('data-patient-id');
        let isSend = $(this).attr('data-is-send-forms');

        $.ajax({
            url: `${window.location.origin}/api/get-detail-patient-by-id`,
            method: 'POST',
            data: { patientId: patientId },
            success: function(data) {
                let html = '';
                $('#divGenerateFilesSend').empty();
                $('#emailPatient').val(data.email);
                $('#btnSendFilesForms').attr('data-patient-id', patientId);
                if (data.ExtraInfo) {
                    if (data.ExtraInfo.sendForms) {
                        let images = JSON.parse(data.ExtraInfo.sendForms);
                        for (let [key, value] of Object.entries(images)) {
                            html += `
                              <div class="form-row">
                                <div class="form-group col-9">
                                    <a type="text" class="form-control" id="nameFileSent" target="_blank" href="/images/patients/remedy/${value}" readonly="true" title="${value}" >
                               ${value}
                                </a>
                                </div>
                             </div>`;
                        }
                    } else {
                        html = `
                          <div class="form-row">
                            <div class="form-group col-9">
                                <label class="col-form-label text-label" for="nameFileSent"> File's name:</label>
                                <input type="text" class="form-control" id="nameFileSent" name="nameFileSent" disabled>
                            </div>
                         </div>`;
                    }
                }
                $('#divGenerateFilesSend').append(html);
                $('#modalSendForms').modal('show');
            },
            error: function(error) {
                console.log(error);
                alertify.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
            },
        });
    });
}

function handleSendFormsForPatient() {
    $('#btnSendFilesForms').on('click', function(e) {
        if (!$('#filesSend').val()) {
            alert('Please select files before sending!');
            return;
        }
        $(this).prop('disabled', true);
        $('#processLoadingAdmin').removeClass('d-none');
        let formData = new FormData($('form#formSendFormsForPatient')[0]);
        formData.append('patientId', $(this).attr('data-patient-id'));

        $.ajax({
            method: 'POST',
            url: `${window.location.origin}/doctor/send-forms-to-patient`,
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function(data) {
                $('#modalSendForms').modal('hide');
                $('#processLoadingAdmin').addClass('d-none');
                $('#btnSendFilesForms').prop('disabled', false);
                $(`.fa-exclamation-circle[data-patient-id=${data.patient.id}]`).css('color', '#36b9cc');
                $(`.fa-exclamation-circle[data-patient-id=${data.patient.id}]`)
                    .removeClass('fa-exclamation-circle')
                    .addClass('fa-check-circle');
                alertify.success('Sending remedies succeeds');
            },
            error: function(error) {
                alertify.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
                console.log(error);
            },
        });
    });
}

function resetModal() {
    $(`#modalDetailPatient`).on('hidden.bs.modal', function(e) {
        $(this)
            .find('input,textarea,select')
            .val('')
            .end()
            .find('input[type=checkbox], input[type=radio]')
            .prop('checked', '')
            .end();
    });

    $(`#modalHistoryBooking`).on('hidden.bs.modal', function(e) {
        $(this)
            .find('input,textarea,select')
            .val('')
            .end()
            .find('input[type=checkbox], input[type=radio]')
            .prop('checked', '')
            .end();
    });

    $(`#modalDetailPatientForDoctor`).on('hidden.bs.modal', function(e) {
        $(this)
            .find('input,textarea,select')
            .val('')
            .end()
            .find('input[type=checkbox], input[type=radio]')
            .prop('checked', '')
            .end();
    });

    $(`#modalSendForms`).on('hidden.bs.modal', function(e) {
        $(this)
            .find('input,textarea,select')
            .val('')
            .end()
            .find('input[type=checkbox], input[type=radio]')
            .prop('checked', '')
            .end();
    });
    $(`#modalCancelBooking`).on('hidden.bs.modal', function(e) {
        $(this)
            .find('input,textarea,select')
            .val('')
            .end()
            .find('input[type=checkbox], input[type=radio]')
            .prop('checked', '')
            .end();
        $('#inputDefaultReason').prop('checked', true);
    });
}

function doneComment() {
    $('.done-comment').on('click', function(e) {
        if (confirm('Confirm save customer feedback?')) {
            let commentId = $(this).attr('data-comment-id');
            node = this;
            $.ajax({
                method: 'POST',
                url: `${window.location.origin}/admin/done-comment`,
                data: { commentId: commentId },
                success: function(data) {
                    node.closest('tr').remove();

                    alertify.success('Đã lưu thành công phần bình luận');
                },
                error: function(error) {
                    alertify.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
                    console.log(error);
                },
            });
        }
    });
}

function statisticalAdmin(month) {
    $.ajax({
        method: 'POST',
        url: `${window.location.origin}/admin/statistical`,
        data: { month: month },
        success: function(data) {
            $('#sumPatient').text(data.patients.count);
            $('#sumDoctor').text(data.doctors.count);
            $('#sumPost').text(data.posts.count);

            if (data.bestDoctor === '') {
                $('#bestDoctor').text(`Không có thông tin`);
            } else {
                $('#bestDoctor').text(`${data.bestDoctor.name} (${data.bestDoctor.count})`);
            }
            // if (data.bestAdmin === '') {
            //     $('#bestAdmin').text(`Không có thông tin`);
            // } else {
            //     $('#bestAdmin').text(`${data.bestAdmin.name} (${data.bestAdmin.count})`);
            // }
        },
        error: function(error) {
            alertify.error('Đã xảy ra lỗi khi lấy thông tin thống kê, vui lòng thử lại sau');
            console.log(error);
        },
    });
}

function handleFindStatisticalAdmin() {
    $('#findStatisticalAdmin').on('click', function() {
        statisticalAdmin($('#monthAnalyse').val());
    });
}

function searchCustomerByPhone() {
    $('#btnSearch').on('click', function() {
        event.preventDefault(); // Ngăn chặn hành động mặc định của thẻ <a>
        let phone = document.getElementById('phone').value;
        $.ajax({
            method: 'POST',
            url: `${window.location.origin}/users/manage/customer`,
            data: { phone },
            success: function(data) {
                console.log(data);
                updateCustomerTable(data); // Assuming 'customers' is the key in the response
            },
            error: function(error) {
                alertify.error('Đã xảy ra lỗi khi lấy thông tin thống kê, vui lòng thử lại sau');
                console.log(error);
            },
        });
    });
}

function updateCustomerTable(customers) {
    const tbody = $('#dataTable tbody');
    tbody.empty(); // Clear existing table rows

    customers.forEach(function(customer) {
        const row = `<tr>
                        <td>${customer.name}</td>
                        <td>${customer.phone}</td>
                        <td>${customer.isActive ? 'Hoạt động' : 'Không hoạt động'}</td>
                        <td class="">
                        <a class="show-customer-info" data-customer-id="${customer.id}" href="#"
                        title="View info"><i class="fas fa-info-circle"></i></a>
                            <a class="edit-customer-info" href="/users/customer/edit/${
                                customer.id
                            }" title="Edit"><i class="fas fa-pen-square mx-3"></i></a>
                            <a class="delete-customer-info" data-customer-id="${
                                customer.id
                            }" href="#" title="Delete"><i class="fas fa-trash"></i></a>
                        </td>
                    </tr>`;
        tbody.append(row);
    });
}

function searchDoctorBy() {
    $('#btnSearchDoctor').on('click', function(event) {
        event.preventDefault(); // Ngăn chặn hành động mặc định của thẻ <a>
        let thongtin;
        let selectedValue = $('#specializationDoctor').val();
        if (selectedValue === "specializationId") {
            thongtin = $('#thongtinSelect').val(); // Nếu tìm kiếm theo chuyên khoa, lấy giá trị từ select
        } else {
            thongtin = $('#thongtin').val(); // Nếu không, lấy giá trị từ input
        }
        $.ajax({
            method: 'POST',
            url: `${window.location.origin}/users/manage/doctor`,
            data: { thongtin: thongtin, selectedValue: selectedValue },
            success: function(data) {
                console.log(data);
                updateDoctorTable(data); // Giả sử 'customers' là key trong response
            },
            error: function(error) {
                alertify.error('Đã xảy ra lỗi khi lấy thông tin thống kê, vui lòng thử lại sau');
                console.log(error);
            },
        });
    });
}

function updateDoctorTable(doctors) {
    const tbody = $('#dataTable tbody');
    tbody.empty(); // Clear existing table rows
    console.log('doctors from admin.js: ', doctors);
    doctors.forEach(function(doctor) {
        const row = `<tr>
                        <td>${doctor.id}</td>
                        <td>${doctor.name}</td>
                        <td>${doctor.phone}</td>
                        <td>
                            ${doctor.specializationName}
                        </td>
                        <td>${doctor.isActive ? 'Hoạt động' : 'Không hoạt động'}</td>
                        <td class="">
                        <a class="show-doctor-info" data-doctor-id="${doctor.id}" href="#"
                        title="View info"><i class="fas fa-info-circle"></i></a>
                            <a class="edit-doctor-info" href="/users/doctor/edit/${
                                doctor.id
                            }" title="Edit"><i class="fas fa-pen-square mx-3"></i></a>
                            <a class="delete-doctor-info" data-doctor-id="${
                                doctor.id
                            }" href="#" title="Delete"><i class="fas fa-trash"></i></a>
                        </td>
                    </tr>`;
        tbody.append(row);
    });
}
// hàm show speciality item
$(document).ready(function() {
    // Event delegation to handle click events for dynamically added elements
    $(document).on('click', '.info-specialization', function(e) {
        e.preventDefault();
        let id = $(this).data('specialization-id');
        $.ajax({
            method: 'POST',
            url: `${window.location.origin}/get-info-speciality-by-id`,
            data: { id: id },
            success: function(data) {
                $('#imageSpeciality').empty();

                $('#nameSpeciality').val(data.specialization.name);
                if (data.specialization.description) {
                    $('#descriptionSpeciality').val(data.specialization.description);
                } else {
                    $('#descriptionSpeciality').val('Chưa cập nhật');
                }
                if (data.specialization.image) {
                    $('#imageSpeciality').prepend(
                        `<img class="img-info-clinic" src="${data?.specialization?.image}" />`
                    );
                } else {
                    $('#imageSpeciality').text('Chưa cập nhật');
                }
                $('#modalInfoSpeciality').modal('show');
            },
            error: function(error) {
                console.log(error);
                alertify.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
            },
        });
    });
});
$(document).ready(function(e) {
    // $('.modal').on('hidden.bs.modal', function(e) {
    //     $(this).removeData();
    // });

    let markdownIntroClinic = new SimpleMDE({
        element: document.getElementById('intro-clinic'),
        placeholder: 'Nội dung giới thiệu...',
        spellChecker: false,
    });

    let markdownPost = new SimpleMDE({
        element: document.getElementById('contentMarkdown'),
        placeholder: 'Nội dung bài đăng...',
        spellChecker: false,
    });
    let converter = new showdown.Converter();
    // //create datepicker, doctor create schedule
    $('#datepicker').datepicker({
        format: 'dd/mm/yyyy',
        weekStart: 1,
        daysOfWeekHighlighted: '6,0',
        autoclose: true,
        todayHighlight: true,
    });
    $('#datepicker').datepicker('setDate', new Date());

    //create datepicker, doctor-appointment
    $('#dateDoctorAppointment').datepicker({
        format: 'dd/mm/yyyy',
        weekStart: 1,
        daysOfWeekHighlighted: '6,0',
        autoclose: true,
        todayHighlight: true,
    });

    loadFile(e);
    loadImageUserSetting(e);
    showModalSettingUser();
    createNewDoctor();
    deleteDoctorById();
    showModalInfoDoctor();
    // updateDoctor();
    deleteSpecializationById();
    showPostsForAdmin();
    deletePostById();
    createNewPost(markdownPost, converter);
    updatePost(markdownPost, converter);

    let arr = handleBtnSchedule();
    createScheduleByDoctor(arr);
    let currentDate = $('#datepicker').val();
    handleChangeDatePicker(currentDate);
    loadNewPatientsForAdmin();
    handleBtnNewPatientOk();
    handleBtnNewPatientCancel();
    handleBtnPendingPatient();
    handleBtnPendingCancel();
    resetModal();
    handleAfterCallingPatient();
    handleViewInfoPatientBooked();
    handleCancelBtn();
    handleBtnViewHistory();

    handleDoctorViewInfoPatient();
    showModalSendForms();
    handleSendFormsForPatient();
    doneComment();

    let month = new Date().getMonth();
    statisticalAdmin(month + 1);
    handleFindStatisticalAdmin();

    deleteScheduleByDate();
    // showModalInfoCustomer();
    // deleteCustomerById();
    loadPatientsByDate();
    searchCustomerByPhone();
    searchDoctorBy();
    updateCustomer();
    updateDoctorFinal();
});