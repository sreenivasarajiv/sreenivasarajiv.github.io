var baseUrl = 'https://sreenivasarajiv.herokuapp.com';

var newq = [0, 0];

$(document).ready(function () {
    $('.highlight').each(function () {
        newq = makeNewPosition($(this).height(), $(this).width());
        $(this).css({ top: newq[0], left: newq[1] });
        animateDiv(this);
    })
});

function makeNewPosition(height, width) {

    // Get viewport dimensions (remove the dimension of the div)
    var h = $(window).height() - height;
    var w = $(window).width() - width;

    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);

    return [nh, nw];

}

var animate = true;

function StopAnimation() {
    animate = !animate;
    if (animate) {
        $('#animateButton').html('Stop Animation');
        $('.highlight').each(function () {
            animateDiv(this);
        })
    } else {
        $('#animateButton').html('Start Animation');
        $('.highlight').stop();
        return;
    }
}

function animateDiv(element) {

    // console.log($(element).children(0).html());

    newq = makeNewPosition($(element).height(), $(element).width());

    var speed = Math.round(Math.random() * 5000);

    $(element).animate({ top: newq[0], left: newq[1] }, speed, function () {
        animateDiv(this);
    });
}

function SendMail() {

    var data = {
        name: $('#name').val(),
        subject: $('#subject').val(),
        email: $('#your-email').val(),
        phone: $('#your-phone').val(),
        message: $('#message').val()
    }

    $.ajax(baseUrl + '/send-mail', {
        data: JSON.stringify(data),
        contentType: 'application/json',
        type: 'POST',
        success: function (data) {
            $('#modalCloseButton').click();
            if (JSON.parse(data.success)) {
                swal("Success", "Your Feedback have been sent", "success");
                return true;
            }
        }
    });

}

function downloadResume() {

    var close = true;

    swal({
        title: '<strong><i class="fa fa-download"></i><span>&nbsp;&nbsp;Download Resume</span></strong>',
        html: '<h3>Thanks for visiting :)</h3><p>Note : Resume may be outdated </p>',
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:
        '<strong><i class="fa fa-file-pdf-o"></i><span>&nbsp;&nbsp;PDF Version</span></strong>',
        cancelButtonText:
        '<strong onclick="close=false"><i class="fa fa-file-word-o"></i><span>&nbsp;&nbsp;DOCX Version</span></strong>',
        cancelButtonColor: 'indigo'
    }).then(function () {
        location.href = "assets/docs/Sreenivas_Resume.pdf";
    }, function (dismiss) {
        if (dismiss === 'cancel') {
            location.href = "assets/docs/Sreenivas_Resume.docx";
        }
    })
}