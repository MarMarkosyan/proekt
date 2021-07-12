
const order = [
    {
        id: 5711,
        value: 1
    },
    {
        id: 3432,
        value: 1
    },
    {
        id: 4846,
        value: 1
    }
];
function tovarDelete(point) {
    let b = point.parentNode.parentNode;
    let t_id = b.querySelector('th').dataset.tovar;
    for (let i = 0; i < order.length; i++) {
        if (order[i].id == t_id) {
            order.splice(i, 1);
            console.log(t_id); // �������� �������� ���� ��������� �� �������� ������
            break;
        }
    }
    b.remove();
    if (order.length > 0) {
        tovarCount();
    } else {
        orderEmpty();
    }
}
function tovarChange(point) {
    let new_quantity = point.value;
    if (new_quantity <= 0) {
        tovarDelete(point);
    } else {
        let tovar_id = point.parentNode.parentNode.querySelector('th').dataset.tovar;
        for (let i = 0; i < order.length; i++) {
            if (order[i].id == tovar_id) {
                order[i].value = new_quantity;
                console.log(order[i]);
                break;
            }
        }
        tovarCount();
    }
}
function tovarCount() { // �������� ������
    let itog = 0; // ����� ����
    for (let i = 0; i < order.length; i++) { // ���������� � ����� �������
        const row = $('.order .table tbody tr').eq(i); // ����� ������, ��������������� �� ����������� ������ ������������� ������ � �������
        row.find('th').html(i + 1); // ���������� ���������� ����� ������. +1 ������ ��� ���� ������� � 1, � � ��� ���� � 0
        row.find('.sum').html(row.find('.rub').html() * order[i].value); // � ������ � ������� sum ������ ������������ ���������� ������, ������� �� �������, �� ���� ������, ������ �� ������ � ������� rub
        itog += +row.find('.sum').html(); // ������� � ����� ���������� ������ � ������� sum (������������ ���������� �� ���� ������ ������)
    }
    $('.order .table .allsum').html(itog); // ������ ���� � ������ � ������� allsum
}
function orderEmpty() {
    $('.order').addClass('empty');
}
function orderAction() {
    let data = {}; // ������� ����������, ����� ������� ��� ������ � ������ ��� ��������
    data.order = order; // ������ ���� �������
    data.customer = {}; // ������ ������ � ���������
    data.customer.name = $('#name').val();
    data.customer.address = $('#address').val();
    data.customer.email = $('#email').val();
    data.date = $('#date').val(); // ������ �������� ���� ��������
    data.comment = $('#comment').val(); // ������ ����������� ���������
    let err = checkData(data);
    if (err) { // ��������� ������ �� ���������� ������
        showErrors(err); // ���� ������ ����, ���������� �� � ���������� ���� �������.
        console.log('errors!'); // �������� � �������, ��� ������ ����.
        return;
    } // ����� �� ���������� ������ else
    /* ��� ��������� �������� ����� ��������� �� �������� ��� ���:
    $.ajax({
        type: "POST",
        url: url,
        data: data,
        success: success
    });
    */
    console.log(data);
}
function checkData(data) {
    let arr = []; // ������ ����� ���� ������ ����������, ����� ������� �� � ������
    for (let item in data.order) { // ��������� ������ � �������
        if (item.value <= 0) {
            arr.push(['value', item.id]); // ���� ������ 0 ��� ������, �������� ������
        }
    }
    for (let key of ['name', 'address', 'email']) { // ���������� �������� � ���������
        if (data.customer[key].length == 0) {
            arr.push(['empty', key]); // ���� ���� �� ���������, �������� ������
        }
    }
    if (data.date.length == 0) { // ��������� ����
        arr.push(['empty', 'date']); // ���� ���� �� ���������, �������� ������
    } else {
        let a = makeSelectedDate(data.date); // ������� ���� �� ������ � ���� date, ����� ����� 0:00:00.000
        let b = new Date(); // ������� ���� �������, ������
        b = new Date(b.getFullYear(), b.getMonth(), b.getDate()); // ������� ���� ������� � 0:00:00.000
        if ((a - b) != (1000 * 60 * 60 * 24 * 2)) {
            arr.push(['error', 'date']); // ���� ���� ���������, �� ���� �� ������������� "����� ����", �������� ������
        }
    }
    if (arr.length > 0) {
        return arr; // ���� ������ ����, ��������� ������ ������
    } else {
        return false; // ����� ���������� false
    }
}
function showErrors(err) {
    for (let unit of err) { // ���������� ������ ������
        if (typeof unit[1] == 'number') { // ���� ��������� �� ���� - �����, ���� ���� � ������
            for (let i = 0; i < order.length; i++) {
                if (order[i].id == unit[1]) { // ���������� ������, ������� ������ id, �������� ������ ������ �������
                    $('tbody .tr').eq(i).addClass('error').prop('data-error', unit[0]);
                }
            }
        } else { // ���������� id ���� � ������� � ��������� jquery, �������� ������ ����
            $('#' + unit[1]).addClass('error').prop('data-error', unit[0]);
        }
    }
}