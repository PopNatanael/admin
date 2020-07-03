$( document ).ready(function(){
    $("#userEditButton").prop('disabled', true);
    $("#userDeleteButton").prop('disabled', true);

    $("#userAddButton").click(function () {
        showLoading();
        $.get('/user/add')
            .done(function (data) {
                $("#formModalTitle").html('Add User');
                $("#formPlaceholder").html(data);

                $("#loading").on('hidden.bs.modal', function () {
                    $("#loading").off('hidden');
                    $("#formModal").modal('show');
                });
                $('#formMessages').empty();

                hideLoading();
            })
            .fail(function (data) {
                $("#loading").on('hidden.bs.modal', function () {
                    $("#loading").off('hidden');
                    showFailDialog(data);
                });
                hideLoading();
            });
    });

    $("#userEditButton").click(function () {
        var selections = $("#bsTable").bootstrapTable('getSelections');
        if (selections.length != 1) {
            showAlertDialog('Selection error',
                'Multiple or no Admin selected. Only one Admin can be edited a time',
                'error');
        } else {
            showLoading();
            $.get('/user/edit/' + selections[0].uuid)
                .done(function (data) {
                    $("#formModalTitle").html('Edit Admin');
                    $("#formPlaceholder").html(data);

                    $("#loading").on('hidden.bs.modal', function () {
                        $("#loading").off('hidden');
                        $("#formModal").modal('show');
                    });
                    $('#formMessages').empty();
                    hideLoading();
                })
                .fail(function (data) {
                    $("#loading").on('hidden.bs.modal', function () {
                        $("#loading").off('hidden');
                        showFailDialog(data);
                    });
                    hideLoading();
                });
        }

    });

    $("#userDeleteButton").click(function () {
        var selections = $("#bsTable").bootstrapTable('getSelections');
        if (selections.length === 0) {
            return;
        }
        $("#deleteFormPlaceholder").text('Are you sure you want to delete ' + selections[0].identity + '?');
        $("#deleteFormModal").modal('show');
    });

    $("#deleteUserFormModalSubmit").click(function () {
        var selections = $("#bsTable").bootstrapTable('getSelections');
        $('#deleteFormModal').modal('handleUpdate');
        showLoading();

        $.post('/user/delete', selections[0])
            .done(function (data) {
                if (data.success == 'success') {
                    hideLoading();
                    $("#deleteFormMessages").html('<div class="alert alert-success alert-dismissible" ' +
                        'role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                        '<span aria-hidden="true">×</span></button> <div>'+data.message+'</div>' +
                        '</div>');
                    $("#bsTable").bootstrapTable('refresh');
                    setTimeout(function () {
                        $('#deleteFormModal').modal('hide');
                    },1500);
                } else {
                    hideLoading();
                    $("#deleteFormMessages").html('<div class="alert alert-danger alert-dismissible" ' +
                        'role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                        '<span aria-hidden="true">×</span></button> <div>'+data.message+'</div>' +
                        '<div>');
                    setTimeout(function () {
                        $('#deleteFormModal').modal('hide');
                    },2000);
                }
            })
            .fail(function (data) {
                hideLoading();
                $('#formModal').modal('hide');
            });
    });
});