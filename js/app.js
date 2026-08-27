/* =========================================================
   FINOVA
   APP.JS
========================================================= */


/* =========================================================
   FORMULARIO DE SOLICITUD
========================================================= */

const applicationForm =
    document.getElementById("applicationForm");


/*
    Solo ejecutamos el código si estamos
    en la página que contiene el formulario.
*/

if (applicationForm) {


    /* =====================================================
       ELEMENTOS DEL FORMULARIO
    ====================================================== */

    const nameInput =
        document.getElementById("name");

    const documentInput =
        document.getElementById("document");

    const emailInput =
        document.getElementById("email");

    const phoneInput =
        document.getElementById("phone");

    const typeInput =
        document.getElementById("type");

    const amountInput =
        document.getElementById("amount");

    const termInput =
        document.getElementById("term");

    const destinationInput =
        document.getElementById("destination");

    const messageInput =
        document.getElementById("message");

    const formMessage =
        document.getElementById("formMessage");


    /* =====================================================
       FUNCIONES
    ====================================================== */


    /*
        Mostrar error en un campo
    */

    function showError(input, message) {

        const group =
            input.closest(".input-group");

        if (!group) return;


        /*
            Eliminamos un error anterior
        */

        removeError(input);


        /*
            Creamos el mensaje
        */

        const error =
            document.createElement("span");

        error.className =
            "input-error";

        error.textContent =
            message;


        /*
            Añadimos el mensaje
            después del campo
        */

        group.appendChild(error);


        /*
            Marcamos visualmente el campo
        */

        input.classList.add("input-error-field");

    }



    /*
        Eliminar error
    */

    function removeError(input) {

        const group =
            input.closest(".input-group");

        if (!group) return;


        const existingError =
            group.querySelector(".input-error");


        if (existingError) {

            existingError.remove();

        }


        input.classList.remove(
            "input-error-field"
        );

    }



    /*
        Limpiar todos los errores
    */

    function clearErrors() {

        const errors =
            applicationForm.querySelectorAll(
                ".input-error"
            );


        errors.forEach(error => {

            error.remove();

        });


        const fields =
            applicationForm.querySelectorAll(
                ".input-error-field"
            );


        fields.forEach(field => {

            field.classList.remove(
                "input-error-field"
            );

        });

    }



    /* =====================================================
       VALIDACIÓN DE NOMBRE
    ====================================================== */

    function validateName() {

        const value =
            nameInput.value.trim();


        if (value === "") {

            showError(
                nameInput,
                "Ingresa tu nombre completo."
            );

            return false;

        }


        if (value.length < 3) {

            showError(
                nameInput,
                "El nombre debe tener al menos 3 caracteres."
            );

            return false;

        }


        return true;

    }



    /* =====================================================
       VALIDACIÓN DOCUMENTO
    ====================================================== */

    function validateDocument() {

        const value =
            documentInput.value.trim();


        if (value === "") {

            showError(
                documentInput,
                "Ingresa tu documento de identidad."
            );

            return false;

        }


        if (value.length < 5) {

            showError(
                documentInput,
                "Ingresa un documento válido."
            );

            return false;

        }


        return true;

    }



    /* =====================================================
       VALIDACIÓN EMAIL
    ====================================================== */

    function validateEmail() {

        const value =
            emailInput.value.trim();


        if (value === "") {

            showError(
                emailInput,
                "Ingresa tu correo electrónico."
            );

            return false;

        }


        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailPattern.test(value)) {

            showError(
                emailInput,
                "Ingresa un correo electrónico válido."
            );

            return false;

        }


        return true;

    }



    /* =====================================================
       VALIDACIÓN TELÉFONO
    ====================================================== */

    function validatePhone() {

        const value =
            phoneInput.value.trim();


        if (value === "") {

            showError(
                phoneInput,
                "Ingresa tu número de teléfono."
            );

            return false;

        }


        const numbersOnly =
            value.replace(/\D/g, "");


        if (numbersOnly.length < 7) {

            showError(
                phoneInput,
                "Ingresa un número de teléfono válido."
            );

            return false;

        }


        return true;

    }



    /* =====================================================
       VALIDACIÓN TIPO FINANCIACIÓN
    ====================================================== */

    function validateType() {

        if (typeInput.value === "") {

            showError(
                typeInput,
                "Selecciona el tipo de financiación."
            );

            return false;

        }


        return true;

    }



    /* =====================================================
       VALIDACIÓN MONTO
    ====================================================== */

    function validateAmount() {

        const value =
            Number(amountInput.value);


        if (!amountInput.value) {

            showError(
                amountInput,
                "Ingresa el monto que deseas solicitar."
            );

            return false;

        }


        if (value <= 0) {

            showError(
                amountInput,
                "El monto debe ser mayor que cero."
            );

            return false;

        }


        return true;

    }



    /* =====================================================
       VALIDACIÓN PLAZO
    ====================================================== */

    function validateTerm() {

        if (termInput.value === "") {

            showError(
                termInput,
                "Selecciona el plazo de financiación."
            );

            return false;

        }


        return true;

    }



    /* =====================================================
       VALIDACIÓN DESTINO
    ====================================================== */

    function validateDestination() {

        if (destinationInput.value === "") {

            showError(
                destinationInput,
                "Selecciona el destino de la financiación."
            );

            return false;

        }


        return true;

    }



    /* =====================================================
       VALIDACIÓN GENERAL
    ====================================================== */

    function validateForm() {

        clearErrors();


        let valid = true;


        if (!validateName()) {

            valid = false;

        }


        if (!validateDocument()) {

            valid = false;

        }


        if (!validateEmail()) {

            valid = false;

        }


        if (!validatePhone()) {

            valid = false;

        }


        if (!validateType()) {

            valid = false;

        }


        if (!validateAmount()) {

            valid = false;

        }


        if (!validateTerm()) {

            valid = false;

        }


        if (!validateDestination()) {

            valid = false;

        }


        return valid;

    }



    /* =====================================================
       FORMATEAR MONTO
    ====================================================== */

    amountInput.addEventListener(
        "input",
        function () {

            /*
                Eliminamos valores negativos
            */

            if (Number(this.value) < 0) {

                this.value = 0;

            }

        }
    );



    /* =====================================================
       LIMPIAR ERROR AL ESCRIBIR
    ====================================================== */

    const fields =
        applicationForm.querySelectorAll(
            "input, select, textarea"
        );


    fields.forEach(field => {


        field.addEventListener(
            "input",
            function () {

                removeError(this);

            }
        );


        field.addEventListener(
            "change",
            function () {

                removeError(this);

            }
        );

    });



    /* =====================================================
       ENVÍO DEL FORMULARIO
    ====================================================== */

    applicationForm.addEventListener(
        "submit",
        function (event) {


            /*
                Evitamos que el navegador
                recargue la página
            */

            event.preventDefault();


            /*
                Limpiamos mensajes
            */

            if (formMessage) {

                formMessage.textContent = "";

                formMessage.className =
                    "form-message";

            }


            /*
                Validamos
            */

            const isValid =
                validateForm();


            /*
                Si hay errores,
                detenemos el proceso
            */

            if (!isValid) {

                const firstError =
                    applicationForm.querySelector(
                        ".input-error-field"
                    );


                if (firstError) {

                    firstError.focus();

                }


                return;

            }



            /* =================================================
               DATOS DEL FORMULARIO
            ================================================== */

            const formData = {

                name:
                    nameInput.value.trim(),

                document:
                    documentInput.value.trim(),

                email:
                    emailInput.value.trim(),

                phone:
                    phoneInput.value.trim(),

                type:
                    typeInput.value,

                amount:
                    amountInput.value,

                term:
                    termInput.value,

                destination:
                    destinationInput.value,

                message:
                    messageInput.value.trim()

            };


            /*
                Por ahora mostramos los datos
                en la consola.

                Más adelante podremos enviar
                este objeto al backend.
            */

            console.log(
                "Solicitud recibida:",
                formData
            );



            /* =================================================
               MENSAJE DE ÉXITO
            ================================================== */

            if (formMessage) {

                formMessage.textContent =
                    "✓ Tu solicitud ha sido registrada correctamente.";

                formMessage.classList.add(
                    "success-message"
                );

            }



            /*
                Desplazamos suavemente
                hacia el mensaje
            */

            if (formMessage) {

                formMessage.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }



            /*
                Limpiamos el formulario
            */

            applicationForm.reset();


        }
    );

}