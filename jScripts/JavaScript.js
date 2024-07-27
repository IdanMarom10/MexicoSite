// מאזין לאירוע טעינת הדף. הפונקציה תופעל כאשר כל תוכן ה-DOM נטען לחלוטין.
document.addEventListener('DOMContentLoaded', function () {
    // הגדרת משתנים לאלמנטים שונים בטופס ובדף
    var nameInput = document.getElementById('name'); // משתנה לשדה טקסט להזנת שם
    var proteinRadios = document.getElementsByName('protein'); // משתנה למערך של כפתורי רדיו לבחירת חלבון
    var extrasCheckboxes = document.getElementsByName('extras'); // משתנה למערך של צ'קבוקסים לבחירת תוספות
    var submitBtn = document.getElementById('submitBtn'); // משתנה לכפתור שליחה
    var confirmation = document.getElementById('confirmation'); // משתנה לתיבת הודעת אישור
    var orderSummary = document.getElementById('orderSummary'); // משתנה לתצוגת תקציר ההזמנה

    // פונקציה לעדכון מצב כפתור השליחה
    function updateSubmitButtonState() {
        // בדיקת אם שדה השם לא ריק
        var nameFilled = nameInput.value !== ''; // אם השדה לא ריק, nameFilled יהיה true

        // בדיקת אם נבחר חלבון כלשהו
        var proteinSelected = false;
        for (var i = 0; i < proteinRadios.length; i++) {
            if (proteinRadios[i].checked) { // אם אחד מכפתורי הרדיו מסומן
                proteinSelected = true; // מציינים שנבחר חלבון
            }
        }

        // אם גם השם מלא וגם נבחר חלבון, כפתור השליחה יופעל
        if (nameFilled && proteinSelected) {
            submitBtn.disabled = false; // הפיכת הכפתור לזמין
        } else {
            submitBtn.disabled = true; // השארת הכפתור לא זמין
        }
    }

    // פונקציה לעדכון תמונות בהתאם לבחירות המשתמש
    function updateImages() {
        // מעבר על כל כפתורי הרדיו
        for (var i = 0; i < proteinRadios.length; i++) {
            var protein = proteinRadios[i];
            var imageId = protein.id + 'Image'; // יצירת מזהה תמונה המתאים לכפתור הרדיו הנבחר
            document.getElementById(imageId).style.display = protein.checked ? 'inline' : 'none'; // הצגת תמונה אם הכפתור מסומן, אחרת הסתרתה
        } 

        // מעבר על כל הצ'קבוקסים
        for (var i = 0; i < extrasCheckboxes.length; i++) {
            var extra = extrasCheckboxes[i];
            var imageId = extra.id + 'Image'; // יצירת מזהה תמונה המתאים לצ'קבוקס הנבחר
            document.getElementById(imageId).style.opacity = extra.checked ? '1' : '0.5'; // שינוי שקיפות התמונה בהתאם לבחירה
        }
    }

    // פונקציה לטיפול בלחיצה על כפתור השליחה
    function handleSubmit() {
        var name = nameInput.value; // קבלת השם שהוזן מהמשתמש
        var selectedProtein = ''; // משתנה לאחסון החלבון הנבחר
        var selectedExtras = []; // מערך לאחסון התוספות הנבחרות

        // מעבר על כל כפתורי הרדיו לבדיקת החלבון הנבחר
        for (var i = 0; i < proteinRadios.length; i++) {
            if (proteinRadios[i].checked) { // אם כפתור הרדיו מסומן
                selectedProtein = proteinRadios[i].value; // אחסון ערך החלבון הנבחר במשתנה
            }
        }

        // מעבר על כל הצ'קבוקסים לבדיקת התוספות הנבחרות
        for (var i = 0; i < extrasCheckboxes.length; i++) {
            if (extrasCheckboxes[i].checked) { // אם צ'קבוקס מסומן
                selectedExtras[selectedExtras.length] = extrasCheckboxes[i].value; // הוספת ערך התוספת למערך התוספות הנבחרות
            }
        }

        // הצגת תקציר ההזמנה בחלון האישור
        orderSummary.innerHTML = "שם: " + name + "<br>חלבון: " + selectedProtein + "<br>תוספות: " + selectedExtras.join(', ');
        confirmation.style.display = 'block'; // הצגת חלון האישור
    }

    // מאזינים לשינויים בקלטים לעדכון מצב כפתור השליחה
    nameInput.addEventListener('input', function () {
        updateSubmitButtonState(); // קריאה לפונקציה לעדכון מצב כפתור השליחה
    });

    for (var i = 0; i < proteinRadios.length; i++) {
        proteinRadios[i].addEventListener('change', function () {
            updateSubmitButtonState(); // קריאה לפונקציה לעדכון מצב כפתור השליחה
            updateImages(); // קריאה לפונקציה לעדכון התמונות בהתאם לבחירה
        });
    }

    for (var i = 0; i < extrasCheckboxes.length; i++) {
        extrasCheckboxes[i].addEventListener('change', function () {
            updateImages(); // קריאה לפונקציה לעדכון התמונות בהתאם לבחירה
        });
    }

    // מאזין ללחיצה על כפתור השליחה
    submitBtn.addEventListener('click', function () {
        handleSubmit(); // קריאה לפונקציה לטיפול בלחיצה על כפתור השליחה
    });
});

// פונקציה לסגירת חלון האישור
function closePopup() {
    document.getElementById('confirmation').style.display = 'none'; // הסתרת חלון האישור
}
