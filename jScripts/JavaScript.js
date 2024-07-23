document.addEventListener('DOMContentLoaded', () => {
    var nameInput = document.getElementById('name');
    var proteinRadios = Array.from(document.querySelectorAll('input[name="protein"]'));
    var extrasCheckboxes = Array.from(document.querySelectorAll('input[name="extras"]'));
    var submitBtn = document.getElementById('submitBtn');
    var confirmation = document.getElementById('confirmation');
    var orderSummary = document.getElementById('orderSummary');

    function updateSubmitButtonState() {
        var nameFilled = false;
        if (nameInput.value.trim() !== '') {
            nameFilled = true;
        }
        var proteinSelected = false;
        for (var i = 0; i < proteinRadios.length; i++) {
            if (proteinRadios[i].checked) {
                proteinSelected = true;
                break;
            }
        }
        if (nameFilled && proteinSelected) {
            submitBtn.disabled = false;
        } else {
            submitBtn.disabled = true;
        }
    }

    function updateImages() {
        for (var i = 0; i < proteinRadios.length; i++) {
            var protein = proteinRadios[i];
            var imageId = protein.id + 'Image';
            document.getElementById(imageId).style.display = protein.checked ? 'inline' : 'none';
        }

        for (var i = 0; i < extrasCheckboxes.length; i++) {
            const extra = extrasCheckboxes[i];
            const imageId = extra.id + 'Image';
            document.getElementById(imageId).style.opacity = extra.checked ? '1' : '0.5';
        }
    }

    function handleSubmit() {
        var name = nameInput.value.trim();
        var selectedProtein = '';
        var selectedExtras = [];

        for (var i = 0; i < proteinRadios.length; i++) {
            if (proteinRadios[i].checked) {
                selectedProtein = proteinRadios[i].value;
                break;
            }
        }

        for (var i = 0; i < extrasCheckboxes.length; i++) {
            if (extrasCheckboxes[i].checked) {
                selectedExtras.push(extrasCheckboxes[i].value);
            }
        }

        orderSummary.innerHTML = "שם: " + name + "<br>חלבון: " + selectedProtein + "<br>תוספות: " + selectedExtras.join(', ');
        document.getElementById('confirmation').style.display = 'block';
        document.getElementById('overlay').style.display = 'block';
    }

    nameInput.addEventListener('input', function () {
        updateSubmitButtonState();
    });

    for (var i = 0; i < proteinRadios.length; i++) {
        proteinRadios[i].addEventListener('change', function () {
            updateSubmitButtonState();
            updateImages();
        });
    }

    for (var i = 0; i < extrasCheckboxes.length; i++) {
        extrasCheckboxes[i].addEventListener('change', function () {
            updateImages();
        });
    }

    submitBtn.addEventListener('click', function () {
        handleSubmit();
    });
});
function closePopup() {
    document.getElementById('confirmation').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

/*ממקודם */
function changeTab(str) {
    $('.single-tab').removeClass('show');
    $('.single-tab').addClass('hide');
    $('#' + str).addClass('show');

    $('html, body').animate({
        scrollTop: $('#tabs').offset().top
    }, 500);
}

function animateToContent(str) {
    if (str === undefined || str == '') {
        str = "jumper";
    }

    $('html, body').animate({
        scrollTop: $('#' + str).offset().top
    }, 500);

    setTimeout(function () { $('#' + str).focus(); }, 500)

}

window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        $('#back-to-top').fadeIn();
    } else {
        $('#back-to-top').fadeOut();
    }
}

function topFunction() {
    $('html, body').animate({ scrollTop: 0 }, 500);
    return false;
}
