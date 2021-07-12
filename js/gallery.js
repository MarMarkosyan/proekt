function seebigimage() {
    // �������� ����� ������� ��������
    let imageurl = document.querySelector('.main-image img').src.split('_medium.png').join('_big.jpg'||'big.jpeg');
    
    // ��������� � ����� ������� � ����� ��� ��������, � ����� ������-������� ��� ������ ������
    document.querySelector('.popup-desk').innerHTML = '<div class="popup lightbox"><img src="' + imageurl + '"><div class="cross">+</div></div>';
    
    // �������� ��������� ������� ������ � ����������� ������ ��������
    // -120 �������� - ������ ��� � ��� �� ������ ������� �� ���� ������ �� ������ �� 30 �������� � ���� ������ ���� �� 30 �������� � ������ �������
    let winsize = {
        w: document.documentElement.clientWidth - 120,
        h: document.documentElement.clientHeight - 120
    };
    let sides = document.querySelector('.main-image img').clientWidth / document.querySelector('.main-image img').clientHeight;
    
    // ���������� �������� ������� ������ � ������� ��� ���������� ����������� ������ � ��������. ��� ������������� ������ �����������
    if (winsize.w / sides > winsize.h) {
        let correction = (winsize.w - (winsize.h * sides)) / 2;
        document.querySelector('.popup').style = 'margin: 0 ' + correction + 'px';
        winsize.w = winsize.h * sides;
    } else {
        winsize.h = winsize.w / sides;
    }
    
    // ����������� ������� ��������
    document.querySelector('.lightbox img').style = 'width:' + winsize.w + 'px;height:' + winsize.h + 'px';
    
    // ����������� ������ ������ �� ����� �� ������-�������
    document.querySelector('.cross').addEventListener('click',function(){
        document.querySelector('.popup-desk').dispatchEvent(new Event("click"));
    });
    
    // ��������� �����
    document.querySelector('.popup-desk').classList.add('active');
}
function changeimage(event) { // ���������� ����� ������� �����
    // �� ������� ������� �� ����� ��������� �� ����� ������� - event.target
    // ��� ����� - ���� ��������
    // �� �� �������� src ��������� ����� �������� �������� �������
    let imageurl = event.target.src.split('_small').join('_medium');
    
    // �������� ���� ����� � ������� src ������� ��������
    document.querySelector('.main-image img').src = imageurl;
}